package com.kkini.core.domain.recipe.service;

import com.kkini.core.domain.recipe.dto.request.SearchConditionRequestDto;
import com.kkini.core.domain.recipe.dto.response.RecipeDetailResponseDto;
import com.kkini.core.domain.recipe.dto.response.RecipeListMypageResponseDto;
import com.kkini.core.domain.recipe.dto.response.RecipeListResponseDto;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.domain.recipe.repository.RecipeQueryRepository;
import com.kkini.core.domain.step.repository.StepQueryRepository;
import com.kkini.core.global.exception.InvalidException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class RecipeQueryServiceImpl implements RecipeQueryService {

    private final RecipeQueryRepository recipeQueryRepository;
    private final StepQueryRepository stepQueryRepository;

    @Override
    public RecipeDetailResponseDto getRecipeDetail(Long recipeId) {
        RecipeDetailResponseDto recipeDetailResponseDto = recipeQueryRepository.findRecipeDetailById(recipeId).orElseThrow(() -> new InvalidException(Recipe.class, recipeId));
        recipeDetailResponseDto.setSteps(stepQueryRepository.findStepListByRecipeId(recipeId));
        return recipeDetailResponseDto;
    }

    @Override
    public Page<RecipeListResponseDto> getRecipeList(SearchConditionRequestDto searchConditionRequestDto, Pageable pageable) {
        return recipeQueryRepository.findRecipeList(searchConditionRequestDto, pageable);
    }

    @Override
    public Page<RecipeListMypageResponseDto> getMyRecipeList(Long memberId, Pageable pageable) {
        return recipeQueryRepository.findMyRecipeList(memberId, pageable);
    }

}
