package com.kkini.core.domain.post.entity;

import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.global.entity.BaseEntityWithModifiedTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Post extends BaseEntityWithModifiedTime {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    private String contents;

    private int avgPrice;

    private int avgPriceCnt;

    private int likeCnt;

    private int disLikeCnt;

    public void increaseLikeCnt() { this.likeCnt++; };

    public void decreaseLikeCnt() { this.likeCnt--; };

    public void increaseDisLikeCnt() { this.disLikeCnt++; };

    public void decreaseDisLikeCnt() { this.disLikeCnt--; };

    public void changePrice(int oldPrice, int newPrice, boolean isNew) {
        if (isNew) {
            this.avgPrice = (this.avgPrice * this.avgPriceCnt + newPrice) / (this.avgPriceCnt + 1);

            this.avgPriceCnt++;
        } else {
            this.avgPrice = (this.avgPrice * this.avgPriceCnt - oldPrice + newPrice) / this.avgPriceCnt;
        }
    }

}