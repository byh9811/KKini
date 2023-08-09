package com.kkini.core.global.database;

import org.springframework.boot.CommandLineRunner;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class DummyData {

    public static void main(String[] args) {
        System.out.println("hello");

        String tableName = "member";
        String columns = "create_date_time, auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role";
        String create = "now(), ";
        String modify = "now(), ";
        String auth_provider = "'NAVER', ";
        String email = "ssafy";
        String domain = "@ssafy.com";
        String image = "hello";
        String level = "1, ";
        String nickname = "테스트";
        String oauth2id = "test";
        String refresh_token = "token";
        String role = "'ROLE_USER', ";
        String name = "김싸피";

//        String sqlQuery = "INSERT INTO " + tableName + " (" + columns + ") VALUES (" + values + ");";

        String filePath = "C:\\data\\member.txt";

        try{
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath));
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i < 10000; i++) {
                sb.append("INSERT INTO ").append(tableName).append(" VALUE (")
                        .append(Integer.toString(i)+", ")
                        .append(create)
                        .append(modify)
                        .append(auth_provider)
                        .append("'").append(email + Integer.toString(i)).append(domain+"'").append(", ")
                        .append("'").append(image + Integer.toString(i)).append("', ")
                        .append(level)
                        .append("'").append(name + Integer.toString(i)).append("', ")
                        .append("'").append(nickname + Integer.toString(i)).append("', ")
                        .append("'").append(oauth2id + Integer.toString(i)).append("', ")
                        .append("'").append(refresh_token + Integer.toString(i)).append("', ")
                        .append(role)
                        .append(0)
                        .append(");");
                sb.append("\n");
            }
            bufferedWriter.write(sb.toString());
            bufferedWriter.close();
            System.out.println("INSERT문이 파일에 저장되어었습니다.");
        }catch (IOException e){
            System.out.println("파일 저장 중 오류 발생: " + e.getMessage());
        }
    }
}
