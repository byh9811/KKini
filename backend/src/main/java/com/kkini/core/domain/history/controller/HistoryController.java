package com.kkini.core.domain.history.controller;

import com.kkini.core.domain.history.dto.response.HistoryResponseDto;
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
@RequestMapping("/api/history")
@Slf4j
@Tag(name = "History", description = "History 관리 API")
public class HistoryController {

    @Operation(summary = "내 최근 검색어 리스트 조회", description = "내 최근 검색어 리스트를 조회하는 API입니다. 최근에 검색했던 검색 단어 10개를 보내줍니다.")
    @Parameters({
    })
    @GetMapping
    public Response<List<HistoryResponseDto>> getHistoryList() {
        List<HistoryResponseDto> list = new ArrayList<>();
        list.add(new HistoryResponseDto());
        list.add(new HistoryResponseDto());
        log.debug("getHistoryList() Entered");
        return OK(list);
    }

    @Operation(summary = "최근 검색어 삭제", description = "최근 검색어를 삭제하는 API입니다.")
    @Parameters({
            @Parameter(name = "historyId", description = "검색어 ID")
    })
    @DeleteMapping("/{id}")
    public Response<Void> removeHistory(@PathVariable("id") Long historyId) {
        log.debug("removeHistory() Entered");
        log.debug("{}", historyId);
        return OK(null);
    }

}
