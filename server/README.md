# 명령어
## db 초기화
python manage.py makemigrations;
python manage.py migrate;
## 데이터 덤프
python manage.py dumpdata server.site > server/models/fixture/site.json;
## 초기 데이터 로드
python manage.py loaddata site.json;
python manage.py loaddata golfcourse.json;
