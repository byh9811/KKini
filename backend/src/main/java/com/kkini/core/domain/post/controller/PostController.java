package com.kkini.core.domain.post.controller;

import com.kkini.core.domain.post.dto.request.PostRegisterRequestDto;
import com.kkini.core.domain.post.dto.request.PostUpdateRequestDto;
import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;

import static com.kkini.core.global.response.Response.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
@Slf4j
@Tag(name = "Post", description = "Post API Document")
public class PostController {

    // 작성
    @Operation(summary = "포스트 작성", description = "포스트를 작성한다.")
    @PostMapping
    public Response<Void> write(PostRegisterRequestDto postRequestDto) {
        // 데이터베이스 조작을 위해 서비스로 전달, 서비스에서 성공여부 반환
        // 성공했을 경우 목록 갱신(목록 조회), 프론트로 목록 반환
        // 작성 완료했을 경우 포스트 목록 갱신, 목록은 최신 순으로 보여주기 때문에 자신이 작성한 포스트를 확인할 수 있다.
        return OK(null);
    }

    // 목록 조회
    @Operation(summary = "포스트 목록 조회", description = "포스트를 N개 가져온다.")
    @GetMapping
    public Response<List<PostListResponseDto>> list(Pageable pageable) {
        // PageableDefault 설정 추가
        // 사용자 ID는 별도로 전달되므로 해당 함수에서는 처리하지 않는다.
        return OK(null);
    }

    // 수정
    @Operation(summary = "포스트 수정", description = "포스트를 수정한다.")
    @PutMapping("/{id}")
    public Response<PostUpdateRequestDto> modify(@PathVariable("id") Long postId) {
        // 포스트를 작성한 사용자에게만 수정권한 부여, button visible
        // 프론트는 수정 폼에서 이미지 삭제/추가, 내용 수정 후 데이터 전달, 백에게 승인 요청
        // 수정 완료했을 경우 포스트 목록 갱신, 자신이 작성한 글은 최근 수정 순으로 보여주어야 한다.
        return OK(null);
    }

    // 삭제
    @Operation(summary = "포스트 삭제", description = "포스트를 삭제한다.")
    @DeleteMapping("/{id}")
    public Response<Void> delete(@PathVariable("id") Long postId) {
        // 포스트를 작성한 사용자에게만 삭제권한 부여, button visible
        return OK(null);
    }
}
