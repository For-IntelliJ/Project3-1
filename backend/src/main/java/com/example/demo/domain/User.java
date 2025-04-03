package com.example.demo.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // 이 클래스가 JPA 엔티티임을 나타냄 (DB 테이블과 매핑됨)
public class User {
    @Id // 기본 키(PK) 필드 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정 (MariaDB의 AUTO_INCREMENT)
    private Long id; // 유저의 고유 ID

    private String username; // 사용자 이름
    private String email; // 사용자 이메일

    // 기본 생성자 (JPA에서 기본 생성자가 필요함)
    public User() {}

    // 필드를 초기화하는 생성자
    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Getter & Setter (캡슐화를 위해 사용)
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
