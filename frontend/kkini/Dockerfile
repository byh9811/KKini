# jdk 이미지 불러오기
FROM  node:16.20.1

# Docker Container에서 작업이 이루어지는 위치
WORKDIR /usr/src/app

# 현재 경로에 있는 실행에 필요한 파일들을 Docker Container의 WORKDIR 위치로 모두 복사 (이미지 생성할 때 동작)
COPY ./.public ./.public
COPY ./.src ./.src
COPY ./node_modules ./node_modules
COPY ./package* ./

# 번들 파일 실행하기 (컨테이너 실행할 때 동작)
CMD ["npm", "run", "start"]