package com.kkini.core.domain.recipe.controller;

import com.kkini.core.domain.recipe.dto.request.RecipeRegisterRequestDto;
import com.kkini.core.domain.recipe.dto.request.SearchConditionRequestDto;
import com.kkini.core.domain.recipe.dto.response.RecipeDetailResponseDto;
import com.kkini.core.domain.recipe.dto.response.RecipeListResponseDto;
import com.kkini.core.domain.recipe.service.RecipeQueryService;
import com.kkini.core.domain.recipe.service.RecipeService;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.kkini.core.global.response.Response.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipe")
@Slf4j
@Tag(name = "Recipe", description = "레시피 관리 API")
public class RecipeController {

    private final RecipeQueryService recipeQueryService;
    private final RecipeService recipeService;

    @Operation(summary = "레시피 리스트 조회", description = "레시피 리스트를 조회하는 API입니다. page 기본값은 0, size 기본값은 10, sort 기본값은 'modifyDateTime, desc'입니다.")
    @Parameters({
            @Parameter(name = "searchConditionRequestDto", description = "검색 조건 필드"),
            @Parameter(name = "pageable", description = "페이지네이션 정보")
    })
    @GetMapping
    public Response<List<RecipeListResponseDto>> getRecipeList(@ModelAttribute SearchConditionRequestDto searchConditionRequestDto, @PageableDefault(sort="modifyDateTime", direction = Sort.Direction.DESC) Pageable pageable) {
        List<RecipeListResponseDto> list = new ArrayList<>();
        list.add(new RecipeListResponseDto());
        list.add(new RecipeListResponseDto());
        log.debug("getRecipeList() Entered");
        log.debug("{}", searchConditionRequestDto);
        log.debug("{}", pageable.getSort());
        return OK(list);
    }

    @Operation(summary = "레시피 상세 조회", description = "레시피 상세를 조회하는 API입니다.")
    @Parameters({
            @Parameter(name = "id", description = "레시피 ID")
    })
    @GetMapping("/{id}")
    public Response<RecipeDetailResponseDto> getRecipeDetail(@PathVariable("id") Long recipeId) {
        log.debug("getRecipeDetail() Entered");
        log.debug("{}", recipeId);
        return OK(recipeQueryService.getRecipeDetail(recipeId));
    }

    @Operation(summary = "레시피 등록", description = "레시피를 등록하는 API입니다.")
    @Parameters({
            @Parameter(name = "recipeRegisterRequestDto", description = "레시피 등록 필드")
    })
    @PostMapping
    public Response<Void> addRecipe(@RequestBody RecipeRegisterRequestDto recipeRegisterRequestDto) {
        log.debug("addRecipe() Entered");
        log.debug("{}", recipeRegisterRequestDto);
        return OK(null);
    }

    @Operation(summary = "레시피 삭제", description = "레시피를 삭제하는 API입니다.")
    @Parameters({
            @Parameter(name = "id", description = "레시피 ID")
    })
    @DeleteMapping("/{id}")
    public Response<Void> removeRecipe(@PathVariable("id") Long recipeId) {
        recipeService.removeRecipe(recipeId);
        return OK(null);
    }

}
