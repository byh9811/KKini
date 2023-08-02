package com.kkini.core.domain.recipe.repository;

import com.kkini.core.domain.recipe.dto.response.RecipeDetailResponseDto;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

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
                .join(step).on(recipe.id.eq(step.recipe.id))
                .fetchOne());
    }
}
