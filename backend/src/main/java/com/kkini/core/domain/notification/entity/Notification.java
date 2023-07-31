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
//    private Member receiver;
//
//    @ManyToOne
//    @JoinColumn(name = "sender_id")
//    private Member sender;
//
//    @ManyToOne
//    @JoinColumn(name = "post_id")
//    private Post post;
//

    private String category;

    private Boolean checked;

}
