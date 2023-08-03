package com.kkini.core.domain.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.kkini.core.domain.s3.dto.S3FileDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    // 문제없음
    private final AmazonS3Client amazonS3Client;

    /**
     * S3 : 파일 업로드
     * ----- 입력 -----
     * fileType : 파일 폴더 구분(ex. post, recipe, badge, member)
     * multipartFiles : 이미지 리스트(image1.png, image2.jpg, ...)
     */
    public List<S3FileDto> uploadFiles(String fileType, List<MultipartFile> multipartFiles) {

        List<S3FileDto> s3files = new ArrayList<>();

        // 포스트와 레시피만 폴더에 날짜를 붙인다.
        String uploadFilePath;
        if(fileType.equals("post") || fileType.equals("recipe")) {
            uploadFilePath = fileType + "/" + getFolderName();
        } else {
            uploadFilePath = fileType;
        }

        for (MultipartFile multipartFile : multipartFiles) {
            String originalFileName = multipartFile.getOriginalFilename();

            // 파일이름변경
            String uploadFileName = getUuidFileName(originalFileName);
            String uploadFileUrl = "";

            // 메타데이터 생성
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(multipartFile.getSize());
            objectMetadata.setContentType(multipartFile.getContentType());

            try (InputStream inputStream = multipartFile.getInputStream()) {
                // ex) 구분(/년/월/일)/파일.확장자
                String keyName = uploadFilePath + "/" + uploadFileName;

                // S3에 폴더 및 파일 업로드
                amazonS3Client.putObject(
                        new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata)
                );

                // TODO : 외부에 공개하는 파일인 경우 Public Read 권한을 추가, ACL 확인
                // amazonS3Client.putObject(
                // new PutObjectRequest(bucket, s3Key, inputStream, objectMetadata)
                // .withCannedAcl(CannedAccessControlList.PublicRead));

                // S3에 업로드한 폴더 및 파일 URL
                uploadFileUrl = amazonS3Client.getUrl(bucketName, keyName).toString();
            } catch (IOException e) {
                e.printStackTrace();
                log.error("Filed upload failed", e);
            }

            // 저장된 파일 정보 반환
            s3files.add(
                S3FileDto.builder()
                    .originalFileName(originalFileName)
                    .uploadFileName(uploadFileName)
                    .uploadFilePath(uploadFilePath)
                    .uploadFileUrl(uploadFileUrl)
                    .build()
            );
        }

        return s3files;
    }

    /**
     * S3 : 파일 삭제
     */
    public List<String> deleteFile(List<String> fileNames) {

        List<String> result = new ArrayList<>();

        for(String fileName : fileNames) {
            String state = "success";

            try {
                boolean isObjectExist = amazonS3Client.doesObjectExist(bucketName, fileName);
                if (isObjectExist) {
                    amazonS3Client.deleteObject(bucketName, fileName);
                } else {
                    state = "file not found";
                }
            } catch (Exception e) {
                state = "failed";
                log.debug("Delete File failed", e);
            }

            result.add(state);
        }

        return result;
    }

    /**
     * S3 : 파일 다운로드
     */
    public List<byte[]> downloadFile(List<String> downloadFilePaths) throws IOException{
        List<byte[]> result = new ArrayList<>();

        for(String downloadFilePath : downloadFilePaths) {
            // AWS 파일 다운로드
            S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucketName, downloadFilePath));
            S3ObjectInputStream objectInputStream = s3Object.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(objectInputStream);

            result.add(bytes);
        }

        return result;
    }

    /**
     * UUID 파일명 반환
     */
    public String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + ext;
    }

    /**
     * 년/월/일 폴더명 반환
     */
    private String getFolderName() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        Date date = new Date();
        String str = sdf.format(date);
        return str.replace("-", "/");
    }

    /**
     * 파일 확장자 반환
     */
    private MediaType contentType(String keyname) {
        String[] arr = keyname.split("\\.");
        String type = arr[arr.length - 1];
        switch(type) {
            case "png":
                return MediaType.IMAGE_PNG;
            case "jpg":
                return MediaType.IMAGE_JPEG;
            default:
                return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
}
