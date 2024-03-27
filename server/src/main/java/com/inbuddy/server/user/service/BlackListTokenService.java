package com.inbuddy.server.user.service;

import com.inbuddy.server.user.jwt.TokenProvider;
import jakarta.transaction.Transactional;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlackListTokenService {

    private final RedisTemplate<String, String> redisTemplate;
    private final TokenProvider tokenProvider;


    @Transactional
    public void saveAccessTokenToRedisBlacklist(String accessToken) {
        long expireTime = tokenProvider.getTokenExpireTime(accessToken);

        redisTemplate.opsForValue()
                .set(accessToken, "blacklist", expireTime, TimeUnit.SECONDS);

    }


}
