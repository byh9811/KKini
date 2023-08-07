package com.kkini.core.domain.image.repository;

import com.kkini.core.domain.image.dto.response.ImageListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ImageQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

//    public Page<ImageListResponseDto> findImageList(Pageable pageable) {
//        List<ImageListResponseDto> imageList = jpaQueryFactory
//                .select(Projections.constructor(ImageListResponseDto.class,
//                        image.post.id,
//                        ))
//    }

}
