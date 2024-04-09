app:
	cd frontend && npm run start

app-android:
	cd frontend && npm run android

server-mac: 
	. env/bin/activate && python backend/manage.py runserver

server-windows:
	. env/Scripts/activate && python backend/manage.py runserver

ngrok:
	ngrok http http://127.0.0.1:8000/

redis:
	redis-server 
