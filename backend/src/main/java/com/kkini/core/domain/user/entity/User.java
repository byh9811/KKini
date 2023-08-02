package com.kkini.core.domain.user.entity;

import com.kkini.core.domain.user.enums.AuthProvider;
import com.kkini.core.domain.user.enums.Role;
import com.kkini.core.domain.user.oauth2.OAuth2UserInfo;
import com.kkini.core.global.entity.BaseEntityWithModifiedTime;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User extends BaseEntityWithModifiedTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String oauth2Id;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User update(OAuth2UserInfo oAuth2UserInfo) {
        this.name = oAuth2UserInfo.getName();
        this.oauth2Id = oAuth2UserInfo.getOAuth2Id();

        return this;
    }
}
