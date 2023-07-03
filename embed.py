import json
from os import environ
from pathlib import Path

from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma

from kms_api.config import LLM_DATASET, LLM_EMBEDDINGS


class Embedder:
    def __init__(self):
        self.docs = []

    def clean(self, path):
        with open(path, "r") as r:
            docs_raw = list(json.loads(r.read()))

            docs_clean = []
            for e in docs_raw:
                if "text" not in e:
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

    def embed(self, path) -> Chroma:
        embeddings = OpenAIEmbeddings(openai_api_key=environ["OPENAI_API_KEY"])
        Path(path).mkdir(parents=True, exist_ok=True)
        print("* Embedding documents (this may take a while)")
        Chroma.from_documents(
            self.split_docs, embeddings, persist_directory=path
        ).persist()
        print("* Finished embedding documents")


Embedder().clean(LLM_DATASET).split(1000, 100).embed(LLM_EMBEDDINGS)
