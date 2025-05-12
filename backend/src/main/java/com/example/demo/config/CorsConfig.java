//package com.example.demo.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration // 이 클래스가 Spring의 설정 클래스임을 나타냄
//public class CorsConfig implements WebMvcConfigurer { // WebMvcConfigurer를 구현하여 CORS 설정 추가
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**") // 모든 엔드포인트에 대해 CORS 허용
//                .allowedOrigins("http://localhost:3000") // 특정 Origin(프론트엔드 주소) 허용
//                .allowedMethods("GET", "POST", "PUT", "DELETE"); // 허용할 HTTP 메서드 지정
//    }
//}
