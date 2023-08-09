package com.kkini.core.domain.comment.service;

import com.kkini.core.domain.comment.dto.response.CommentListResponseDto;
import com.kkini.core.domain.comment.dto.response.CommentListUpResponseDto;

import java.util.List;

public interface CommentQueryService {

    List<CommentListUpResponseDto> getCommentList(Long postId);

}
