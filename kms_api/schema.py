KNOWLEDGE_SCHEMA = {
    "type": "object",
    "properties": {
        "url": {"type": "string"},
        "title": {"type": "string"},
        "text": {"type": "string"},
        "platform": {"type": "string"}
    },
    "required": ["url"]
}

PROPOSAL_SCHEMA = {
    "type": "object",
    "properties": {
            "name": {"type": "string"},
            "description": {"type": "string"},
            "created_by": {"type": "string"},
            "resolved_by": {"type": "string"},
            "status": {"enum": ["pending", "accepted", "rejected", "applied"]},
            "operations": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "string"},
                        "action": {"enum":["remove_tags","add_tags", "replace_tags"]},
                        "payload": {}
                    },
                    "required": ["id", "action", "payload"],

                },
                "minItems": 1
            },
    },
    "required": ["name", "status", "operations", "created_by"],
}

RESOLUTION_SCHEMA = {
    "type": "object",
    "properties": {
        "status": {"enum": ["pending", "accepted", "rejected", "applied"]},
        "resolved_by": {"type": "string"}
    },
    "required": ["status", "resolved_by"]
}

FEEDBACK_SCHEMA = {
    "type": "object",
    "properties": {
        "feedback": {"type": "string"},
        "query": {"type": "string"},
        "timestamp": {"type": "string", "format": "date-time"},
        "user": {"type": "string"}
    },
    "required": ["feedback", "query", "timestamp"]
}

USER_SCHEMA = {
    "type": "object",
    "properties": {
        "profile_name": {"type": "string"},
        "per_page": {"type": "integer"},
        "search_context_tokens" : {"type": "integer"}
    },
    "required": []
}

QUERY_SCHEMA = {
    "type": "object",
    "properties": {
        "q": {"type": "string"},
        "query_by": {"type": "string"},
        "query_by_weights": {"type": "string"},
        "sort_by": {"type": "string"},
        "highlight_full_fields": {"type": "string"},
        "highlight_affix_num_tokens": {"type": "number"},
        "per_page": {"type": "number"},
        "filter_by": {"type": "string"}
    },
    "required": ["q", "query_by", "query_by_weights", "sort_by", "highlight_full_fields", "highlight_affix_num_tokens", "per_page", "filter_by"]
}