# CypherChat

Secure chat application for organizations

## Getting Started

### Dependencies

* Node
* Android Studio
* Python
* Expo React Native
* Django
* Postgresql
* Redis
* Ngrok

### Dev setup
1. Download [PostgreSQL](https://www.postgresql.org/)
2. Download [ngrok](https://ngrok.com/download)
3. Download [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)
* For Windows please download [Redis-x64-5.0.14.1.zip](https://github.com/tporadowski/redis/releases) and after unzipping the file open redis-server.exe
4. Setup [OpenAI](https://platform.openai.com/docs/quickstart?context=python)

### Installion of dependencies
1. Frontend
```sh
cd frontend && npm install
```
2. Backend on Mac
```sh
python -m venv env
source env/bin/activate
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```
3. Backend on Windows
```sh
python3 -m venv env
.\env\bin\activate
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```
For the backend setup, we need to initalize a Python virtual environment, activate it, and install your dependencies

Backend setup:
1. Initialize virtual environment and activate it
2. Install dependencies
3. Generate the SQL schemas onto your local Postgres instance
* Please note that for windows the setting.py file should be modified as follows:
* DATABASES = {
  "default": {
  "ENGINE": "django.db.backends.postgresql",
  "NAME": "postgres",
  "USER": "postgres",
  "PASSWORD": "pass",
  "HOST": "localhost",
  "PORT": "5432",
  }
  }
* PASSWORD should be replaced by user's password for the pstgresql Database

Example run of making sure your virtual environment is running:
```sh
richardli@Richards-MacBook-Pro cypherchat % source env/bin/activate
(env) richardli@Richards-MacBook-Pro cypherchat % 
```
The brackets of your virtual environment name should be beside your terminal name

### Running our code
View our [Makefile](Makefile) for more commands to run based on your environment

1. Initialize a redis-server
```sh
make redis
```

2. Initialize Backend
```sh
make server
```
3. On another terminal window, setup ngrok
```sh
make ngrok
```

4. Setup frontend environment variables
- Setup environment variables
```sh
cd frontend 
touch .env
```
The .env should contain:
```
EXPO_PUBLIC_API_URL='ngrok-url'
EXPO_PUBLIC_OPENAI_API_KEY='openai-apiKey'
```
Example: when you run `make ngrok` this is the output:
```ngrok                                                                                                                          (Ctrl+C to quit)
                                                                                                                                               
Full request capture now available in your browser: https://ngrok.com/r/ti                                                                     
                                                                                                                                               
Session Status                online                                                                                                           
Account                       richardliy03@gmail.com (Plan: Free)                                                                              
Version                       3.8.0                                                                                                            
Region                        United States (us)                                                                                               
Web Interface                 http://127.0.0.1:4040                                                                                            
Forwarding                    https://c7f4-2001-1970-51a4-e00-7172-66bc-bd8c-98af.ngrok-free.app -> http://127.0.0.1:8000/                     
                                                                                                                                               
Connections                   ttl     opn     rt1     rt5     p50     p90                                                                      
                              0       0       0.00    0.00    0.00    0.00 
```
To get the `ngrok-url` copy the forwarding link and get rid of the `https://`
```
EXPO_PUBLIC_API_URL='c7f4-2001-1970-51a4-e00-7172-66bc-bd8c-98af.ngrok-free.app'
EXPO_PUBLIC_OPENAI_API_KEY='...'
```
5. Run frontend on another terminal window
```sh
make app
```

## Authors

Contributors names and contact info

Michael Timmer
Richard Li
Kavith Ranchagoda
Christian Petricca
Reza Jodeiri
