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
import static com.kkini.core.domain.evaluation.entity.QEvaluation.evaluation;
import static com.kkini.core.domain.follow.entity.QFollow.follow;
import static com.kkini.core.domain.member.entity.QMember.member;
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
                        evaluation.price,
                        member.id.eq(memberId).as("isMine"),
                        member.id,
                        member.name,
                        member.image,
                        recipe.id,
                        recipe.name,
                        reaction.state,
                        scrap.id.isNotNull()
                ))
                .from(post)
                .leftJoin(recipe).on(post.recipe.id.eq(recipe.id))
                .leftJoin(member).on(post.member.id.eq(member.id))
                .leftJoin(reaction).on(post.id.eq(reaction.post.id).and(reaction.member.id.eq(memberId)))
                .leftJoin(scrap).on(post.id.eq(scrap.post.id).and(scrap.member.id.eq(memberId)))
                .leftJoin(evaluation).on(post.id.eq(evaluation.post.id).and(evaluation.member.id.eq(memberId)))
                .where(searchCondition(memberId, followList, type, search, categoryId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(postSort(pageable, type))
                .fetch();

        setPostInfo(postList);

        long count = jpaQueryFactory
                .select(post.count())
                .from(post)
                .where(searchCondition(memberId, followList, type, search, categoryId))
                .fetchFirst();

        return new PageImpl<>(postList, pageable, count);
    }

    public PostListResponseDto findPostDetail(Long postId, Long memberId) {

        PostListResponseDto findPost = jpaQueryFactory
                .select(Projections.constructor(PostListResponseDto.class,
                        post.id,
                        post.contents,
                        post.createDateTime,
                        post.likeCnt,
                        post.disLikeCnt,
                        post.avgPrice,
                        evaluation.price,
                        member.id.eq(memberId).as("isMine"),
                        member.id,
                        member.name,
                        member.image,
                        recipe.id,
                        recipe.name,
                        reaction.state,
                        scrap.id.isNotNull()
                ))
                .from(post)
                .leftJoin(recipe).on(post.recipe.id.eq(recipe.id))
                .leftJoin(member).on(post.member.id.eq(member.id))
                .leftJoin(reaction).on(post.id.eq(reaction.post.id).and(reaction.member.id.eq(memberId)))
                .leftJoin(scrap).on(post.id.eq(scrap.post.id).and(scrap.member.id.eq(memberId)))
                .leftJoin(evaluation).on(post.id.eq(evaluation.post.id).and(evaluation.member.id.eq(memberId)))
                .where(post.id.eq(postId))
                .fetchOne();

        List<String> imageList = jpaQueryFactory
                .select(postImage.image)
                .from(postImage)
                .where(postImage.post.id.eq(findPost.getId()))
                .fetch();

        List<Long> imageIndexList = jpaQueryFactory
                .select(postImage.id)
                .from(postImage)
                .where(postImage.post.id.eq(findPost.getId()))
                .fetch();

        Long commentCnt = jpaQueryFactory
                .select(comment.count())
                .from(comment)
                .where(comment.post.id.eq(findPost.getId()))
                .fetchFirst();

        findPost.setImageList(imageList);
        findPost.setImageIndexList(imageIndexList);
        findPost.setCommentCnt(commentCnt.intValue());

        return findPost;
    }

    public List<PostListResponseDto> findPostByAlgorithm(Pageable pageable, Long categoryId, Long memberId) {

        List<PostListResponseDto> postList = jpaQueryFactory
                .select(Projections.constructor(PostListResponseDto.class,
                        post.id,
                        post.contents,
                        post.createDateTime,
                        post.likeCnt,
                        post.disLikeCnt,
                        post.avgPrice,
                        evaluation.price,
                        member.id.eq(memberId).as("isMine"),
                        member.id,
                        member.name,
                        member.image,
                        recipe.id,
                        recipe.name,
                        reaction.state,
                        scrap.id.isNotNull()
                ))
                .from(post)
                .leftJoin(recipe).on(post.recipe.id.eq(recipe.id))
                .leftJoin(member).on(post.member.id.eq(member.id))
                .leftJoin(reaction).on(post.id.eq(reaction.post.id).and(reaction.member.id.eq(memberId)))
                .leftJoin(scrap).on(post.id.eq(scrap.post.id).and(scrap.member.id.eq(memberId)))
                .leftJoin(evaluation).on(post.id.eq(evaluation.post.id).and(evaluation.member.id.eq(memberId)))
                .where(categoryId==0L ? null : post.recipe.category.id.eq(categoryId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        setPostInfo(postList);

        return postList;
    }

    public List<PostListResponseDto> findRemainPost(long size, Long memberId) {

        List<PostListResponseDto> postList = jpaQueryFactory
                .select(Projections.constructor(PostListResponseDto.class,
                        post.id,
                        post.contents,
                        post.createDateTime,
                        post.likeCnt,
                        post.disLikeCnt,
                        post.avgPrice,
                        evaluation.price,
                        member.id.eq(memberId).as("isMine"),
                        member.id,
                        member.name,
                        member.image,
                        recipe.id,
                        recipe.name,
                        reaction.state,
                        scrap.id.isNotNull()
                ))
                .from(post)
                .leftJoin(recipe).on(post.recipe.id.eq(recipe.id))
                .leftJoin(member).on(post.member.id.eq(member.id))
                .leftJoin(evaluation).on(post.id.eq(evaluation.post.id).and(evaluation.member.id.eq(memberId)))
                .leftJoin(reaction).on(post.id.eq(reaction.post.id).and(reaction.member.id.eq(memberId)))
                .leftJoin(scrap).on(post.id.eq(scrap.post.id).and(scrap.member.id.eq(memberId)))
                .orderBy(post.modifyDateTime.asc())
                .limit(size)
                .fetch();

        setPostInfo(postList);

        return postList;
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
            if (categoryId == 0) {
                return null;
            } else {
                builder.or(post.recipe.category.id.eq(categoryId));
            }
        }

        return builder;
    }

    private OrderSpecifier<?> postSort(Pageable page, int type) {
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()){
                    case "id":
                        return new OrderSpecifier<>(Order.DESC, post.id);
                }
            }
        }

        return new OrderSpecifier<>(Order.DESC, post.id);
    }

    private void setPostInfo(List<PostListResponseDto> postList) {
        for (PostListResponseDto postListResponseDto : postList) {
            List<String> imageList = jpaQueryFactory
                    .select(postImage.image)
                    .from(postImage)
                    .where(postImage.post.id.eq(postListResponseDto.getId()))
                    .fetch();

            List<Long> imageIndexList = jpaQueryFactory
                    .select(postImage.id)
                    .from(postImage)
                    .where(postImage.post.id.eq(postListResponseDto.getId()))
                    .fetch();

            Long commentCnt = jpaQueryFactory
                    .select(comment.count())
                    .from(comment)
                    .where(comment.post.id.eq(postListResponseDto.getId()))
                    .fetchFirst();

            postListResponseDto.setImageList(imageList);
            postListResponseDto.setImageIndexList(imageIndexList);
            postListResponseDto.setCommentCnt(commentCnt.intValue());
        }
    }

}
