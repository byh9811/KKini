package com.kkini.core.domain.recipe.service;

import com.kkini.core.domain.category.entity.Category;
import com.kkini.core.domain.category.repository.CategoryRepository;
import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.recipe.dto.request.RecipeRegisterRequestDto;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.domain.recipe.repository.RecipeRepository;
import com.kkini.core.domain.step.entity.Step;
import com.kkini.core.domain.step.repository.StepRepository;
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
    private final StepRepository stepRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void saveRecipe(RecipeRegisterRequestDto dto, Long memberId) {

        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Member.class, memberId));
        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new NotFoundException(Category.class, dto.getCategoryId()));

        Recipe recipe = recipeRepository.save(Recipe.builder()
                .member(writer)
                .category(category)
                .name(dto.getName())
                .time(dto.getTime())
                .difficulty(dto.getDifficulty())
                .ingredient(dto.getIngredient())
                .image(dto.getImage())
                .build());

        // TODO: 벌크 연산으로 INSERT문을 한번에 쿼리하면 ?
        // TODO: 현재 @GeneratedValue(strategy = GenerationType.IDENTITY)이기 때문에 쓰기지연 동작 X
        for (String step : dto.getSteps()) {
            stepRepository.save(Step.builder()
                            .recipe(recipe)
                            .content(step)
                            .build());
        }

    }
}
