package com.example.dev.service;

import com.example.dev.model.GoogleUser;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@Service
public class GoogleOAuthService {

	public GoogleUser getUserInfo(String code, String redirectUri) {
		// 1. AccessToken 얻기
		@SuppressWarnings("unchecked")
		Map<String, String> tokenResponse = WebClient.create().post().uri("https://oauth2.googleapis.com/token")
				.bodyValue(Map.of("code", code, "client_id", "YOUR_CLIENT_ID", "client_secret", "YOUR_CLIENT_SECRET",
						"redirect_uri", redirectUri, "grant_type", "authorization_code"))
				.retrieve().bodyToMono(Map.class).block();

		String accessToken = tokenResponse.get("access_token");

		// 2. 사용자 정보 얻기
		@SuppressWarnings("unchecked")
		Map<String, Object> userInfo = WebClient.create().get().uri("https://www.googleapis.com/oauth2/v3/userinfo")
				.headers(h -> h.setBearerAuth(accessToken)).retrieve().bodyToMono(Map.class).block();

		return new GoogleUser((String) userInfo.get("email"), (String) userInfo.get("name"),
				(String) userInfo.get("picture"));
	}
}
