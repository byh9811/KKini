package com.kkini.core.domain.comment.controller;

import com.kkini.core.domain.comment.dto.request.CommentRegisterRequestDto;
import com.kkini.core.domain.comment.dto.request.CommentUpdateRequestDto;
import com.kkini.core.domain.comment.dto.response.CommentListResponseDto;
import com.kkini.core.domain.comment.dto.response.CommentListUpResponseDto;
import com.kkini.core.domain.comment.service.CommentQueryService;
import com.kkini.core.domain.comment.service.CommentService;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.kkini.core.global.response.Response.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
@Slf4j
@Tag(name = "Comment", description = "Comment API Document")
public class CommentController {

    private final CommentService commentService;
    private final CommentQueryService commentQueryService;

    // 작성
    @Operation(summary = "댓글 작성", description = "댓글을 작성한다.")
    @Parameter(name = "commentRegisterRequestDto", description = "댓글 정보")
    @PostMapping
    public Response<Void> addComment(
            @RequestBody CommentRegisterRequestDto commentRegisterRequestDto
            //@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        commentService.saveComment(commentRegisterRequestDto, 1L);

        return OK(null);
    }

    // 조회
    @Operation(summary = "댓글 목록 조회", description = "포스트에 해당하는 댓글을 조회한다.")
    @Parameter(name = "id", description = "포스트 식별자")
    @GetMapping("/{id}")
    public Response<List<CommentListUpResponseDto>> getCommentList(
            @PathVariable("id") Long postId
            //@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        List<CommentListUpResponseDto> commentList = commentQueryService.getCommentList(postId);

        return OK(commentList);
    }

    // 수정
    @Operation(summary = "댓글 수정", description = "댓글을 수정한다.")
    @Parameter(name = "commentUpdateRequestDto", description = "댓글 정보")
    @PutMapping
    public Response<Void> modifyComment(
            @RequestBody CommentUpdateRequestDto commentUpdateRequestDto
            //@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        commentService.modifyComment(commentUpdateRequestDto, 1L);

        return OK(null);
    }

    // 삭제
    @Operation(summary = "포스트 삭제", description = "포스트를 삭제한다.")
    @Parameter(name = "id", description = "댓글 식별자")
    @DeleteMapping("/{id}")
    public Response<Void> removeComment(
            @PathVariable("id") Long id
    ) {
        log.debug("removeComment() Entered");
        log.debug("{}", id);
        return OK(null);
    }

}