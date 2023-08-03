package com.kkini.core.domain.recipe.service;

import com.kkini.core.domain.recipe.dto.request.RecipeRegisterRequestDto;

public interface RecipeService {

    void saveRecipe(RecipeRegisterRequestDto dto, Long memberId);
}
