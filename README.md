# KMS API

This is the repository for the Knowledge Management System API. It is currently in the process of being refactored from the old pipeline and contains endpoint for creating, reading, updating, deleting, and querying knowledge objects from the FireStore database.

# Setup
## API Backend

This codebase requires Python 3.11 or higher and since most default Python installations are 3.9 or lower you may need to install a newer version. When I first built Python 3.11 from source I had some missing dependencies for libraries, so I've included some common libraries below that fixed the issues for me (I don't think all of them are necessary).

```bash
sudo apt update
sudo apt upgrade
sudo apt install build-essential python-dev python-setuptools python3-pip python3-smbus libncursesw5-dev libgdbm-dev libc6-dev zlib1g-dev libsqlite3-dev tk-dev libssl-dev openssl libffi-dev
```

Now Python can be compiled from source. You can find all of the releases [here](https://www.python.org/downloads/source/). Look for the "Gzipped source tarball" link for the next step. Replace the links and zip/directory name with your version of Python.

```bash
wget https://www.python.org/ftp/python/3.11.3/Python-3.11.3.tgz
tar xzvf Python-3.11.3.tgz
cd Python-3.11.3
./configure
make
sudo make install
```

Next create a virtual environment and install the required libraries.

```bash
cd kms-api
python3.11 -m venv .env
source .env/bin/activate
python -m pip install -r requirements.txt
```

### For Development
For local testing, you can execute `python -m kms_api` to run a server on `localhost:8000`. You can also run `python -m generate_key` to create an API key for testing.

### For Production
For production deployment, systemd is configured to run the API as a systemd service via Uvicorn also locally hosted at `localhost:8000`. Nginx is used as a reverse proxy to forward requests to the Uvicorn server.

Setup systemd service for uvicorn process.

```bash
sudo systemctl enable ~/kms-api/config/kms-api.service
sudo systemctl start kms-api
```

Install and configure nginx.

```bash
sudo apt install nginx
sudo ln -s ~/kms-api/config/nginx /etc/nginx/sites-enabled/kms-api
sudo nginx -s reload
```

## API Frontend

Install Node.js to use Vite + React environment.
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
(Instructions from https://github.com/nodesource/distributions)

Install dependencies.
```bash
cd ~/kms-api/vite-project
npm install
```

### For Development

```bash
npm run dev
```

### For Production

```bash
npm run build
```