from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Chroma
from langchain.embeddings.base import Embeddings
from api.llm.chains.conversation_retrieval.base import ConversationalRetrievalChain
from chromadb.utils import embedding_functions

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


class InstructorEmbedder(Embeddings):
    def __init__(self) -> None:
        super().__init__()
        self.embed_func = embedding_functions.InstructorEmbeddingFunction(
            model_name="hkunlp/instructor-large", device="cpu"
        )

    def embed_documents(
        self, texts: list[str], chunk_size: int | None = 0
    ) -> list[list[float]]:
        return self.embed_func(texts)

    def embed_query(self, text: str) -> list[float]:
        return self.embed_func([text])[0]


vectorstore = Chroma(
    embedding_function=InstructorEmbedder(), persist_directory=str(LLM_EMBEDDINGS)
)
retriever = vectorstore.as_retriever()

# -------------- MEMORIES -------------
# memory = ConversationBufferMemory(
#     memory_key="chat_history",
#     input_key="question",
#     output_key="answer",
#     return_messages=True,
# )

# -------------- CHAINS ---------------
conversation_chain = ConversationChain(llm=llm_chat)
conversation_retrieval_chain = ConversationalRetrievalChain.from_llm(
    llm_chat, vectorstore.as_retriever()
)
