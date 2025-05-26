package com.example.demo.controller;

import com.example.demo.domain.Class;
import com.example.demo.domain.Category;
import com.example.demo.domain.Region;
import com.example.demo.domain.User;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.RegionRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;
    private final CategoryRepository categoryRepository;
    private final RegionRepository regionRepository;
    private final UserRepository userRepository;

    // 기본 경로 설정 (실제 환경에 맞게 수정 필요)
    private final String uploadDir = "uploads/";

    @PostMapping
    public ResponseEntity<?> createClass(@RequestBody Class classEntity) {
        try {
            System.out.println("받은 데이터: " + classEntity);

            if (classEntity.getCategory() == null || classEntity.getCategory().getId() == null) {
                return ResponseEntity.badRequest().body("카테고리 정보가 없습니다.");
            }

            if (classEntity.getRegion() == null || classEntity.getRegion().getId() == null) {
                return ResponseEntity.badRequest().body("지역 정보가 없습니다.");
            }

            // (1) 카테고리 객체 연결
            Category category = categoryRepository.findById(classEntity.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("카테고리 ID를 찾을 수 없습니다."));
            classEntity.setCategory(category);

            // (2) 지역 객체 연결
            Region region = regionRepository.findById(classEntity.getRegion().getId())
                    .orElseThrow(() -> new RuntimeException("지역 ID를 찾을 수 없습니다."));
            classEntity.setRegion(region);

            // (3) 멘토 ID=1번 사용자 고정 연결
            User mentor = userRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("멘토(ID=1)를 찾을 수 없습니다."));
            classEntity.setMento(mentor);

            // (4) 저장
            classService.save(classEntity);

            return ResponseEntity.ok("클래스 생성 완료!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("클래스 생성 실패: " + e.getMessage());
        }
    }

    @PostMapping(value = "/with-files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createClassWithFiles(
            @RequestPart("classData") Class classEntity,
            @RequestPart(value = "mainImage", required = false) MultipartFile mainImage,
            @RequestPart(value = "detailImage", required = false) MultipartFile detailImage) {

        try {
            System.out.println("받은 데이터: " + classEntity);

            // 파일 업로드 처리
            if (mainImage != null && !mainImage.isEmpty()) {
                String mainImagePath = saveFile(mainImage);
                classEntity.setMainImage(mainImagePath);
            }

            if (detailImage != null && !detailImage.isEmpty()) {
                String detailImagePath = saveFile(detailImage);
                classEntity.setDetailImage(detailImagePath);
            }

            // 기존 로직과 동일하게 객체 연결
            Category category = categoryRepository.findById(classEntity.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("카테고리 ID를 찾을 수 없습니다."));
            classEntity.setCategory(category);

            Region region = regionRepository.findById(classEntity.getRegion().getId())
                    .orElseThrow(() -> new RuntimeException("지역 ID를 찾을 수 없습니다."));
            classEntity.setRegion(region);

            User mentor = userRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("멘토(ID=1)를 찾을 수 없습니다."));
            classEntity.setMento(mentor);

            // 저장
            classService.save(classEntity);

            return ResponseEntity.ok("클래스 및 이미지 업로드 완료!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("클래스 생성 실패: " + e.getMessage());
        }
    }

    // 파일 저장 메서드
    private String saveFile(MultipartFile file) throws IOException {
        // 저장 디렉토리 생성
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 파일명 중복 방지를 위한 UUID 사용
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // 파일 저장
        Files.copy(file.getInputStream(), filePath);

        return fileName;
    }

    @GetMapping
    public List<Class> getAllClasses() {
        return classService.findAll();
    }

    @GetMapping("/{id}")
    public Class getClassById(@PathVariable Long id) {
        return classService.findById(id);
    }
}