package com.inbuddy.server.user.handler;

import com.inbuddy.server.user.jwt.TokenProvider;
import com.inbuddy.server.user.service.BlackListTokenService;
import com.inbuddy.server.user.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {

    private final RefreshTokenService refreshTokenService;

    private final BlackListTokenService blackListTokenService;
    private final TokenProvider tokenProvider;


    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {
        refreshTokenService.deleteCurrentUserRefreshToken();

        // TODO: access token을 redis blacklist에 추가

        String token = tokenProvider.resolveToken(request);
        blackListTokenService.saveAccessTokenToRedisBlacklist(token);

    }
}
