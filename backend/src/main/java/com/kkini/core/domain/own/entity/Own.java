package com.kkini.core.domain.own.entity;

import com.kkini.core.domain.badge.entity.Badge;
import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.global.entity.BaseEntityWithCreatedTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Own extends BaseEntityWithCreatedTime {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "badge_id")
    private Badge badge;

    private Boolean selected;

    public void changeSelected() {
        this.selected = !this.selected;
    }
}
