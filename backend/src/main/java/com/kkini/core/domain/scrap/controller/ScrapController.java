package com.kkini.core.domain.scrap.controller;

import com.kkini.core.domain.scrap.dto.request.AddScrapRequestDto;
import com.kkini.core.domain.scrap.dto.request.DeleteScrapRequestDto;
import com.kkini.core.domain.scrap.dto.response.ScrapListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/scrap")
@Tag(name = "ScrapController", description = "스크랩 관리 API입니다.")
public class ScrapController {

    @Operation(summary = "스크랩 추가", description = "해당 포스트(postId)를 스크랩에 추가합니다.")
    @PostMapping
    public Response<?> addScrap(@RequestBody AddScrapRequestDto addScrapRequestDto) {
        log.debug("스크랩 추가");
        log.debug("{}", addScrapRequestDto);

        return Response.OK("OK");
    }

    @Operation(summary = "스크랩 삭제", description = "해당 포스트(postId)를 스크랩에서 삭제합니다.")
    @DeleteMapping
    public Response<?> deleteScrap(@RequestBody DeleteScrapRequestDto deleteScrapRequestDto) {
        log.debug("스크랩 삭제");
        log.debug("{}", deleteScrapRequestDto);

        return Response.OK("OK");
    }

    @Operation(summary = "스크랩 리스트", description = "회원(memberId)의 스크랩 리스트를 응답합니다.")
    @GetMapping("/{memberId}")
    public Response<?> scrapList(@PathVariable String memberId) {
        log.debug("스크랩 리스트");
        log.debug(memberId);
        List<ScrapListResponseDto> list;
        return Response.OK("OK");
    }


}
