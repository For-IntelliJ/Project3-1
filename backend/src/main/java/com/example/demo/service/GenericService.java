package com.example.demo.service;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 공통 서비스 클래스 (GenericService)
 *
 * - 다양한 엔티티 클래스(User, Board, Category 등)에 대해 공통적인 저장(save) 기능을 제공
 * - 제네릭(Generic)을 활용하여 재사용 가능한 코드 구조 구현
 *
 * @param <T> 저장 대상이 되는 엔티티 타입 (예: User, Board 등)
 */
public class GenericService<T> {

    // JPA에서 제공하는 CRUD 기능을 가진 리포지터리
    // T: 엔티티 타입 (예: User), Long: ID 타입
    protected final JpaRepository<T, Long> repository;

    /**
     * 생성자
     * - 해당 엔티티의 JpaRepository를 주입받아 필드에 저장
     *
     * @param repository T 타입에 대한 JPA 리포지터리
     */
    public GenericService(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    /**
     * 공통 저장 메서드
     * - 어떤 엔티티든 전달받은 객체를 DB에 저장
     *
     * @param entity 저장할 엔티티 객체
     */
    public void save(T entity) {
        repository.save(entity); // JPA의 기본 save 메서드 호출
    }
}
