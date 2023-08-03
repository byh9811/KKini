package com.kkini.core.domain.recipe.service;

import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.domain.recipe.repository.RecipeRepository;
import com.kkini.core.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    @Override
    public void removeRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new NotFoundException(Recipe.class, recipeId));
        recipe.deleteRecipe();
    }
}
