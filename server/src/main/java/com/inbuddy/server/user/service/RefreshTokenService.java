package com.inbuddy.server.user.service;

import static com.inbuddy.server.user.jwt.TokenProvider.REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS;

import com.inbuddy.server.user.exception.RefreshTokenExpiredException;
import com.inbuddy.server.user.utils.AuthenticationUtils;
import jakarta.transaction.Transactional;
import java.time.Duration;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public void saveRefreshToken(String refreshToken) {
        redisTemplate.opsForValue().set(AuthenticationUtils.getCurrentProviderId(), refreshToken,
            Duration.ofSeconds(REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS));
    }

    @Transactional
    public String getProviderIdFromRefreshToken(String providerId) {
        return redisTemplate.opsForValue()
            .get(Optional.ofNullable(redisTemplate.opsForValue().get(providerId))
                .orElseThrow(RefreshTokenExpiredException::new));
    }
}
