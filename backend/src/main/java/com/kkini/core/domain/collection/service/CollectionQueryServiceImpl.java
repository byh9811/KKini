package com.kkini.core.domain.collection.service;

import com.kkini.core.domain.collection.dto.response.CollectionListResponseDto;
import com.kkini.core.domain.collection.repository.CollectionQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CollectionQueryServiceImpl implements CollectionQueryService {

    private final CollectionQueryRepository collectionQueryRepository;

    @Override
    public List<CollectionListResponseDto> getMyCollectionList(Long memberId, Integer difficulty) {
        return collectionQueryRepository.findRandomCollectionList(memberId, difficulty);
    }
}
