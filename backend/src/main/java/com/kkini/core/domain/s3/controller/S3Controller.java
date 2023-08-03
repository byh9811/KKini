package com.kkini.core.domain.s3.controller;

import com.kkini.core.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
public class S3Controller {

    private final S3Util s3Util;

    @PostMapping
    public ResponseEntity<Object> uploadFiles(
            @RequestParam(value = "fileType") String fileType,
            @RequestPart(value = "files") List<MultipartFile> multipartFiles) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Util.uploadFiles(fileType, multipartFiles));
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteFile(
            @RequestParam(value = "fileName") List<String> fileNames) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Util.deleteFile(fileNames));
    }

    @GetMapping
    public ResponseEntity<List<String>> getImageUrl() throws IOException {
        List<String> filePaths = new ArrayList<>();

        // test
        String[] values = {
                "post/2023/08/03/feb4b6ad-a95a-4251-a884-9d9b3ee0e392.png",
                "post/2023/08/03/423f6aae-0470-4b5a-97f2-252fbe03eaf6.png",
                "post/2023/08/03/40b03e14-17d9-4f81-8831-300ac9aa3964.png",
                "post/2023/08/03/6dbdbf7b-a5f8-41eb-89dd-26f978689152.png",
                "post/2023/08/03/25c55ad7-d858-40f4-8828-9ef40db67419.png"
        };
        filePaths.addAll(Arrays.asList(values));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(s3Util.getImageUrl(filePaths));
    }

}