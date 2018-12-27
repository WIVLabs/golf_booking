# 소스 배포
## 1. 서버 및 디렉토리 접근
gateway 서버에서 아래와 같이 웹서비스 서버에 접근 & 디렉토리 이동
```
ubuntu@gateway:~$ ssh w1
ubuntu@webserver:~$ cd /app_src/golf_booking/
ubuntu@webserver:/app_src/golf_booking$ pwd
/app_src/golf_booking
```
## 2. 업데이트된 소스 반영
### a. 가상환경으로 변경
```
ubuntu@webserver:~/app_src/golf_booking$ source venv/bin/activate
```
### b. 최신 소스 반영
1. 아래의 코드를 실행하면, react 소스가 build되게 됨.
2. build된 이후에는 해당 프로세스를 kill하면 되겠음.
```
(venv) ubuntu@webserver:/app_src/golf_booking$ git pull && cd client && yarn install && yarn run watch;
......
    + ??? hidden modules
```
### c. django 리로드
```
(venv) ubuntu@webserver:~/app_src/golf_booking$ touch golf.reload && sleep 10 && sudo service nginx reload;
```
### d. 반영결과 검증
```
https://booking.golf1shot.com에 접속하여
https://booking.golf1shot.com/assets/bundles/main-*.js 파일이 새파일인지 확인한다.
```
