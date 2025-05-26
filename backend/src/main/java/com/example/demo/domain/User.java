package com.example.demo.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * User 엔티티 클래스
 * - 데이터베이스의 user 테이블과 매핑되는 클래스
 * - 회원 정보를 담는 역할
 */
@Entity // 이 클래스가 JPA 엔티티임을 나타냄 (DB 테이블로 매핑)
@Table(name = "user") // DB의 테이블명 지정
public class User {

    @Id // 기본 키(PK) 필   드
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB에서 자동 증가 (AUTO_INCREMENT)
    private Long id;

    @Column(nullable = false, unique = true) // NOT NULL + UNIQUE 제약 조건
    private String email; // 사용자 이메일 (로그인 ID)

    @Column(nullable = false) // NOT NULL
    private String password; // 사용자 비밀번호 (암호화해서 저장 권장)

    @Column(nullable = false)
    private String username; // 사용자 실명 (이름)

    @Column(nullable = false, unique = true)
    private String nickname; // 닉네임 (중복 불가)

    @Column(nullable = false, unique = true)
    private String phone; // 전화번호 (중복 불가)

    @Enumerated(EnumType.STRING) // enum을 문자열 형태로 저장 (예: 'M', 'F')
    private Gender gender; // 성별

    private LocalDateTime createdAt = LocalDateTime.now(); // 가입 시각 (기본값: 현재 시간)

    // 성별을 나타내는 열거형 타입 (DB에는 'M' 또는 'F'로 저장됨)
    public enum Gender {
        M, F
    }

    // 기본 생성자 (JPA는 반드시 필요함)
    public User() {}

    // === Getter / Setter 메서드 ===
    // 캡슐화를 위해 외부에서 접근 시 getter/setter 사용

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Gender getGender() {
        return gender;
    }
    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
