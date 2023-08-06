package com.kkini.core.domain.collection.entity;

import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.post.entity.Post;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.global.entity.BaseEntityWithCreatedTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Collection extends BaseEntityWithCreatedTime {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    // 비즈니스 로직 (추후 생성 예정)
}
