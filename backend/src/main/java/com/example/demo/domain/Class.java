package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "class")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Class {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "classname", nullable = false)
    private String classname;

    @ManyToOne
    @JoinColumn(name = "mento_id", nullable = false)
    private User mento;

    @Column(name = "mento_info", nullable = false, length = 500)
    private String mentoInfo;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

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
    private Region region;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // =====  추가된 부분 시작 =====

    /** 기본 이미지 URL을 한 군데에서 관리하기 위한 enum */
    public enum DEFAULT_IMAGE {
        IMAGE("https://lh5.googleusercontent.com/proxy/1tcpSHHwVM4X5lkcebeX9xZVZuvq7whm5tb1Utabaw7DDS9CmVoHEavN9g0_VPJk2q2f7LxXpYeYWC4gvRlTdR3AgGhtQ-frxnodK2ChyBBLRVM5WMCLWsiqp5TIWqWA");

        private final String url;
        DEFAULT_IMAGE(String url) { this.url = url; }
        public String getUrl() { return url; }
    }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();

        // mainImage가 null이면 enum의 기본 URL을 넣어준다
        if (this.mainImage == null) {
            this.mainImage = DEFAULT_IMAGE.IMAGE.getUrl();
        }
        // detailImage가 null이면 enum의 기본 URL을 넣어준다
        if (this.detailImage == null) {
            this.detailImage = DEFAULT_IMAGE.IMAGE.getUrl();
        }
    }

    // =====  추가된 부분 끝 =====

    public enum OnlineOffline {
        온라인, 오프라인
    }

    public enum Level {
        초급, 중급, 고급
    }
}
