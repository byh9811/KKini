package com.kkini.core.domain.scrap.repository;

import com.kkini.core.domain.postimage.entity.QPostImage;
import com.kkini.core.domain.scrap.dto.response.ScrapListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.kkini.core.domain.postimage.entity.QPostImage.postImage;
import static com.kkini.core.domain.scrap.entity.QScrap.scrap;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ScrapQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 스크랩 리스트 조회
     * @param memberId (조회를 원하는 멤버 식별자)
     * @return 스크랩 리스트
     */
    public List<ScrapListResponseDto> getScrapList(Long memberId){

        return jpaQueryFactory
                .select(Projections.constructor(ScrapListResponseDto.class,
                                scrap.id,
                                scrap.post.id,
                                postImage.image
                ))
                .from(scrap)
                .join(postImage).on(postImage.post.id.eq(scrap.post.id))
                .where(
                        scrap.member.id.eq(memberId)
                )
                .fetch();
    }
}
