from url_normalize import url_normalize
from base64 import b64encode
import re, json
from hashlib import md5
from typing import Dict, Any
from kms_api.core import typesense_db, firestore_db
from kms_api import config

def encode_url(string):
    return b64encode(string.encode('ascii')).decode('ascii')

def typesense_collection():
    return typesense_db.collections['knowledge'].documents

def search_typesense(query: dict):
    ts_response = typesense_collection().search(query)
    return ts_response

def query(query: str, page: int, per_page: int) -> dict:
    overrides = query_overrides(query)

    QUERY_DEFAULT: dict = {
        'q': query,
        'query_by': 'tags, title, text',
        'query_by_weights': '3, 2, 1',
        'sort_by': 'rank:desc,_text_match:desc',
        'highlight_full_fields': 'title,tags',
        'highlight_affix_num_tokens': config.HIGHLIGHT_AFFIX_NUM_TOKENS,
        'per_page': per_page,
        'page': page
    }
    return QUERY_DEFAULT | overrides

def query_overrides(query: str) -> dict:
    # no changes if query is single line
    lines = [line.strip() for line in re.split(r'\n|\r|;', query) if line]
    if len(lines) <= 1:
        return {}
    VALID_ARGS = ('filter ', 'fi ', 'in ', 'sort ')
    valid_keyword_lines = [li for li in lines[1:] if li.startswith(VALID_ARGS)]
    if not valid_keyword_lines:
        return {}
    args: dict[str, list] = {}
    for li in valid_keyword_lines:
        split = li.split(' ', 1)
        key = split[0]
        tokens = re.split(r'([<>!=\s])',  split[1])
        tokens = [i.strip(' ') for i in tokens]
        tokens = [i.lower() for i in tokens if i]
        if key in args:
            args[key].append("&&")
            args[key].extend(tokens)
        else:
            args[key] = tokens
    return {'q': lines[0]} | args_to_changes(args)

def args_to_changes(args: dict) -> dict:
    result = {}
    for k, v in args.items():
        match k:
            case "in":
                result['query_by'] = ", ".join(v)
                result['query_by_weights'] = ("1,"*len(v))[:-1]
            case "sort":
                direction = "asc" if "asc" in v else "desc"
                field = v[0] if v else "_text_match"
                result['sort_by'] = f'{field}:{direction}'
            case "filter" | "fi":
                result['filter_by'] = filter_arg(v)
    return result

def filter_arg(tokens: list) -> str:
    OPERATORS = "<>!="
    filters = split_sublists(tokens, "&&")
    filter_results = []
    for fi in filters:
        field = fi[0]
        values = fi[1:]
        ands = split_sublists(values, "&")
        for sub in ands:
            op = "".join([o for o in sub if o in OPERATORS])
            sub = [e for e in sub if e not in OPERATORS]
            filter_results.append(f"{field}: {op} [{', '.join(sub)}]")
    return " && ".join(filter_results)

def split_sublists(tokens: list, delimiter: str) -> list:
    result: list[list] = [[]]
    for token in tokens:
        if token != delimiter:
            result[-1].append(token)
        else:
            result.append([])
    return result

def simplify_ops(operations: list) -> list:
    simplified_ops: dict = {}

    for proposed_op in operations:
        target = proposed_op["id"]
        action = proposed_op["action"]
        payload = proposed_op["payload"]
        if target not in simplified_ops:
            simplified_ops[target] = {
                "add": set(), "remove": set()}

        if action == "remove_tags":
            simplified_ops[target]["remove"] |= set(payload)
        elif action == "add_tags":
            simplified_ops[target]["add"] |= set(payload)
        elif action == "replace_tags":
            simplified_ops[target]["remove"] |= set(payload["tags"])
            simplified_ops[target]["add"] |= set(payload["replacement"])

    new_ops = []
    for id, ops in simplified_ops.items():
        new_ops.append({"id": id,
                        "action": "remove_tags",
                        "payload": list(ops["remove"])
                        })
        new_ops.append({"id": id,
                        "action": "add_tags",
                        "payload": list(ops["add"])
                        })
    return new_ops

def check_for_missing_ids(proposal: dict) -> list:
    """Returns a list of ids which are not in the knowledge base."""
    ids = list({op["id"] for op in proposal["operations"]})
    found = []
    chunks = [ids[i:i + 10] for i in range(0, len(ids), 10)]
    for chunk in chunks:
        query = firestore_db.collection(u'knowledge').where(
            '__name__', 'in', chunk)
        for result in query.stream():
            found.append(result.id)

    return [x for x in ids if x not in found]

def md5_dict(dictionary: Dict[str, Any]) -> str:
        """MD5 hash of a dictionary."""
        dhash = md5()
        encoded = json.dumps(dictionary, sort_keys=True).encode()
        dhash.update(encoded)
        return dhash.hexdigest()