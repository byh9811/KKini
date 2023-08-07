package com.kkini.core.domain.post.repository;

import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.kkini.core.domain.post.entity.QPost.post;
import static com.kkini.core.domain.recipe.entity.QRecipe.recipe;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PostQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<PostListResponseDto> findPostList(Pageable pageable) {
        List<PostListResponseDto> postList = jpaQueryFactory
                .select(Projections.constructor(PostListResponseDto.class,
                        post.id,
                        post.contents,
                        null,   // 작성자가 자신인지 여부
                        recipe.id,
                        null,   // 이미지 리스트
                        post.createDateTime,
                        post.likes,
                        post.dislikes,
                        null,   // 자신의 포스트 반응
                        null,   // 댓글 수
                        post.price,
                        null   // 스크랩 여부
                ))
                .from(post)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(postSort(pageable))
                .fetch();

        long count = jpaQueryFactory
                .select(post.count())
                .from(post)
                .fetch().size();

        return new PageImpl<>(postList, pageable, count);
    }

    private OrderSpecifier<?> postSort(Pageable page) {
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()){
                    case "id":
                        return new OrderSpecifier<>(direction, post.id);
                    case "name":
                        return new OrderSpecifier<>(direction, recipe.name);
                }
            }
        }

        return new OrderSpecifier<>(Order.DESC, recipe.modifyDateTime);
    }

}
