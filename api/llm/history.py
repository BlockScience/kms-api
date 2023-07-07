from tinydb import Query, TinyDB

from config import LLM_CHAT_HISTORY_DB


class ChatHistories:
    def __init__(self):
        self.db = TinyDB(LLM_CHAT_HISTORY_DB, indent=2)
        self.clean_empty()

    def clean_empty(self):
        Item = Query()
        print(Item.history)
        self.db.remove(Item.history == [[]])
        self.db.remove(Item.history == [])

    def get_doc(self, user_id: str, chat_id: str):
        Item = Query()
        doc = self.db.search((Item.user_id == user_id) & (Item.chat_id == chat_id))

        if doc:
            doc = doc[0]
        else:
            doc_id = self.db.insert(
                {"user_id": user_id, "chat_id": chat_id, "history": []}
            )
            doc = self.db.get(doc_id=doc_id)

        return doc

    def get(self, user_id: str, chat_id: str):
        doc = self.get_doc(user_id, chat_id)
        return [tuple(entry) for entry in doc["history"]]

    def get_chat_ids(self, user_id: str):
        Item = Query()
        docs = self.db.search(Item.user_id == user_id)
        return [doc["chat_id"] for doc in docs]

    def append(self, user_id: str, chat_id: str, prompt_response_pair: tuple):
        # update function
        def append_history(pair):
            def transform(doc):
                doc["history"].append(pair)

            return transform

        doc = self.get_doc(user_id, chat_id)
        self.db.update(append_history(prompt_response_pair), doc_ids=[doc.doc_id])


histories = ChatHistories()
