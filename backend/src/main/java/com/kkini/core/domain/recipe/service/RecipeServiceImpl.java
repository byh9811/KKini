package com.kkini.core.domain.recipe.service;

import com.kkini.core.domain.category.entity.Category;
import com.kkini.core.domain.category.repository.CategoryRepository;
import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.recipe.dto.request.RecipeRegisterRequestDto;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.domain.recipe.repository.RecipeRepository;
import com.kkini.core.global.exception.InvalidException;
import com.kkini.core.global.exception.NotFoundException;
import com.kkini.core.global.util.LevelUpUtil;
import com.kkini.core.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final LevelUpUtil levelUpUtil;
    private final S3Util s3Util;

    @Override
    public void removeRecipe(Long recipeId, Long memberId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new NotFoundException(Recipe.class, recipeId));
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Member.class, memberId));
        if (recipe.getMember()!=writer) {
            throw new InvalidException(Member.class, memberId);
        }

        ArrayList<String> list = new ArrayList<>();
        list.add(recipe.getImage());
        s3Util.deleteFile(list);

        recipe.deleteRecipe();
    }

    @Override
    public void saveRecipe(RecipeRegisterRequestDto dto, MultipartFile multipartFile, Long memberId) {

        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Member.class, memberId));

        log.warn("{}", dto.toString());
        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new NotFoundException(Category.class, dto.getCategoryId()));

        recipeRepository.save(Recipe.builder()
                .member(writer)
                .category(category)
                .name(dto.getName())
                .time(dto.getTime())
                .difficulty(0)      // 사용 안하게 된 필드 0
                .ingredient(dto.getIngredient())
                .steps(dto.getSteps())
                .build());

        // TODO: 벌크 연산으로 INSERT문을 한번에 쿼리하면 ?
        // TODO: 현재 @GeneratedValue(strategy = GenerationType.IDENTITY)이기 때문에 쓰기지연 동작 X
        for (String step : dto.getSteps()) {
            stepRepository.save(Step.builder()
                    .recipe(recipe)
                    .content(step)
                    .build());
        }

        writer.addStars(1);
        levelUpUtil.checkLevelUp(memberId);
        ArrayList<MultipartFile> multipartFiles = new ArrayList<>();
        multipartFiles.add(multipartFile);
        s3Util.uploadFiles("recipe", multipartFiles);

//        // TODO: 벌크 연산으로 INSERT문을 한번에 쿼리하면 ?
//        // TODO: 현재 @GeneratedValue(strategy = GenerationType.IDENTITY)이기 때문에 쓰기지연 동작 X
//        for (String step : dto.getSteps()) {
//            stepRepository.save(Step.builder()
//                    .recipe(recipe)
//                    .content(step)
//                    .build());
//        }
    }
}
