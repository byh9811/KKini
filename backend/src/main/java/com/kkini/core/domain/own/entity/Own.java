package com.kkini.core.domain.own.entity;

import com.kkini.core.domain.badge.entity.Badge;
import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.global.entity.BaseEntityWithCreatedTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Own extends BaseEntityWithCreatedTime {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "badge_id")
    private Badge badge;

}
