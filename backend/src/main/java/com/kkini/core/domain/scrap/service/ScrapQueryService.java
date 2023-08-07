package com.kkini.core.domain.scrap.service;

import com.kkini.core.domain.scrap.dto.response.ScrapListResponseDto;

import java.util.List;

public interface ScrapQueryService {

    // 스크랩 리스트 조회
    List<ScrapListResponseDto> getScrapList(Long memberId);
}
