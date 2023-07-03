from langchain.callbacks.base import BaseCallbackHandler
from kms_api.llm.models import conversation_chain
from pprint import pprint


class ChatHistories:
    def __init__(self):
        # TODO: We need to store this outside of memory so we can persist it across API restarts
        # {user_id: {chat_id: [(prompt, response)]}}
        self.histories: dict[str, dict[str, list[tuple[str, str]]]] = {}

    def get(self, user_id: str, chat_id: str):
        if user_id not in self.histories:
            print(f"No history found for user {user_id}. Creating new user chat dict")
            self.histories[user_id] = {}
        if chat_id not in self.histories[user_id]:
            print(f"No history found for chat {chat_id}. Creating empty history")
            self.histories[user_id][chat_id] = []

        return self.histories[user_id][chat_id]

    def append(self, user_id: str, chat_id: str, prompt_response_pair: tuple):
        if user_id not in self.histories:
            self.histories[user_id] = {}

        self.histories[user_id][chat_id].append(prompt_response_pair)


class QueueCallback(BaseCallbackHandler):
    def __init__(self, queue):
        super().__init__()
        self.queue = queue

    def on_llm_new_token(self, token: str, **kwargs) -> None:
        self.queue.put(token)

    def on_llm_end(self, *args, **kwargs):
        return self.queue.empty()


histories = ChatHistories()


async def conversational(prompt: str, user_id: str, chat_id: str, queue):
    chat_history = histories.get(user_id, chat_id)

    pprint(histories)

    response = await conversation_chain.acall(
        {"input": prompt,
         "history": chat_history},
        callbacks=[QueueCallback(queue)])

    answer = response['response']
    histories.append(user_id, chat_id, (prompt, answer))
