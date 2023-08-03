package com.kkini.core.domain.s3.controller;

import com.kkini.core.domain.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping
    public ResponseEntity<Object> uploadFiles(
            @RequestParam(value = "fileType") String fileType,
            @RequestPart(value = "files") List<MultipartFile> multipartFiles) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Service.uploadFiles(fileType, multipartFiles));
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteFile(
            @RequestParam(value = "fileName") List<String> fileNames) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Service.deleteFile(fileNames));
    }

    @GetMapping
    public ResponseEntity<List<byte[]>> downloadFile() throws IOException {
        List<String> downloadFilePath = new ArrayList<>();

        // 다운로드 목록
        downloadFilePath.add("post/2023/08/03/45270fdb-3bf6-49e8-bdef-714cf72cf1a7.png");
        downloadFilePath.add("post/2023/08/03/06881eac-d589-4789-8b0f-a2ea539160ab.png");
        downloadFilePath.add("post/2023/08/03/2057d9f0-828e-418b-bb04-098782de0e4d.png");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Service.downloadFile(downloadFilePath));
    }
}