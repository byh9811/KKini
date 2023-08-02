package com.kkini.core.domain.s3.controller;

import com.kkini.core.domain.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Controller
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
            @RequestParam(value = "uploadFilePath") String uploadFilePath,
            @RequestParam(value = "uuidFileName") String uuidFileName) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Service.deleteFile(uploadFilePath, uuidFileName));
    }

    @GetMapping("/{downloadFilePath}")
    public ResponseEntity<byte[]> downloadFile(
            @PathVariable String downloadFilePath
    ) throws IOException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Service.downloadFile(downloadFilePath));
    }
}