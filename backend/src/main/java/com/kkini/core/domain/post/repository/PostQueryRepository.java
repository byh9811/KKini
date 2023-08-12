package com.kkini.core.domain.post.repository;

import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.kkini.core.domain.comment.entity.QComment.comment;
import static com.kkini.core.domain.follow.entity.QFollow.follow;
import static com.kkini.core.domain.post.entity.QPost.post;
import static com.kkini.core.domain.postimage.entity.QPostImage.postImage;
import static com.kkini.core.domain.reaction.entity.QReaction.reaction;
import static com.kkini.core.domain.recipe.entity.QRecipe.recipe;
import static com.kkini.core.domain.scrap.entity.QScrap.scrap;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PostQueryRepository {

    private final int FEED = 1;
    private final int MYPAGE = 2;
    private final int SEARCH = 3;
    private final int ALGORITHM = 4;

    private final JPAQueryFactory jpaQueryFactory;

    public Page<PostListResponseDto> findPostList(Pageable pageable, Long memberId, int type, String search, Long categoryId) {
        List<Long> followList = jpaQueryFactory
                .select(follow.target.id)
                .from(follow)
                .where(follow.me.id.eq(memberId))
                .fetch();

        List<PostListResponseDto> postList = jpaQueryFactory
                .select(Projections.constructor(PostListResponseDto.class,
                        post.id,
                        post.contents,
                        post.createDateTime,
                        post.likeCnt,
                        post.disLikeCnt,
                        post.avgPrice,
                        post.member.id.eq(memberId).as("isMine"),
                        post.member.id,
                        post.member.name,
                        post.member.image,
                        recipe.id,
                        recipe.name,
                        reaction.state,
                        scrap.id.isNotNull()
                ))
                .from(post)
                .leftJoin(recipe).on(post.recipe.id.eq(recipe.id))
                .leftJoin(reaction).on(post.id.eq(reaction.post.id).and(post.member.id.eq(reaction.member.id)))
                .leftJoin(scrap).on(post.id.eq(scrap.post.id).and(post.member.id.eq(scrap.member.id)))
                .where(searchCondition(memberId, followList, type, search, categoryId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(postSort(pageable, type))
                .fetch();

        for(int i=0; i<postList.size(); i++) {
            List<String> imageList = jpaQueryFactory
                    .select(postImage.image)
                    .from(postImage)
                    .where(postImage.post.id.eq(postList.get(i).getId()))
                    .fetch();

            List<Long> imageIndexList = jpaQueryFactory
                    .select(postImage.id)
                    .from(postImage)
                    .where(postImage.post.id.eq(postList.get(i).getId()))
                    .fetch();

            Long commentCnt = jpaQueryFactory
                    .selectFrom(comment)
                    .where(comment.post.id.eq(postList.get(i).getId()))
                    .fetchCount();

            postList.get(i).setImageList(imageList);
            postList.get(i).setImageIndexList(imageIndexList);
            postList.get(i).setCommentCnt(commentCnt.intValue());
        }

        long count = jpaQueryFactory
                .select(post.count())
                .from(post)
                .where(searchCondition(memberId, followList, type, search, categoryId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchFirst();

        return new PageImpl<>(postList, pageable, count);
    }

    private BooleanBuilder searchCondition(Long memberId, List<Long> followList, int type, String search, Long categoryId) {
        BooleanBuilder builder = new BooleanBuilder();

        if(type == FEED) {
            builder.or(post.member.id.eq(memberId));

            if(followList != null && !followList.isEmpty()) {
                builder.or(post.member.id.in(followList));
            }
        }

        if(type == MYPAGE) {
            builder.or(post.member.id.eq(memberId));
        }

        if(type == SEARCH) {
            builder.or(post.contents.contains(search));
        }

        if(type == ALGORITHM) {
            builder.or(post.recipe.category.id.eq(categoryId));
        }

        return builder;
    }

    private OrderSpecifier<?> postSort(Pageable page, int type) {
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()){
                    case "id":
                        return new OrderSpecifier<>(direction, post.id);
                }
            }
        }

        return new OrderSpecifier<>(Order.DESC, post.modifyDateTime);
    }

}
