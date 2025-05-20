package com.example.dev.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {

	private final Key SECRET_KEY = Keys.hmacShaKeyFor("dEvBoLt--HHSdEvBoLt--HHSdEvBoLt--HHS".getBytes()); // 최소 32바이트
	private final long EXPIRATION = 1000 * 60 * 60; // 1시간

	public String createToken(String email, List<String> roles) {
		return Jwts.builder().setSubject(email).claim("roles", roles).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
				.signWith(SECRET_KEY, SignatureAlgorithm.HS256).compact();
	}
}
