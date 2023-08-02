package com.kkini.core.domain.recipe.service;

import com.kkini.core.domain.recipe.dto.response.RecipeDetailResponseDto;

public interface RecipeQueryService {
    RecipeDetailResponseDto getRecipeDetail(Long recipeId);
}
