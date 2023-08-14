# Deploy
## Environment Variable
- CI: 빌드 중 warn 에러 발생시 CI/CD 중지 여부를 설정하는 변수. false로 설정.
- AWS_ACCESS_KEY: S3 사용을 위한 AWS 계정의 ACCESS KEY
- AWS_SECRET_KEY: S3 사용을 위한 AWS 계정의 SECRET KEY
- DB_ID: DB 유저 ID
- DB_PW: DB 유저 PW
- DOCKER_HUB_ID: 배포용 Docker Hub 계정의 ID
- DOCKER_HUB_NAME: 배포용 Docker Hub 계정의 이름
- DOCKER_HUB_PW: 배포용 Docker Hub 계정의 PW
- JWT_SECRET_KEY: JWT를 암호화/복호화하기 위한 비밀키
- NAVER_CLIENT_ID: 네이버 로그인 API를 사용하기 위한 개발자 계정의 ID
- NAVER_CLIENT_SECRET: 네이버 로그인 API를 사용하기 위한 개발자 계정의 비밀키

## Nginx Default File
```
	location / {
		proxy_pass http://172.17.0.1:3000;
	}

	location /api {
		proxy_pass http://172.17.0.1:8080;
	}
```

## Notice
1. 위에서 정의된 Environment Variable의 값을 등록해야 한다.
2. SSH 설치 이후 Default File에 각 요청 URL에 대해 포트를 분기하도록 설정해야 한다.
3. Docker와 GitLab Runner를 사용해 자동화 배포를 설정하는데, GitLab-Runner는 가장 먼저 컨테이너로 등록해주어야 한다.