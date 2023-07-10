# KMS API

This is the repository for the Knowledge Management System API. It is currently in the process of being refactored from the old pipeline and contains endpoint for creating, reading, updating, deleting, and querying knowledge objects from the FireStore database.  
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

# Setup
## API Backend

This codebase requires Python 3.11 or higher and since most default Python installations are 3.9 or lower you may need to install a newer version. When I first built Python 3.11 from source I had some missing dependencies for libraries, so I've included some common libraries below that fixed the issues for me (I don't think all of them are necessary).

```bash
sudo apt update
sudo apt upgrade
sudo apt install build-essential python-dev python-setuptools python3-pip python3-smbus libncursesw5-dev libgdbm-dev libc6-dev zlib1g-dev libsqlite3-dev tk-dev libssl-dev openssl libffi-dev libbz2-dev
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
Clone this repository.
```bash
git clone https://github.com/BlockScience/kms-api
```
Next create a virtual environment and install the required libraries.

```bash
cd kms-api
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
Run `python setup.py` to generate your local config file and update settings.
Edit `config.py` to reflect your system configuration, most common change will be `PROJECT_PATH` which should point to where this repo was clone, most likely your home directory.

### For Development
For local testing, you can execute `python -m api` to run a server on `localhost:8000`. You can also run `python -m generate_key` to create an API key for testing.

If you want to run the full stack development server, you will need to set `DOMAIN = 'localhost'` in `config.py`, create a self-signed certificate for HTTPS, and set `SSL_CERT_PATH` and `SSL_KEY_PATH` in `config.py`. You can follow the rest of the steps for production, starting at running `python setup.py` again.

### For Production
For production deployment, systemd is configured to run the API as a systemd service via Uvicorn also locally hosted at `localhost:8000`. Nginx is used as a reverse proxy to forward requests to the Uvicorn server.

First you will need to configure HTTPS using EFF's certbot. Instructions can be found [here](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal). Once installed you will want to run the following command:
```bash
sudo certbot certonly --nginx
```
You will receive two paths to a certificate and key which need to be set in `config.py` as `SSL_CERT_PATH` and `SSL_KEY_PATH` respectively. At this point, run `python setup.py` once again to generate the systemd service file and nginx conf file which will be stored in the `conf` directory.

Setup systemd service for uvicorn process.

```bash
sudo systemctl enable ~/kms-api/conf/kms-api.service
sudo systemctl start kms-api
```

Install and configure nginx.

```bash
sudo apt install nginx
sudo ln -s ~/kms-api/conf/nginx.conf /etc/nginx/sites-enabled/kms-api
sudo nginx -s reload
```

## Making configuration changes

Changes can be made to `config.py` at anytime. For these changes to affect the production environment, you will need to rerun `python setup.py` to regenerate the systemd service and nginx conf files. Each service will need to be manually update to reflect these config changes.

To reload the API service:
```bash
sudo systemctl daemon-reload
sudo systemctl restart kms-api
```

To reload the nginx server:
```bash
sudo nginx -s reload
```
