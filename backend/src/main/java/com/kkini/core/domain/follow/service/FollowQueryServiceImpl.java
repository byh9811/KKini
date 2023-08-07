package com.kkini.core.domain.follow.service;

import com.kkini.core.domain.follow.dto.response.FollowListResponseDto;
import com.kkini.core.domain.follow.repository.FollowQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor

public class FollowQueryServiceImpl implements FollowQueryService{

    private final FollowQueryRepository followQueryRepository;

    @Override
    public List<FollowListResponseDto> getFollowerList(Long id) {
        return followQueryRepository.getFollowerList(id);
    }

    @Override
    public List<FollowListResponseDto> getFollowList(Long id) {
        return followQueryRepository.getFollowList(id);
    }

    @Override
    public int countFollowers(Long id) {
        return followQueryRepository.countFollowers(id);
    }

    @Override
    public int countFollows(Long id) {
        return followQueryRepository.countFollows(id);
    }
}
