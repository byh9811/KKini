package com.kkini.core.domain.recipe.repository;

import com.kkini.core.domain.recipe.dto.request.SearchConditionRequestDto;
import com.kkini.core.domain.recipe.dto.response.RecipeDetailResponseDto;
import com.kkini.core.domain.recipe.dto.response.RecipeListResponseDto;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.util.StringUtils;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.kkini.core.domain.category.entity.QCategory.category;
import static com.kkini.core.domain.member.entity.QMember.member;
import static com.kkini.core.domain.recipe.entity.QRecipe.recipe;
import static com.kkini.core.domain.step.entity.QStep.step;

@Repository
@RequiredArgsConstructor
@Slf4j
public class RecipeQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<RecipeListResponseDto> findRecipeList(SearchConditionRequestDto searchCondition, Pageable pageable) {
        List<RecipeListResponseDto> recipeList = jpaQueryFactory
                .select(Projections.constructor(RecipeListResponseDto.class,
                        recipe.id,
                        member.id,
                        member.image,
                        member.nickname,
                        recipe.image,
                        recipe.name,
                        recipe.difficulty
                ))
                .from(recipe)
                .join(member).on(recipe.member.id.eq(member.id))
                .where(
                        difficultyEq(searchCondition.getDifficulty()),
                        nameLike(searchCondition.getName()),
                        notDeleted()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(recipeSort(pageable))
                .fetch();

        long count = jpaQueryFactory
                .select(recipe.count())
                .from(recipe)
                .where(
                        difficultyEq(searchCondition.getDifficulty()),
                        nameLike(searchCondition.getName()),
                        notDeleted()
                )
                .fetchFirst();

        return new PageImpl<>(recipeList, pageable, count);
    }

    private BooleanExpression difficultyEq(Integer difficulty) {
        return difficulty != null ? recipe.difficulty.eq(difficulty) : null;
    }

    private BooleanExpression nameLike(String name) {
        return StringUtils.isNullOrEmpty(name) ? null : recipe.name.contains(name);
    }

    private BooleanExpression notDeleted() {
        return recipe.deleted.eq(false);
    }

    private OrderSpecifier<?> recipeSort(Pageable page) {
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()){
                    case "id":
                        return new OrderSpecifier<>(direction, recipe.id);
                    case "name":
                        return new OrderSpecifier<>(direction, recipe.name);
                }
            }
        }

        return new OrderSpecifier<>(Order.DESC, recipe.modifyDateTime);
    }

    public Optional<RecipeDetailResponseDto> findRecipeDetailById(Long recipeId) {
        return Optional.ofNullable(jpaQueryFactory
                .select(Projections.constructor(RecipeDetailResponseDto.class,
                        recipe.id,
                        category.id,
                        category.name,
                        member.id,
                        member.image,
                        member.nickname,
                        recipe.name,
                        recipe.time,
                        recipe.difficulty,
                        recipe.ingredient,
                        recipe.image
                        ))
                .from(recipe)
                .join(member).on(recipe.member.id.eq(member.id))
                .join(category).on(recipe.category.id.eq(category.id))
                .where(recipe.id.eq(recipeId)
                        .and(recipe.deleted.eq(false)))
                .fetchOne());
    }

}
