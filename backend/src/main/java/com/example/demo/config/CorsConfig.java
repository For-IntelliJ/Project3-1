//package com.example.demo.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class CorsConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")                       // 모든 엔드포인트에 대해
//                .allowedOrigins("http://localhost:3000") // React 개발 서버 주소 허용
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 모든 주요 메서드 허용
//                .allowCredentials(true)                  // 쿠키/인증 헤더 공유 허용
//                .maxAge(3600);                           // preflight 캐싱 시간
//    }
//
//}