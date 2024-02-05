FROM python:3.11-slim

# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into /app (ignoring files in .dockerignore)
COPY . .

# Install the dependencies (dev dependencies are temporary)
RUN pip install -r requirements.txt 

# Remove the cache to reduce the image size
RUN pip cache purge

# Expose the port on which the application will run
EXPOSE 8080

# Run the FastAPI application using uvicorn server
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8080"]
