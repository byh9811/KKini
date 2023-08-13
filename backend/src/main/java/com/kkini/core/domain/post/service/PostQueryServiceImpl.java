package com.kkini.core.domain.post.service;

import com.kkini.core.domain.category.repository.CategoryQueryRepository;
import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.kkini.core.domain.post.repository.PostQueryRepository;
import com.kkini.core.domain.post.repository.PostRepository;
import com.kkini.core.domain.preference.repository.PreferenceQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PostQueryServiceImpl implements PostQueryService {

    private final int FEED = 1;
    private final int MYPAGE = 2;
    private final int SEARCH = 3;
    private final int ALGORITHM = 4;
    private final int[] feedCntArr = {7, 5, 4, 3, 1, 0};

    private final PostQueryRepository postQueryRepository;
    private final PreferenceQueryRepository preferenceQueryRepository;
    private final PostRepository postRepository;

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
    public Page<PostListResponseDto> getAlgorithmPostList(int page, Long memberId) {
        List<PostListResponseDto> postList = new ArrayList<>();
        List<Long> interestingCategoryIdList = preferenceQueryRepository.getInterestingCategoryIdList(memberId);
        int correction = 0;     // 다음 리스트의 사이즈를 판별하기 위한 보정값

        for (int i=0; i<6; i++) {
            int nextCnt = feedCntArr[i] + correction;
            log.warn("nextCnt: {}", nextCnt);
            if (nextCnt == 0) {
                break;
            }

            Pageable pageable = PageRequest.of(page, nextCnt, Sort.by("id").descending());
            Long categoryId = interestingCategoryIdList.get(i);
            Page<PostListResponseDto> categoryPostList = postQueryRepository.findPostList(pageable, memberId, ALGORITHM, null, categoryId);
            postList.addAll(categoryPostList.getContent());

            log.warn("postList: {}", postList.size());
            if (postList.size() < nextCnt) {        // 원하는 개수의 포스트를 조회하지 못했으면
                correction = nextCnt - postList.size();     // 남은 개수 다음 카테고리로 이월
            } else {        // 포스트 전부 조회했으면
                correction = 0;     // 보정값 초기화
            }
        }
        log.warn("{}", postList.size());
        PageImpl<PostListResponseDto> postListResponseDtos = new PageImpl<>(postList, PageRequest.of(page, 20), postRepository.count());
        return postListResponseDtos;
    }

}
