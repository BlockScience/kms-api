import uvicorn

uvicorn.run("kms_api:app", reload=True, log_level="debug")
