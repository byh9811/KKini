package com.kkini.core.domain.post.service;

import com.kkini.core.domain.post.dto.request.PostRegisterRequestDto;
import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {

    void savePost(PostRegisterRequestDto dto, List<MultipartFile> img, Long memberId);

    void removePost(Long postId);

}
