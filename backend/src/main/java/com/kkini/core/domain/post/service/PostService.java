package com.kkini.core.domain.post.service;

import com.kkini.core.domain.post.dto.request.PostRegisterRequestDto;
import com.kkini.core.domain.post.dto.response.PostListResponseDto;

public interface PostService {

    void savePost(PostRegisterRequestDto dto, Long memberId);

    void removePost(Long postId);

}
