package com.example.demo.controller; // ✅ AuthController와 같은 패키지

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 API에 대해
                .allowedOrigins("http://localhost:3000") // React 앱 허용
                .allowedMethods("*") // GET, POST 등 다 허용
                .allowCredentials(true); // 쿠키/토큰 허용 (옵션)
    }
}
