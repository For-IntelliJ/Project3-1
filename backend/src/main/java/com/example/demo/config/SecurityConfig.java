package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // (1) WebMvcConfigurer-등록된 CorsConfig 를 사용
                .cors(Customizer.withDefaults())
                // (2) REST API 이므로 CSRF 토큰 검사 비활성화
                .csrf(csrf -> csrf.disable())
                // (3) pre-flight OPTIONS 요청은 모두 허용
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // (4) 인가 없이 열어둘 API 목록
                        .requestMatchers(
                                "/api/users/**",
                                "/api/categories/**",
                                "/api/regions/**",
                                "/api/classes/**"
                        ).permitAll()

                        // (5) 그 외 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                )
                // (6) formLogin, httpBasic 모두 비활성화
                .formLogin(form -> form.disable())
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

}
