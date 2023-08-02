# jdk 이미지 불러오기
FROM openjdk:11-jdk

# jar 파일을 Docker Container의 WORKDIR 위치로 복사 (이미지 생성할 때 동작)
WORKDIR /root
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} core.jar

# 환경변수 설정
ARG db_id
ENV DB_ID $db_id
ARG db_pw
ENV DB_PW $db_pw

#CMD ["java", "-jar", "-Dspring.profiles.active=dev core.jar"]
ENTRYPOINT ["sh", "-c", "java -jar -Dspring.profiles.active=dev core.jar"]