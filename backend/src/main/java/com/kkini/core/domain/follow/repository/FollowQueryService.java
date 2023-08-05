package com.kkini.core.domain.follow.repository;

import com.kkini.core.domain.follow.dto.response.FollowListResponseDto;

import java.util.List;

public interface FollowQueryService {

    // 팔로워 리스트
    List<FollowListResponseDto> getFollowerList(Long id);
    // 팔로우 리스트
    List<FollowListResponseDto> getFollowList(Long id);
    // 팔로워 수
    int countFollowers(Long id);
    // 팔로우 수
    int countFollows(Long id);
}
