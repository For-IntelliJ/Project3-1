//package com.example.demo.controller;
//
//import com.example.demo.domain.Apply;
//import com.example.demo.service.ApplyService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/applies")
//@CrossOrigin(origins = "http://localhost:3000")
//public class ApplyController {
//
//    private final ApplyService applyService;
//
//    @Autowired
//    public ApplyController(ApplyService applyService) {
//        this.applyService = applyService;
//    }
//
//    /**
//     * 클래스 신청 API
//     * POST /api/applies
//     */
//    @PostMapping
//    public ResponseEntity<Map<String, Object>> applyToClass(@RequestBody Map<String, Object> request) {
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            // 요청 데이터 추출
//            Long classId = Long.valueOf(request.get("classId").toString());
//            Long menteeId = 3L; // user_id 3번 (MENTEE 역할)으로 변경
//
//            // 콘솔 로그로 데이터 확인
//            System.out.println("=== 클래스 신청 요청 ===");
//            System.out.println("Class ID: " + classId);
//            System.out.println("Mentee ID: " + menteeId + " (사용자 ID 3번 - MENTEE)");
//            System.out.println("Request Data: " + request);
//
//            // 신청 처리
//            Apply apply = applyService.applyToClass(classId, menteeId);
//
//            // 성공 응답
//            response.put("success", true);
//            response.put("message", "클래스 신청이 완료되었습니다.");
//            response.put("data", Map.of(
//                    "applyId", apply.getId(),
//                    "classId", apply.getClassEntity().getId(),
//                    "className", apply.getClassEntity().getClassname(),
//                    "menteeId", apply.getMentee().getId(),
//                    "menteeName", apply.getMentee().getUsername() != null ? apply.getMentee().getUsername() : "사용자명 없음",
//                    "status", apply.getStatus().getDescription(),
//                    "appliedAt", apply.getAppliedAt().toString()
//            ));
//
//            // 콘솔 로그로 결과 확인
//            System.out.println("=== 신청 완료 ===");
//            System.out.println("Apply ID: " + apply.getId());
//            System.out.println("Status: " + apply.getStatus());
//            System.out.println("Applied At: " + apply.getAppliedAt());
//
//            return ResponseEntity.ok(response);
//
//        } catch (Exception e) {
//            // 에러 응답
//            System.err.println("=== 신청 실패 ===");
//            System.err.println("Error: " + e.getMessage());
//            e.printStackTrace();
//
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//    }
//
//    /**
//     * 특정 사용자의 신청 목록 조회
//     * GET /api/applies/mentee/{menteeId}
//     */
//    @GetMapping("/mentee/{menteeId}")
//    public ResponseEntity<List<Apply>> getAppliesByMentee(@PathVariable Long menteeId) {
//        List<Apply> applies = applyService.getAppliesByMentee(menteeId);
//        return ResponseEntity.ok(applies);
//    }
//
//    /**
//     * 특정 클래스의 신청 목록 조회
//     * GET /api/applies/class/{classId}
//     */
//    @GetMapping("/class/{classId}")
//    public ResponseEntity<List<Apply>> getAppliesByClass(@PathVariable Long classId) {
//        List<Apply> applies = applyService.getAppliesByClass(classId);
//        return ResponseEntity.ok(applies);
//    }
//
//    /**
//     * 신청 상태 변경
//     * PUT /api/applies/{applyId}/status
//     */
//    @PutMapping("/{applyId}/status")
//    public ResponseEntity<Apply> updateApplyStatus(
//            @PathVariable Long applyId,
//            @RequestBody Map<String, String> request) {
//        try {
//            Apply.ApplyStatus status = Apply.ApplyStatus.valueOf(request.get("status"));
//            Apply updatedApply = applyService.updateApplyStatus(applyId, status);
//            return ResponseEntity.ok(updatedApply);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }
//    }
//}
