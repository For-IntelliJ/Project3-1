package com.example.demo.domain; // 이 클래스가 domain 패키지에 속함

import jakarta.persistence.*; // JPA 관련 어노테이션들을 사용하기 위해 임포트

/**
 * User 엔티티 클래스
 * 데이터베이스의 테이블과 매핑되는 객체로, 사용자 정보를 저장하는 역할을 함
 */
@Entity // 이 클래스가 JPA 엔티티임을 명시 (데이터베이스 테이블로 매핑됨)
public class User {

    @Id // 이 필드가 기본 키(PK)임을 명시
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB에서 자동으로 증가(AUTO_INCREMENT)되도록 설정
    private Long id; // 사용자 고유 ID (자동 생성)

    private String username; // 사용자 이름 (직접 입력 받음)
    private String email;    // 사용자 이메일 (직접 입력 받음)

    // 기본 생성자 (JPA에서 필수로 요구함)
    public User() {}

    // 사용자 이름과 이메일을 받아 필드를 초기화하는 생성자
    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // getter: 외부에서 id 값을 조회할 수 있게 함
    public Long getId() {
        return id;
    }

    // getter: 외부에서 username 값을 조회할 수 있게 함
    public String getUsername() {
        return username;
    }

    // getter: 외부에서 email 값을 조회할 수 있게 함
    public String getEmail() {
        return email;
    }

    // setter: 외부에서 username 값을 설정할 수 있게 함
    public void setUsername(String username) {
        this.username = username;
    }

    // setter: 외부에서 email 값을 설정할 수 있게 함
    public void setEmail(String email) {
        this.email = email;
    }
}
