package com.kkini.core.domain.notification.entity;

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
public class Notification extends BaseEntityWithCreatedTime {

//    @ManyToOne
//    @JoinColumn(name = "receiver_id")
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "sender_id")
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "post_id")
//    private Post post;
//
//    @ManyToOne
//    @JoinColumn(name = "comment_id")
//    private Comment comment;

    private String category;

    private Boolean checked;

}
