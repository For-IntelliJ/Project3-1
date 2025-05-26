package com.example.demo.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private int hits;

    @Column(name = "writer_id")
    private Long writerId;

    private java.time.LocalDateTime writetime;

    // 기본 생성자 필수!
    public Board() {}

    // getter/setter 생략 가능
}
