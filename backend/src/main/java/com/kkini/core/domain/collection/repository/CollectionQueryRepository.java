package com.kkini.core.domain.collection.repository;

import com.kkini.core.domain.collection.dto.response.CollectionListResponseDto;
import com.kkini.core.domain.recipe.dto.request.SearchConditionRequestDto;
import com.kkini.core.domain.recipe.dto.response.RecipeDetailResponseDto;
import com.kkini.core.domain.recipe.dto.response.RecipeListResponseDto;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import static com.kkini.core.domain.category.entity.QCategory.category;
import static com.kkini.core.domain.collection.entity.QCollection.collection;
import static com.kkini.core.domain.member.entity.QMember.member;
import static com.kkini.core.domain.recipe.entity.QRecipe.recipe;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CollectionQueryRepository {

    private final int LIST_SIZE = 10;
    private final JPAQueryFactory jpaQueryFactory;

    public List<CollectionListResponseDto> findRandomCollectionList(Long memberId, Integer difficulty) {

        List<Long> myCollectionList = jpaQueryFactory
                .select(collection.id)
                .from(collection)
                .where(
                        memberEq(memberId),
                        difficultyEq(difficulty)
                )
                .fetch();

        List<Long> RandomList = getRandom(myCollectionList, LIST_SIZE);

        return jpaQueryFactory
                .select(Projections.constructor(CollectionListResponseDto.class,
                        recipe.id,
                        recipe.image
                ))
                .from(collection)
                .join(collection.recipe, recipe)
                .where(collection.id.in(RandomList))
                .fetch();
    }

    private BooleanExpression difficultyEq(Integer difficulty) {
        return difficulty != null ? recipe.difficulty.eq(difficulty) : null;
    }

    private BooleanExpression memberEq(Long memberId) {
        return memberId != null ? collection.member.id.eq(memberId) : null;
    }

    private List<Long> getRandom(List<Long> srcList, int cnt) {

        if (srcList.size() <= cnt) {
            return srcList;
        }

        int min = 0;
        int max = srcList.size();

        List<Long> randomNumbers = new ArrayList<>();

        while (randomNumbers.size() < cnt) {
            long randomNumber = ThreadLocalRandom.current().nextLong(min, max + 1);
            if (!randomNumbers.contains(randomNumber)) {
                randomNumbers.add(randomNumber);
            }
        }

        return randomNumbers;
    }
}
