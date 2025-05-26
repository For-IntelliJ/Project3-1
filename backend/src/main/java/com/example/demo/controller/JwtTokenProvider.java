package com.example.demo.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    // 토큰 유효 시간 (1시간)
    private final long tokenValidTime = 1000L * 60 * 60;

    /**
     * JWT 토큰 생성
     * @param email 사용자 이메일
     * @return JWT 문자열
     */
    public String createToken(String email) {
        Claims claims = Jwts.claims().setSubject(email); // sub = email
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now) // 토큰 발급 시각
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey) // 서명 알고리즘 + 키
                .compact();
    }

    /**
     * 토큰 유효성 검사
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token); // 파싱이 되면 유효한 토큰
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 토큰에서 사용자 이메일 추출
     */
    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}