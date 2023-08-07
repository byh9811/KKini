# jdk 이미지 불러오기
FROM  node:16.20.1

# Docker Container에서 작업이 이루어지는 위치
WORKDIR /usr/src/app

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# 번들 파일 실행하기 (컨테이너 실행할 때 동작)
CMD ["npm", "install"]
CMD ["npm", "start"]