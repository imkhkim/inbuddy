package com.inbuddy.server.user.info;

import java.util.Map;
import lombok.Getter;

@Getter
public class KakaoOAuth2UserInfo implements OAuth2UserInfo {

    private final OAuth2Provider provider = OAuth2Provider.KAKAO;
    private final Map<String, Object> attributes;
    private final String accessToken;
    private final String id;
    private final String email;
    private final String nickName;

    public KakaoOAuth2UserInfo(String accessToken, Map<String, Object> attributes) {
        this.accessToken = accessToken;

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
        this.attributes = kakaoProfile;

        this.id = ((Long) attributes.get("id")).toString();
        this.email = (String) kakaoAccount.get("email");
        this.nickName = (String) kakaoProfile.get("nickname");

        this.attributes.put("id", id);
        this.attributes.put("email", this.email);

    }
}
