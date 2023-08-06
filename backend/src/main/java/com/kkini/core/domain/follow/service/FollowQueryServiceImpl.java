package com.kkini.core.domain.follow.service;

import com.kkini.core.domain.follow.dto.response.FollowListResponseDto;
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

    private final FollowQueryService followQueryService;

    @Override
    public List<FollowListResponseDto> getFollowerList(Long id) {
        return followQueryService.getFollowerList(id);
    }

    @Override
    public List<FollowListResponseDto> getFollowList(Long id) {
        return followQueryService.getFollowList(id);
    }

    @Override
    public int countFollowers(Long id) {
        return followQueryService.countFollowers(id);
    }

    @Override
    public int countFollows(Long id) {
        return followQueryService.countFollows(id);
    }
}
