package com.kkini.core.domain.follow.entity;

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
public class Follow extends BaseEntityWithCreatedTime {

//    @ManyToOne
//    @JoinColumn(name ="member_id")
//    private Member member;

}
