package com.kkini.core.domain.comment.entity;

import com.kkini.core.domain.post.entity.Post;
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
public class Comment extends BaseEntityWithCreatedTime {

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "parents_id")
    private Comment comment;

    private String contents;

    // 비즈니스 로직 (추후 생성 예정)
}