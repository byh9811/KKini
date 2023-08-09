package com.kkini.core.global.database;

import org.springframework.boot.CommandLineRunner;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class DummyData {

    public static void main(String[] args) {

        String tableName = "member";
        String columns = "auth_provider, email, image, level, name, nickname, oauth2id, refresh_token, role";
        String values = "NAVER, ";

        String sqlQuery = "INSERT INTO " + tableName + " (" + columns + ") VALUES (" + values + ");";

        String filePath = "C:\\data\\dummy_data.txt";

        try{
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath));
            bufferedWriter.write(sqlQuery);
            bufferedWriter.close();
            System.out.println("INSERT문이 파일에 저장되어었습니다.");
        }catch (IOException e){
            System.out.println("파일 저장 중 오류 발생: " + e.getMessage());
        }
    }
}
