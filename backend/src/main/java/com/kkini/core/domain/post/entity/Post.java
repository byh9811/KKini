package com.kkini.core.domain.post.entity;

import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.global.entity.BaseEntityWithModifiedTime;
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
public class Post extends BaseEntityWithModifiedTime {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    private String contents;

    private int price;

    private int likeCnt;

    private int disLikeCnt;

    // 내용 수정
    public void setContents(String contents) {
        this.contents = contents;
    }

    // 레시피 변경
    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

}