from langchain.callbacks.base import BaseCallbackHandler
from kms_api.llm.models import conversation_chain

histories = {}

class QueueCallback(BaseCallbackHandler):
    def __init__(self, queue):
        super().__init__()
        self.queue = queue
    
    def on_llm_new_token(self, token: str, **kwargs) -> None:
        self.queue.put(token)

    def on_llm_end(self, *args, **kwargs):
        return self.queue.empty()


async def conversational(prompt: str, user_id: str, chat_id: str, queue):
    user_history = histories.setdefault(user_id, {})
    chat_history = user_history.setdefault(chat_id, [])

    print(chat_history)

    response = await conversation_chain.acall(
        {"question": prompt,
         "chat_history": chat_history},
        callbacks=[QueueCallback(queue)])
    
    answer = response['answer']
    # sources = formatter.sources(query_result['source_documents'])
    # execution_time = formatter.time(time() - start_time)
    # formatted_message = f"{answer}\n\n*Generated for <@{initiated_by}> in {execution_time} from sources {sources}*"

    # Update history
    chat_history.append((prompt, answer))
