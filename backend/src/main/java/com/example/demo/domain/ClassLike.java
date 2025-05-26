package com.example.demo.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "class_like")
public class ClassLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "class_id")
    private Long classId;

    @Column(name = "liked_at")
    private LocalDateTime likedAt = LocalDateTime.now();

    public ClassLike() {}

    // Getters and setters
}