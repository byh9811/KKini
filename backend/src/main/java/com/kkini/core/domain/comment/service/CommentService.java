package com.kkini.core.domain.comment.service;

import com.kkini.core.domain.comment.dto.request.CommentRegisterRequestDto;

public interface CommentService {

    void saveComment(CommentRegisterRequestDto commentRegisterRequestDto, Long memberId);

}
