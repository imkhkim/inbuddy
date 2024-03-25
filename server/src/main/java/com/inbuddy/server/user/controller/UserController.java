package com.inbuddy.server.user.controller;

import static com.inbuddy.server.user.jwt.TokenProvider.ACCESS_TOKEN_EXPIRE_TIME_IN_SECONDS;
import static com.inbuddy.server.user.jwt.TokenProvider.ACCESS_TOKEN_NAME;
import static com.inbuddy.server.user.jwt.TokenProvider.REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS;
import static com.inbuddy.server.user.jwt.TokenProvider.REFRESH_TOKEN_NAME;

import com.inbuddy.server.user.jwt.TokenProvider;
import com.inbuddy.server.user.service.RefreshTokenService;
import com.inbuddy.server.user.service.UserService;
import com.inbuddy.server.user.utils.CookieUtils;
import com.nimbusds.jose.shaded.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@AllArgsConstructor
@RequestMapping("/api/user")
@RestController
public class UserController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final TokenProvider tokenProvider;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        return ResponseEntity.ok().body(userService.findCurrentUser());
    }


    @GetMapping("/token/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {

        refreshTokenService.findCurrentUserRefreshTokenAndCompareWith(
                tokenProvider.resolveToken(request));

        String accessToken = tokenProvider.createAccessToken();
        String refreshToken = tokenProvider.createRefreshToken();

        refreshTokenService.reissueCurrentUserRefreshToken(refreshToken);

        System.out.println("New Access Token: " + accessToken);
        System.out.println("New Refresh Token: " + refreshToken);

        CookieUtils.setCookie(response, ACCESS_TOKEN_NAME, accessToken,
                ACCESS_TOKEN_EXPIRE_TIME_IN_SECONDS);
        CookieUtils.setCookie(response, REFRESH_TOKEN_NAME, refreshToken,
                REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS);

//        return ResponseEntity.ok().build();

        JsonObject obj = new JsonObject();

        obj.addProperty("act", accessToken);
        obj.addProperty("rft", refreshToken);
        return ResponseEntity.ok().body(obj);
        
    }

}
