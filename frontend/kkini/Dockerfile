# jdk 이미지 불러오기
FROM  node:16.20.1

# 환경변수 설정
ARG nav_key
ENV REACT_APP_NAVER_API_KEY $nav_key

# Docker Container에서 작업이 이루어지는 위치
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

# 번들 파일 실행하기 (컨테이너 실행할 때 동작)
CMD ["npx", "serve", "-s", "./build"]
#CMD ["npm", "start"]