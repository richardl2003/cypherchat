# CypherChat

Secure chat application for organizations

## Getting Started

### Dependencies

Before starting, ensure you have the following tools and technologies installed:

- Node.js
- Android Studio (for Android development support)
- Python 3.x
- Expo (for React Native development)
- Django (for backend development)
- PostgreSQL (database system)
- Redis (for caching and message brokering)
- Ngrok (for exposing local servers to the internet)

### Dev Setup

#### 1. Download and Install Dependencies:

- **PostgreSQL:** [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- **Ngrok:** [https://ngrok.com/download](https://ngrok.com/download)
- **Redis:**
  - General download: [https://redis.io/download](https://redis.io/download)
  - For Windows, download Redis-x64-5.0.14.1.zip from [https://github.com/tporadowski/redis/releases](https://github.com/tporadowski/redis/releases), unzip, and run `redis-server.exe`.
- **OpenAI Setup:** Follow the Quickstart guide at [https://platform.openai.com/docs/quickstart](https://platform.openai.com/docs/quickstart) to set up your API key and environment.

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

### Backend setup

Follow these steps to set up your project environment:

##### 1. Initialize and Activate the Virtual Environment

- **For Unix/Linux/macOS**:

  ```bash
  python3 -m venv env
  source env/bin/activate
  ```

- **For Windows**:

  ```bash
  python -m venv env
  .\env\Scripts\activate
  ```

##### 2. Install Dependencies

Install the required project dependencies by running:

```bash
pip install -r requirements.txt
```

##### 3. Generate SQL Schemas on Your Local PostgreSQL Instance

Ensure your local PostgreSQL instance is running, then execute the SQL schema generation commands specific to your project.

**Note for Windows Users Regarding Database Configuration:**

In the `settings.py` file, modify the `DATABASES` configuration to match your local PostgreSQL setup:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        "USER": "postgres",
        "PASSWORD": "your_password_here",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

Replace `"your_password_here"` with your actual PostgreSQL user password.

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
