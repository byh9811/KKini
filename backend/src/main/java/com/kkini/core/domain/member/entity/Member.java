package com.kkini.core.domain.member.entity;

import com.kkini.core.global.entity.BaseEntityWithModifiedTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Member extends BaseEntityWithModifiedTime {

    private String name;

    private String email;

    private String nickname;

    private String snsType;

    private String refreshToken;

    private int level;

    private int star;

    private String image;

}
