package com.kkini.core.domain.scrap.controller;

import com.kkini.core.domain.scrap.dto.request.AddScrapRequestDto;
import com.kkini.core.domain.scrap.dto.response.ScrapListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.kkini.core.global.response.Response.OK;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/scrap")
@Tag(name = "Scrap", description = "스크랩 관리 API")
public class ScrapController {

    @Operation(summary = "스크랩 추가", description = "해당 포스트(postId)를 스크랩에 추가합니다.")
    @Parameter(name = "postId", description = "스크랩에 추가하고 싶은 포스트 식별자(postId)")
    @PostMapping("/{postId}")
    public Response<Void> addScrap(@PathVariable Long postId) {
        log.debug("스크랩 추가");
        log.debug("{}", postId);

        return OK(null);
    }

    @Operation(summary = "스크랩 삭제", description = "해당 포스트(postId)를 스크랩에서 삭제합니다.")
    @Parameter(name = "id", description = "삭제하고 싶은 포스트의 스크랩 식별자(id)")
    @DeleteMapping("/{id}")
    public Response<Void> deleteScrap(@PathVariable Long id) {
        log.debug("스크랩 삭제");
        log.debug("{}", id);

        return OK(null);
    }

    @Operation(summary = "스크랩 리스트", description = "회원(memberId)의 스크랩 리스트를 응답합니다.")
    @GetMapping("/list")
    public Response<List<ScrapListResponseDto>> scrapList() {
        log.debug("스크랩 리스트");
        List<ScrapListResponseDto> list = null;
        return OK(list);
    }


}
