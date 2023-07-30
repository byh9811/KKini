# jdk 이미지 불러오기
FROM openjdk:11-jdk

# jar 파일을 Docker Container의 WORKDIR 위치로 복사 (이미지 생성할 때 동작)
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} core.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev /core.jar"]