//package com.example.demo.domain;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//import lombok.NoArgsConstructor;
//import lombok.AllArgsConstructor;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "apply")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class Apply {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
////    private Long id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "class_id", nullable = false)
//    private com.example.demo.domain.Class classEntity;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "mentee_id", nullable = false)
//    private User mentee;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private ApplyStatus status = ApplyStatus.PENDING;
//
//    @Column(name = "applied_at", nullable = false)
//    private LocalDateTime appliedAt = LocalDateTime.now();
//
//    public enum ApplyStatus {
//        PENDING("신청중"),
//        APPROVED("승인됨"),
//        REJECTED("거절됨");
//
//        private final String description;
//
//        ApplyStatus(String description) {
//            this.description = description;
//        }
//
//        public String getDescription() {
//            return description;
//        }
//    }
//}
