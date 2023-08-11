package com.kkini.core.domain.post.service;

import com.kkini.core.domain.category.repository.CategoryQueryRepository;
import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.kkini.core.domain.post.repository.PostQueryRepository;
import com.kkini.core.domain.preference.repository.PreferenceQueryRepository;
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

    private final int FEED = 1;
    private final int MYPAGE = 2;
    private final int SEARCH = 3;
    private final int ALGORITHM = 4;

    private final PostQueryRepository postQueryRepository;
    private final PreferenceQueryRepository preferenceQueryRepository;

    // 피드 조회
    @Override
    public Page<PostListResponseDto> getPostList(Pageable pageable, Long memberId) {
        Page<PostListResponseDto> postList = postQueryRepository.findPostList(pageable, memberId, FEED, null, null);

        return postList;
    }

    // 마이 페이지 조회
    @Override
    public Page<PostListResponseDto> getMyPagePostList(Pageable pageable, Long memberId) {
        Page<PostListResponseDto> myPagePostList = postQueryRepository.findPostList(pageable, memberId, MYPAGE, null, null);

        return myPagePostList;
    }

    // 검색 조회
    @Override
    public Page<PostListResponseDto> getSearchPostList(Pageable pageable, Long memberId, String search) {
        Page<PostListResponseDto> myPagePostList = postQueryRepository.findPostList(pageable, memberId, SEARCH, search, null);

        return myPagePostList;
    }
    
    // 알고리즘 조회
    @Override
    public Page<PostListResponseDto> getAlgorithmPostList(Pageable pageable, Long memberId) {
        Long categoryId = preferenceQueryRepository.getMostInterestingCategory(memberId);

        Page<PostListResponseDto> myPagePostList = postQueryRepository.findPostList(pageable, memberId, ALGORITHM, null, categoryId);

        return myPagePostList;
    }

}
