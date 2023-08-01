package com.kkini.core.domain.recipe.entity;

import com.kkini.core.global.entity.BaseEntityWithModifiedTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
public class Recipe extends BaseEntityWithModifiedTime {

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

//    추후 활용 예정
//    @ManyToOne
//    @JoinColumn(name = "category_id")
//    private Category category;

    private String name;

    private String time;

    private int difficulty;

    private String ingredient;

    private String image;

    private Boolean deleted;

    // 비즈니스 로직 (추후 생성 예정)
}