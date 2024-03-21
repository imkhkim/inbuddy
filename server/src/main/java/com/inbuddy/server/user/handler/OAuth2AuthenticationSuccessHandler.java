package com.inbuddy.server.user.handler;

import static com.inbuddy.server.user.repository.HttpCookieOAuth2AuthorizationRequestRepository.MODE_PARAM_COOKIE_NAME;
import static com.inbuddy.server.user.repository.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

import com.inbuddy.server.user.info.OAuth2UserInfo;
import com.inbuddy.server.user.info.OAuth2UserPrincipal;
import com.inbuddy.server.user.jwt.TokenProvider;
import com.inbuddy.server.user.utils.CookieUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;

    @Value("${host.client.base-url}")
    private String client;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        setDefaultTargetUrl(client);

        String targetUrl;
        targetUrl = determineTargetUrl(request, response, authentication);
    }


    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {

        Optional<String> redirectUri = CookieUtils.getCookie(request,
                        REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String mode = CookieUtils.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(client);

        OAuth2UserPrincipal principal = getOAuth2UserPrincipal(authentication);

        if (principal == null) {
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("login", "failure")
                    .build().toUriString();
        }

        if ("login".equalsIgnoreCase(mode)) {
            OAuth2UserInfo userInfo = principal.getUserInfo();

            String accessToken = tokenProvider.createAccessToken(authentication);

//            String refreshToken = tokenProvider.createRefreshToken(authentication);

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("login", "success")
                    .build().toUriString();

        }
        return super.determineTargetUrl(request, response, authentication);
    }

    private OAuth2UserPrincipal getOAuth2UserPrincipal(Authentication authentication) {

        Object principal = authentication.getPrincipal();
        if (principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }

        return null;
    }
}
