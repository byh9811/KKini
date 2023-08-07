package com.kkini.core.domain.post.controller;

import com.kkini.core.domain.oauth2.UserPrincipal;
import com.kkini.core.domain.post.dto.request.PostRegisterRequestDto;
import com.kkini.core.domain.post.dto.request.PostUpdateRequestDto;
import com.kkini.core.domain.post.dto.response.PostListResponseDto;
import com.kkini.core.domain.post.dto.response.SearchDetailResponseDto;
import com.kkini.core.domain.post.dto.response.SearchListResponseDto;
import com.kkini.core.domain.post.service.PostQueryService;
import com.kkini.core.domain.post.service.PostService;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static com.kkini.core.global.response.Response.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
@Slf4j
@Tag(name = "Post", description = "포스트 관리 API")
public class PostController {

    private final PostService postService;
    private final PostQueryService postQueryService;

    @Operation(summary = "포스트 작성", description = "포스트를 작성한다.")
    @Parameters({
            @Parameter(name = "postRegisterRequestDto", description = "포스트 정보"),
            @Parameter(name = "multipartFiles", description = "이미지")
    })
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public Response<Void> addPost(
            @RequestPart PostRegisterRequestDto postRegisterRequestDto,
            @RequestPart(value = "files") List<MultipartFile> multipartFiles,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal) {

        // 데이터베이스 조작을 위해 서비스로 전달, 서비스에서 성공여부 반환
        log.debug("addPost() Entered");
        log.debug("{}", postRegisterRequestDto);

        postService.savePost(postRegisterRequestDto, multipartFiles, userPrincipal.getId());

        return OK(null);
    }

    @Operation(summary = "포스트 목록 조회", description = "포스트를 조회한다.")
    @Parameter(name = "pageable", description = "페이지 정보")
    @GetMapping
    public Response<Page<PostListResponseDto>> getPostList(
            @PageableDefault(sort="modifyDateTime", direction = Sort.Direction.DESC) Pageable pageable,
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal) {

        return OK(postQueryService.getPostList(pageable));
    }

    @Operation(summary = "포스트 수정", description = "포스트를 수정한다.")
    @Parameters({
            @Parameter(name = "postUpdateRequestDto", description = "포스트 정보"),
            @Parameter(name = "id", description = "포스트 식별자")
    })
    @PutMapping("/{id}")
    public Response<Void> modifyPost(
            @RequestBody PostUpdateRequestDto postUpdateRequestDto,
            @PathVariable("id") Long id) {
        // 포스트를 작성한 사용자에게만 수정권한 부여, button visible
        // 프론트는 수정 폼에서 이미지 삭제/추가, 내용 수정 후 데이터 전달, 백에게 승인 요청
        // 수정 완료했을 경우 포스트 목록 갱신, 자신이 작성한 글은 최근 수정 순으로 보여주어야 한다.
        log.debug("modifyPost() Entered");
        log.debug("{}", postUpdateRequestDto);
        log.debug("{}", id);
        return OK(null);
    }

    @Operation(summary = "포스트 삭제", description = "포스트를 삭제한다.")
    @Parameter(name = "id", description = "포스트 식별자")
    @DeleteMapping("/{id}")
    public Response<Void> removePost(@PathVariable("id") Long id) {
        // 포스트를 작성한 사용자에게만 삭제권한 부여, button visible
        log.debug("removePost() Entered");
        log.debug("{}", id);
        return OK(null);
    }

    @Operation(summary = "검색 조회", description = "검색 또는 추천 포스트를 조회한다.")
    @Parameters({
            @Parameter(name = "pageable", description = "페이지 정보"),
            @Parameter(name = "search", description = "검색어")
    })
    @GetMapping("/search")
    public Response<List<SearchListResponseDto>> getSearchList(
            @PageableDefault(sort="modifyDateTime", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestBody String search) {
        List<SearchListResponseDto> list = new ArrayList<>();
        list.add(new SearchListResponseDto());
        list.add(new SearchListResponseDto());
        log.debug("getSearchList() Entered");
        log.debug("{}", pageable);
        log.debug("{}", search);
        return OK(list);
    }

    @Operation(summary = "검색 상세 조회", description = "검색 또는 추천 포스트의 상세내용을 조회한다.")
    @Parameter(name = "id", description = "포스트 식별자")
    @GetMapping("/search/{id}")
    public Response<SearchDetailResponseDto> getSearchDetail(
            @PathVariable("id") Long id) {
        SearchDetailResponseDto searchDetailResponseDto = new SearchDetailResponseDto();
        log.debug("getSearchDetail() Entered");
        log.debug("{}", id);
        return OK(searchDetailResponseDto);
    }

}
