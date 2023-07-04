import uvicorn

uvicorn.run("api:app", reload=True, log_level="debug")
