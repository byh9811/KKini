package com.kkini.core.domain.follow.repository;

import com.kkini.core.domain.follow.dto.response.FollowListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.kkini.core.domain.follow.entity.QFollow.follow;
import static com.kkini.core.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
@Slf4j
public class FollowQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<FollowListResponseDto> getFollowerList(long id){

        return jpaQueryFactory
                .select(Projections.constructor(FollowListResponseDto.class,
                        follow.id,
                        follow.followee,
                        follow.follower.id,
                        member.image
                        ))
                .from(follow)
                .join(member).on(follow.followee.id.eq(member.id))
                .where(
                        follow.follower.id.eq(id)
                )
                .fetch();
    }
}
