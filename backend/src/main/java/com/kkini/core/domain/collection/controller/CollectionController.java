package com.kkini.core.domain.collection.controller;

import com.kkini.core.domain.collection.dto.response.CollectionListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.kkini.core.global.response.Response.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/collection")
@Slf4j
@Tag(name = "Collection", description = "Collection API Document")
public class CollectionController {

    @Operation(summary = "내 도감 리스트 조회", description = "내 도감 리스트를 조회하는 API입니다. 피그마가 없어서 일단 도감ID와 이미지만 보내게 구현해놨습니다.")
    @GetMapping
    public Response<List<CollectionListResponseDto>> getMyCollectionList(@RequestParam int difficulty) {
        List<CollectionListResponseDto> list = new ArrayList<>();
        list.add(new CollectionListResponseDto());
        list.add(new CollectionListResponseDto());
        log.debug("getMyCollectionList() Entered");
        log.debug("{}", difficulty);
        return OK(list);
    }

}
