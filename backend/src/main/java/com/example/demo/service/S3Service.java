package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.core.sync.RequestBody;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final String bucketname = "itda-kangbe-s3";

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String key = "uploads/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketname)
                .key(key)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        // S3에 public read 권한이 있는 경우
        return "https://" + bucketname + ".s3.ap-northeast-3.amazonaws.com/" + key;
    }

    // 디버깅용 메서드 추가
    public void testCredentials() {
        try {
            s3Client.listBuckets().buckets().forEach(b -> System.out.println(b.name()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public S3Client getS3Client() {
        return this.s3Client;
    }
}
