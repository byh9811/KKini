package com.kkini.core.domain.comment.controller;

import com.kkini.core.domain.comment.dto.request.CommentRegisterRequestDto;
import com.kkini.core.domain.comment.dto.request.CommentUpdateRequestDto;
import com.kkini.core.domain.comment.dto.response.CommentListResponseDto;
import com.kkini.core.domain.recipe.dto.response.RecipeListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.kkini.core.global.response.Response.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Slf4j
@Tag(name = "Comment", description = "Comment API Document")
public class CommentController {

    // 작성
    @Operation(summary = "댓글 작성", description = "댓글을 작성한다.")
    @PostMapping
    public Response<Void> addComment(@RequestBody CommentRegisterRequestDto commentRegisterRequestDto) {
        // 작성에 성공했을 경우 댓글 목록 갱신
        log.debug("addComment() Entered");
        log.debug("{}", commentRegisterRequestDto);
        return OK(null);
    }

    // 목록 조회
    @Operation(summary = "댓글 목록 조회", description = "포스트에 해당하는 댓글을 모두 가져온다.")
    @GetMapping("/{id}")
    public Response<List<CommentListResponseDto>> getCommentList(@PathVariable("id") Long postId) {
        List<CommentListResponseDto> list = new ArrayList<>();
        list.add(new CommentListResponseDto());
        list.add(new CommentListResponseDto());
        log.debug("getCommentList() Entered");
        log.debug("{}", postId);
        return OK(list);
    }

    // 수정
    @Operation(summary = "댓글 수정", description = "댓글을 수정한다.")
    @PutMapping("/{id}")
    public Response<Void> modifyComment(@PathVariable("id") Long id, @RequestBody CommentUpdateRequestDto commentUpdateRequestDto) {
        // 댓글을 작성한 사용자에게만 수정권한 부여, button visible
        // 프론트는 수정 폼에서 내용 수정 후 데이터 전달, 백에게 승인 요청
        // 수정 완료했을 경우 댓글 목록 갱신
        log.debug("modifyComment() Entered");
        log.debug("{}", id);
        log.debug("{}", commentUpdateRequestDto);
        return OK(null);
    }

    // 삭제
    @Operation(summary = "포스트 삭제", description = "포스트를 삭제한다.")
    @DeleteMapping("/{id}")
    public Response<Void> removeComment(@PathVariable("id") Long id) {
        // 댓글을 작성한 사용자에게만 삭제권한 부여, button visible
        log.debug("removeComment() Entered");
        log.debug("{}", id);
        return OK(null);
    }
}
