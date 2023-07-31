package com.kkini.core.domain.member.entity;

import com.kkini.core.global.entity.BaseEntityWithModifiedTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Member extends BaseEntityWithModifiedTime {

    private String name;

    private String email;

    private String nickname;

    private String sns_type;

    private String refresh_token;

    private int level;

    private int star;

    private String image;

}
