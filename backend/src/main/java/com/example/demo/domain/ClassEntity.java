package com.example.demo.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "class")
public class ClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "classname")
    private String classname;

    @Column(name = "mento_id")
    private Long mentoId;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "main_image")
    private String mainImage;

    @Column(name = "detail_image")
    private String detailImage;

    @Enumerated(EnumType.STRING)
    private Level level = Level.beginner;

    @Column(name = "detail_content")
    private String detailContent;

    @Column(name = "space_info")
    private String spaceInfo;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Level {
        beginner, intermediate, advanced
    }

    public ClassEntity() {}

    // Getters and setters
}