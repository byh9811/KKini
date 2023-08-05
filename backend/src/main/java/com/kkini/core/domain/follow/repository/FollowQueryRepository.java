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

    /**
     * 팔로워 리스트 조회
     * @param id (조회를 원하는 회원의 식별자)
     * @return 팔로워 리스트
     */
    public List<FollowListResponseDto> getFollowerList(long id){

        return jpaQueryFactory
                .select(Projections.constructor(FollowListResponseDto.class,
                        follow.id,
                        follow.follower.id,
                        follow.follower.nickname,
                        follow.follower.image
                        ))
                .from(follow)
                .join(member).on(follow.follower.id.eq(member.id))
                .where(
                        follow.followee.id.eq(id)
                )
                .fetch();
        
    }

    /**
     * 팔로우 리스트 조회
     * @param id (조회를 원하는 멤버 식별자)
     * @return 팔로우 리스트
     */
    public List<FollowListResponseDto> getFollowList(long id){

        return jpaQueryFactory
                .select(Projections.constructor(FollowListResponseDto.class,
                        follow.id,
                        follow.followee.id,
                        follow.followee.nickname,
                        follow.followee.image
                ))
                .from(follow)
                .join(member).on(follow.followee.id.eq(member.id))
                .where(
                        follow.follower.id.eq(id)
                )
                .fetch();
    }

    /**
     * 회원의 팔로워 수 조회
     * @param id (조회를 원하는 멤버 식별자)
     * @return 팔로워 수
     */
    public int countFollwers(long id){
        return jpaQueryFactory
                .select(follow.count())
                .from(follow)
                .where(
                        follow.followee.id.eq(id)
                )
                .fetch().size();
    }

    /**
     * 회원의 팔로우 수 조회
     * @param id (조회를 원하는 멤버 식별자)
     * @return 팔로우 수
     */
    public int countFollows(long id){
        return jpaQueryFactory
                .select(follow.count())
                .from(follow)
                .where(
                        follow.follower.id.eq(id)
                )
                .fetch().size();
    }
}
