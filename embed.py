import json
from pathlib import Path

from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from chromadb.utils import embedding_functions

from api.config import LLM_DATASET, LLM_EMBEDDINGS


class Embedder:
    def __init__(self, dataset, dest_dir):
        self.docs = []
        self.dataset = dataset
        self.dest_dir = dest_dir

    def clean(self):
        with open(self.dataset) as r:
            docs_raw = list(json.loads(r.read()))

            docs_clean = []
            for e in docs_raw:
                if "text" not in e:
                    continue
                if not e["text"]:
                    continue
                if e["text"] == "":
                    continue
                if len(e["text"]) < 50:
                    continue
                docs_clean.append(e)
            print(f"\n* Filtered {len(docs_raw)} sources down to {len(docs_clean)}")
            self.cleaned_docs = [
                Document(page_content=doc["text"], metadata={"id": doc["id"]})
                for doc in docs_clean
            ]
            print("* Cleaned documents")
            return self

    def split(self, chunk_size, chunk_overlap):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap, length_function=len
        )
        self.split_docs = text_splitter.split_documents(self.cleaned_docs)
        print(
            f"* Split {len(self.cleaned_docs)} documents into {len(self.split_docs)} chunks"
        )
        return self

    def embed(self, embedding_function) -> Chroma:
        Path(self.dest_dir).mkdir(parents=True, exist_ok=True)
        print("* Embedding documents (this may take a while)")
        Chroma.from_documents(
            self.split_docs, embedding_function, persist_directory=str(self.dest_dir)
        ).persist()
        print("* Finished embedding documents")


embed_func = embedding_functions.InstructorEmbeddingFunction(
    model_name="hkunlp/instructor-large", device="gpu"
)


embedder = Embedder(LLM_DATASET, LLM_EMBEDDINGS)
embedder.clean().split(1000, 100)
embedder.embed(embed_func)
