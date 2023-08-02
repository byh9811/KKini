package com.kkini.core.domain.postimage.entity;

import com.kkini.core.domain.post.entity.Post;
import com.kkini.core.global.entity.BaseEntity;
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
public class PostImage extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    private String image;

    // 비즈니스 로직 (추후 생성 예정)
}