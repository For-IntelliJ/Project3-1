//package com.example.demo.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .cors(Customizer.withDefaults()) // WebConfig에 등록된 CORS 사용
//                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight 허용
//                        .requestMatchers("/user/**").permitAll() // 회원가입 등 열어둠
//                        .anyRequest().authenticated()
//                )
//                .formLogin(form -> form.disable())
//                .httpBasic(Customizer.withDefaults());
//
//
//        return http.build();
//    }
//}
