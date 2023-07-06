from langchain.prompts.prompt import PromptTemplate

_template = """Given the following conversation and a follow up message, rephrase the follow up message to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)

prompt_template = """Use the following pieces of context to inform your response to the message at the end. If you don't know how to answer, just say that you don't know.

{context}

Message: {question}
Helpful Response:"""
QA_PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)
