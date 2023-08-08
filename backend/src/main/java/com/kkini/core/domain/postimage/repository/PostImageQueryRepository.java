package com.kkini.core.domain.postimage.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.kkini.core.domain.postimage.entity.QPostImage.postImage;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PostImageQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<String> findImageList(Long postId) {
        List<String> imageList = jpaQueryFactory
                .select(postImage.image)
                .from(postImage)
                .where(postImage.post.id.eq(postId))
                .fetch();

        return imageList;
    }

}