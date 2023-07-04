from langchain.chat_models import ChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.vectorstores import Chroma

from api.config import LLM_EMBEDDINGS
from api.llm.chains.conversational import ConversationChain

CHAT_MODEL = "gpt-4"
BASE_MODEL = "gpt-3.5-turbo"

# --------------- BASE LLMs -----------------
llm_chat = ChatOpenAI(
    model_name=BASE_MODEL,
    verbose=False,
    request_timeout=240,
    temperature=0.7,
    streaming=True,
)

# ----------- VECTORSTORE -------------
vectorstore = Chroma(
    embedding_function=OpenAIEmbeddings(), persist_directory=str(LLM_EMBEDDINGS)
)
retriever = vectorstore.as_retriever()

# -------------- MEMORIES -------------
memory = ConversationBufferMemory(
    memory_key="chat_history",
    input_key="question",
    output_key="answer",
    return_messages=True,
)

# -------------- CHAINS ---------------
conversation_chain = ConversationChain(llm=llm_chat)
