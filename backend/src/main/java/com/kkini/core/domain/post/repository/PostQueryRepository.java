package com.kkini.core.domain.post.repository;

import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.kkini.core.domain.comment.entity.QComment.comment;
import static com.kkini.core.domain.post.entity.QPost.post;
import static com.kkini.core.domain.postimage.entity.QPostImage.postImage;
import static com.kkini.core.domain.reaction.entity.QReaction.reaction;
import static com.kkini.core.domain.recipe.entity.QRecipe.recipe;
import static com.kkini.core.domain.scrap.entity.QScrap.scrap;
import static java.util.Collections.list;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PostQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private int x = 1;



    public Page<PostListResponseDto> findPostList(Pageable pageable, Long memberId) {


        List<String> test = new ArrayList<>();
        PostListResponseDto dto = new PostListResponseDto();
        dto.set

        List<PostListResponseDto> postList = jpaQueryFactory
                .select(Projections.constructor(PostListResponseDto.class,
                        post.id,
                        post.contents,
                        post.member.id.eq(memberId),
                        recipe.id,
                        ,
                        post.createDateTime,
                        post.likes,
                        post.dislikes,
                        reaction.state,
                        comment.id.count(),
                        post.price,
                        scrap.count().when(0L).then(false).otherwise(true)
                        ))
                .from(post)
                .leftJoin(comment).on(post.id.eq(comment.post.id))
                .groupBy(post.id)
                .leftJoin(reaction).on(post.id.eq(reaction.post.id))
                .leftJoin(scrap).on(post.id.eq(scrap.post.id).and(post.member.id.eq(scrap.member.id)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(postSort(pageable))
                .fetch();

        log.debug("!!!!!!!!!!!!!!!!!!!!");

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
