package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "classname", nullable = false)
    private String classname;

    @ManyToOne
    @JoinColumn(name = "mento_id", nullable = false)
    private User mento; // User 엔티티와 연관 (id=1 홍길동)

    @Column(name = "mento_info", nullable = false, length = 500)
    private String mentoInfo;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // Category 테이블 연관 (1:코딩, 2:AI)

    @Column(name = "curriculum", nullable = false, length = 2000)
    private String curriculum;

    @Column(name = "main_image")
    private String mainImage;

    @Column(name = "detail_image")
    private String detailImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "onoff")
    private OnlineOffline onoff;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private Level level;

    @Column(name = "detail_content", columnDefinition = "TEXT")
    private String detailContent;

    @Column(name = "space_info")
    private String spaceInfo;

    @Column(name = "addr", length = 500)
    private String addr;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region; // Region 테이블 연관

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public enum OnlineOffline {
        온라인, 오프라인
    }

    public enum Level {
        초급, 중급, 고급
    }
}
