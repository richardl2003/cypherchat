ip := $(shell ipconfig getifaddr en0)

app-android:
	@echo "EXPO_PUBLIC_API_URL='http://${ip}:8000'" > frontend/.env
	cd frontend && npm run android

app-general:
	@echo "EXPO_PUBLIC_API_URL='http://${ip}:8000'" > frontend/.env
	cd frontend && npm run start

server:
	. env/bin/activate && python backend/manage.py runserver ${ip}:8000

redis:
	redis-server 
