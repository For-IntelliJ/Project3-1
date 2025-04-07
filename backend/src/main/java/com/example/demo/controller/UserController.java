package com.example.demo.controller; // 이 클래스가 controller 패키지에 속함

import com.example.demo.service.UserService; // UserService 클래스 임포트
import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 어노테이션
import org.springframework.web.bind.annotation.GetMapping; // GET 요청 매핑용 어노테이션
import org.springframework.web.bind.annotation.RequestParam; // 요청 파라미터를 매핑하기 위한 어노테이션
import org.springframework.web.bind.annotation.RestController; // REST API 컨트롤러임을 나타내는 어노테이션
import org.springframework.web.servlet.view.RedirectView; // 리다이렉션 응답을 위한 클래스

/**
 * 사용자 관련 HTTP 요청을 처리하는 컨트롤러 클래스
 * 사용자 등록 기능과 등록 성공 메시지 반환을 담당
 */
@RestController // 이 클래스가 REST API를 처리하는 컨트롤러임을 명시 (데이터를 JSON 등으로 반환)
public class UserController {

    @Autowired // UserService 객체를 스프링이 자동으로 주입해줌 (DI)
    private UserService userService;

    /**
     * 회원 등록 요청 처리
     * 예: http://localhost:8080/register?username=홍길동&email=hong@example.com
     *
     * @param username 사용자 이름 (쿼리 파라미터로 전달)
     * @param email 사용자 이메일 (쿼리 파라미터로 전달)
     * @return 회원 등록 후 success 페이지로 리다이렉트
     */
    @GetMapping("/register") // "/register"로 GET 요청이 들어오면 이 메서드 실행
    public RedirectView registerUser(
            @RequestParam("username") String username, // 요청에서 username 파라미터 추출
            @RequestParam("email") String email) {     // 요청에서 email 파라미터 추출

        userService.registerUser(username, email); // 사용자 등록 로직은 서비스에 위임

        return new RedirectView("/success"); // 등록 후 "/success"로 리다이렉션
    }

    /**
     * 회원 등록 성공 페이지
     *
     * @return 성공 메시지 문자열 반환
     */
    @GetMapping("/success") // "/success" 경로로 요청이 들어오면 아래 메시지 반환
    public String successPage() {
        return "회원 등록이 완료되었습니다!";
    }
}
