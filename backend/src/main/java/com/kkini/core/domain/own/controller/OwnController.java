package com.kkini.core.domain.own.controller;

import com.kkini.core.domain.own.dto.response.OwnListResponseDto;
import com.kkini.core.domain.recipe.dto.request.RecipeRegisterRequestDto;
import com.kkini.core.domain.recipe.dto.request.SearchConditionRequestDto;
import com.kkini.core.domain.recipe.dto.response.RecipeDetailResponseDto;
import com.kkini.core.domain.recipe.dto.response.RecipeListResponseDto;
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
@RequestMapping("/api/own")
@Slf4j
@Tag(name = "Own", description = "Own 관리 API")
public class OwnController {

    @Operation(summary = "내 뱃지 리스트 조회", description = "내가 소유한 뱃지 리스트를 조회하는 API입니다.")
    @Parameters({
    })
    @GetMapping
    public Response<List<OwnListResponseDto>> getMyBadgeList() {
        List<OwnListResponseDto> list = new ArrayList<>();
        list.add(new OwnListResponseDto());
        list.add(new OwnListResponseDto());
        log.debug("getRecipeList() Entered");
        return OK(list);
    }

}
