package com.kkini.core.global.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Util {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private final AmazonS3Client amazonS3Client;

    /**
     * S3 : 파일 업로드
     * fileType : 파일 폴더 구분(ex. post, recipe, badge, member)
     */
    public List<String> uploadFiles(String fileType, List<MultipartFile> multipartFiles) {

        List<String> filePaths = new ArrayList<>();

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
                String filePath = uploadFilePath + "/" + uploadFileName;

                // S3에 폴더 및 파일 업로드
                amazonS3Client.putObject(
                        new PutObjectRequest(bucketName, filePath, inputStream, objectMetadata)
                );

                // TODO : 외부에 공개하는 파일인 경우 Public Read 권한을 추가, ACL 확인
                // amazonS3Client.putObject(
                // new PutObjectRequest(bucket, s3Key, inputStream, objectMetadata)
                // .withCannedAcl(CannedAccessControlList.PublicRead));

                // S3에 업로드한 폴더 및 파일 URL
                uploadFileUrl = amazonS3Client.getUrl(bucketName, filePath).toString();
            } catch (IOException e) {
                e.printStackTrace();
                log.error("Filed upload failed", e);
            }

            // 저장된 파일 정보 반환
            filePaths.add(uploadFilePath + "/" + uploadFileName);
        }

        return filePaths;
    }

    /**
     * S3 : 파일 삭제
     */
    public List<String> deleteFile(List<String> filePaths) {

        List<String> result = new ArrayList<>();

        for(String filePath : filePaths) {
            String state = "success";

            try {
                boolean isObjectExist = amazonS3Client.doesObjectExist(bucketName, filePath);
                if (isObjectExist) {
                    amazonS3Client.deleteObject(bucketName, filePath);
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
     * S3 : 이미지 url 조합
     */
    public List<String> getImageUrl(List<String> filePaths) {
        List<String> urlList = new ArrayList<>();

        for(String filePath : filePaths) {
            try {
                urlList.add(amazonS3Client.getUrl(bucketName, filePath).toString());
            } catch (Exception e) {
                log.debug("file not found", e);
            }
        }

        return urlList;
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

}
