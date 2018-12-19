# golf_booking
골프 부킹 메타검색 서비스

# How to start
django react 기술 기반 프로젝트
1. git clone THIS PROJECT
2. Install yarn
* MacOS : brew install yarn
* Others : https://yarnpkg.com/en/docs/install#windows-stable
## CLIENT - REACT
1. cd PROEJCT/client
2. yarn OR npm install
3. Open Terminal
4. yarn run watch OR npm run watch

## SERVER - DJANGO
```
cd PROJECT;
pip install -r requirements.txt;
python manage.py runserver;
``` 
이때, mysqlclient가 설치가 안될때 (참고: https://github.com/PyMySQL/mysqlclient-python/issues/new)
```
LDFLAGS=-L/usr/local/opt/openssl/lib pip install mysqlclient;
```

Development Environment DONE
