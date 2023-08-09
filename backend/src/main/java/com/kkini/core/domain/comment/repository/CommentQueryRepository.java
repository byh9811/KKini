package com.kkini.core.domain.comment.repository;

import com.kkini.core.domain.comment.dto.response.CommentCountResponseDto;
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

import static com.kkini.core.domain.comment.entity.QComment.comment;
import static com.kkini.core.domain.post.entity.QPost.post;
import static com.kkini.core.domain.recipe.entity.QRecipe.recipe;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CommentQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

//    public List<>

}
