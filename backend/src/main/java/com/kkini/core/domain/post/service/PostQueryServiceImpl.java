package com.kkini.core.domain.post.service;

import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.kkini.core.domain.post.repository.PostQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PostQueryServiceImpl implements PostQueryService {

    private final PostQueryRepository postQueryRepository;

    // 피드 조회
    @Override
    public Page<PostListResponseDto> getPostList(Pageable pageable, Long memberId) {
        Page<PostListResponseDto> postList = postQueryRepository.findPostList(pageable, memberId, true, null);

        return postList;
    }

    // 마이 페이지 조회
    @Override
    public Page<PostListResponseDto> getMyPagePostList(Pageable pageable, Long memberId) {
        Page<PostListResponseDto> myPagePostList = postQueryRepository.findPostList(pageable, memberId, false, null);

        return myPagePostList;
    }

}
