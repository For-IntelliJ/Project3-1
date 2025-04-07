package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 * 제네릭 기반의 공통 서비스 클래스
 * - 어떤 엔티티 타입이든 저장 기능을 제공할 수 있도록 설계됨
 * - 예: User, Mentor, Mentee 등 다양한 엔티티에서 재사용 가능
 *
 * @param <T> 저장할 엔티티 타입
 */
public class GenericService<T> {

    // JpaRepository는 Spring Data JPA에서 제공하는 기본적인 CRUD 기능을 가진 인터페이스
    // 여기서 T는 엔티티 클래스, Long은 해당 엔티티의 기본 키 타입(PK)이다
    protected final JpaRepository<T, Long> repository;

    /**
     * 생성자를 통해 특정 엔티티에 대한 JPA 레포지토리를 주입받음
     * 예: UserRepository, MentorRepository 등
     *
     * @param repository 엔티티에 해당하는 JPA 레포지토리
     */
    public GenericService(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    /**
     * 전달받은 엔티티를 데이터베이스에 저장하는 공통 메서드
     *
     * @param entity 저장할 엔티티 객체
     */
    public void save(T entity) {
        repository.save(entity);
    }
}
