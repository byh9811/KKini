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

    @Override
    public Page<PostListResponseDto> getPostList(Pageable pageable, Long memberId) {
        // 포스트 가져오기
        Page<PostListResponseDto> postList = postQueryRepository.findPostList(pageable, memberId);

        // 이미지 리스트 가져오기


        // 스크랩 여부 가져오기

        // 댓글 수 가져오기(조인)

        // 조립
//        for() {
//            // 자신의 포스트인지 체크
//            // 자신의 포스트 반응
//        }

        return postList;
    }
}
