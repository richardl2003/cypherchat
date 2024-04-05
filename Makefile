ip := $(shell ipconfig getifaddr en1)

app-android:
	@echo "EXPO_PUBLIC_API_URL='http://${ip}:8000'" > frontend/.env
	cd frontend && npm run android

app-general:
	@echo "EXPO_PUBLIC_API_URL='http://${ip}:8000'" > frontend/.env
	cd frontend && npm run start

server:
	. env/bin/activate && python3 backend/manage.py runserver ${ip}:8000

migrate:
	python3 backend/manage.py check
	python3 backend/manage.py makemigrations
	python3 backend/manage.py migrate
