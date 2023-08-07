package com.kkini.core.domain.post.service;

import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostQueryService {
    Page<PostListResponseDto> getPostList(Pageable pageable);
}
