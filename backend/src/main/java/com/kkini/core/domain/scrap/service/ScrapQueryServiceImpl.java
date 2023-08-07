package com.kkini.core.domain.scrap.service;

import com.kkini.core.domain.scrap.dto.response.ScrapListResponseDto;
import com.kkini.core.domain.scrap.repository.ScrapQueryRepository;
import com.kkini.core.domain.scrap.repository.ScrapRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class ScrapQueryServiceImpl implements ScrapQueryService{

    private final ScrapQueryRepository scrapQueryRepository;

    @Override
    public List<ScrapListResponseDto> getScrapList(Long memberId) {
        return scrapQueryRepository.getScrapList(memberId);
    }
}
