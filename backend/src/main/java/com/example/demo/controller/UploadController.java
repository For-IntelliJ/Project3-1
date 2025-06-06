package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.service.S3Service;
import java.util.Map;

//프론트에서 formData로 보낸 사진 파일을 받는 부분

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")

public class UploadController {

    private final S3Service s3Service;

    public UploadController(S3Service s3Service) { //생성자 생성
        this.s3Service = s3Service;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        System.out.println("uploadImage 호출됨, 파일 이름: " + file.getOriginalFilename());
        try {
            String imageUrl = s3Service.uploadFile(file);
            return ResponseEntity.ok().body(Map.of("imageUrl", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("업로드 실패: " + e.getMessage());
        }
    }

}
