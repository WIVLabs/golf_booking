# 명령어
## db 초기화
```
python manage.py makemigrations;
python manage.py migrate;
```
```
CREATE DATABASE golf DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
```
## 데이터 덤프
```
python manage.py dumpdata server.site > server/models/fixture/site.json;
python manage.py dumpdata server.golfcourse > server/models/fixture/golfcourse.json;
python manage.py dumpdata server.golfcoursemapper > server/models/fixture/golfcoursemapper.json;
```
## 초기 데이터 로드
```
python manage.py loaddata site.json;
python manage.py loaddata golfcourse.json;
python manage.py loaddata golfcoursemapper.json;
```
