package com.example.dev.controller;

import com.example.dev.jwt.JwtTokenProvider;
import com.example.dev.service.GoogleOAuthService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/oauth2/callback")
@RequiredArgsConstructor
public class GoogleOAuthController {

	private final JwtTokenProvider jwtTokenProvider;
	private final GoogleOAuthService googleOAuthService;

	@GetMapping("/google")
	public String googleDefaultLogin(@RequestParam("code") String code, Model model) {
		var userInfo = googleOAuthService.getUserInfo(code, "http://localhost:8085/oauth2/callback/google");
		model.addAttribute("user", userInfo);
		return "login/GoogleSuccess"; // 기본 성공 화면
	}

	@GetMapping("/session")
	public String googleSessionLogin(@RequestParam("code") String code, HttpSession session) {
		var userInfo = googleOAuthService.getUserInfo(code, "http://localhost:8085/oauth2/callback/session");
		session.setAttribute("user", userInfo);
		return "redirect:/view/html/template.do"; // 세션 기반 로그인 후 이동
	}

	@GetMapping("/jwt")
	public ResponseEntity<?> googleJwtLogin(@RequestParam("code") String code) {
		var userInfo = googleOAuthService.getUserInfo(code, "http://localhost:8085/oauth2/callback/jwt");
		String jwt = jwtTokenProvider.createToken(userInfo.getEmail(), userInfo.getRoles());
		return ResponseEntity.ok().body("JWT Token: " + jwt);
	}
}
