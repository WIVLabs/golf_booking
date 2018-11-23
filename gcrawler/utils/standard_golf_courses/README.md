# 프로그램
http://golfhankook.hankooki.com
이 사이트를 기준으로 골프장 초기 DB를 구축하기 위함

1) ./crawler.py를 실행: 
R[1-7].json 파일에 Region 별로 클로링한 데이터가 기록된다.
2) ./dumper.py를 실행: 
그 데이터가 django에서 테이블에 load할 수 있는 적당한 포맷으로 변환해서 golfcourse.json 파일에 기록된다.
3) golfcourse.json 파일 이동:  
해당 파일을 FIXTURE_DIR에 옮겨놓으면 최초 필요한 데이터 구성 완료
