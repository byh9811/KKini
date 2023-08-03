package com.kkini.core.domain.user.service;


import com.kkini.core.domain.user.entity.User;
import com.kkini.core.domain.user.enums.AuthProvider;
import com.kkini.core.domain.user.enums.Role;
import com.kkini.core.domain.user.oauth2.OAuth2UserInfo;
import com.kkini.core.domain.user.oauth2.OAuth2UserInfoFactory;
import com.kkini.core.domain.user.oauth2.UserPrincipal;
import com.kkini.core.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Locale;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        log.debug("loaduser =>");
        log.debug(" {}", oAuth2UserRequest);
        OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        log.debug(" {}", oAuth2UserService);
        OAuth2User oAuth2User = oAuth2UserService.loadUser(oAuth2UserRequest);
        log.debug(" {}", oAuth2User);

        return processOAuth2User(oAuth2UserRequest, oAuth2User);
    }

    protected OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        log.debug("processOAuth2User =>");
        log.debug(" {}", oAuth2UserRequest);
        log.debug(" {}", oAuth2User);
        //OAuth2 로그인 플랫폼 구분
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());
        log.debug(" {}", authProvider);
        log.debug(" {}", oAuth2UserInfo);

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new RuntimeException("Email not found from OAuth2 provider");
        }

        User user = userRepository.findByEmail(oAuth2UserInfo.getEmail()).orElse(null);
        log.debug(" {}", user);
        //이미 가입된 경우
        if (user != null) {
            log.warn("이미 가입된 경우!!");
            if (!user.getAuthProvider().equals(authProvider)) {
                throw new RuntimeException("Email already signed up.");
            }
            user = updateUser(user, oAuth2UserInfo);
        }
        //가입되지 않은 경우
        else {
            user = registerUser(authProvider, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2UserInfo.getAttributes());
    }

    private User registerUser(AuthProvider authProvider, OAuth2UserInfo oAuth2UserInfo) {
        User user = User.builder()
                .email(oAuth2UserInfo.getEmail())
                .name(oAuth2UserInfo.getName())
                .oauth2Id(oAuth2UserInfo.getOAuth2Id())
                .authProvider(authProvider)
                .role(Role.ROLE_USER)
                .build();
        log.debug("registerUser =>");
        log.debug(" {}", user);

        return userRepository.save(user);
    }

    private User updateUser(User user, OAuth2UserInfo oAuth2UserInfo) {
        log.debug("updateUser =>");
        log.debug(" {}", user);
        log.debug(" {}", oAuth2UserInfo);
        return user.update(oAuth2UserInfo);
    }
}
