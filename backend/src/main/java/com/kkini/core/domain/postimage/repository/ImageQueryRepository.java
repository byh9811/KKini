package com.kkini.core.domain.postimage.repository;

import com.kkini.core.domain.postimage.dto.response.ImageListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.kkini.core.domain.post.entity.QPost.post;
import static com.kkini.core.domain.postimage.entity.QPostImage.postImage;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ImageQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<ImageListResponseDto> findImageList(Pageable pageable, long memberId) {
        List<ImageListResponseDto> imageList = jpaQueryFactory
                .select(Projections.constructor(
                        ImageListResponseDto.class,
                        postImage.id,
                        postImage.image
                ))
                .from(postImage)
                .where()
                .join()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(postSort(pageable))
                .fetch();
    }

}