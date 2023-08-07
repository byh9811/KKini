package com.kkini.core.domain.follow.controller;

import com.kkini.core.domain.follow.dto.request.FollowRequestDto;
import com.kkini.core.domain.follow.dto.response.FollowListResponseDto;
import com.kkini.core.domain.follow.service.FollowQueryService;
import com.kkini.core.domain.follow.service.FollowService;
import com.kkini.core.domain.oauth2.UserPrincipal;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.kkini.core.global.response.Response.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
@Tag(name = "Follow", description = "팔로우 관리 API")
@Slf4j
public class FollowController {

    private final FollowQueryService followQueryService;
    private final FollowService followService;

    @Operation(summary = "팔로우 추가", description = "본인(memberId)이 팔로우(targetMemberId)를 추가합니다.")
    @Parameter(name = "targetMemberId", description = "팔로우를 하고 싶은 ID")
    @PostMapping("/{targetMemberId}")
    public Response<Void> addFollow(@PathVariable Long targetMemberId, @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.debug("## 팔로우를 추가합니다.");
        log.debug("대상 회원 : {}", targetMemberId);
        FollowRequestDto followRequestDto = new FollowRequestDto();
        followRequestDto.setTargetMemberId(targetMemberId);
        followRequestDto.setMemberId(1L); // 추후에 User의 아이디를 가져올 것
//        followRequestDto.setMemberId(userPrincipal.getId()); // 추후에 User의 아이디를 가져올 것
        followService.addFollow(followRequestDto);
        return OK(null);
    }

    @Operation(summary = "팔로우 삭제", description = "본인(memberId)이 팔로우(targetMemberId)를 삭제합니다.")
    @Parameter(name = "id", description = "팔로우 삭제를 하려는 팔로우 식별자")
    @DeleteMapping("/{id}")
    public Response<Void> deleteFollow(@PathVariable Long id){
        log.debug("## 팔로우를 삭제합니다.");
        log.debug("삭제할 팔로우 식별자 : {}", id);
        followService.deleteFollow(id);
        return OK(null);
    }


    @Operation(summary = "팔로우 리스트", description = "회원(memberId)의 팔로우 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로우 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/followList/{memberId}")
    public Response<List<FollowListResponseDto>> followList(@PathVariable Long memberId){
        log.debug("## 팔로우 리스트를 조회합니다.");
        log.debug("조회할 멤버 식별자 : {}", memberId);
        List<FollowListResponseDto> list = followQueryService.getFollowList(memberId);
        log.debug("팔로우 리스트 : {}",list);

        return OK(list);
    }

    @Operation(summary = "팔로워 리스트", description = "회원(memberId)의 팔로워 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로워 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/followerList/{memberId}")
    public Response<List<FollowListResponseDto>> followerList(@PathVariable Long memberId){
        log.debug("## 팔로워 리스트를 조회합니다.");
        log.debug("조회할 멤버 식별자 : {}", memberId);
        List<FollowListResponseDto> list = followQueryService.getFollowerList(memberId);
        log.debug("팔로워 리스트 : {}",list);

        return OK(list);
    }

    @Operation(summary = "팔로우 수 조회", description = "회원의 팔로우 수를 조회합니다.")
    @Parameter(name = "memberId", description = "대상 회원의 멤버 식별자")
    @GetMapping("/countFollow/{memberId}")
    public Response<Integer> countFollow(@PathVariable long memberId){
        log.debug("## 팔로우 수를 조회합니다.");
        log.debug("회원 식별자 : {}", memberId);
//        int count = followQueryService.countFollows(memberId);
        int count = followService.countFollows(memberId);
        log.debug("팔로우 수 : {}",count);

        return OK(count);
    }

    @Operation(summary = "팔로워 수 조회", description = "회원의 팔로워 수를 조회합니다.")
    @Parameter(name = "memberId", description = "대상 회원의 멤버 식별자")
    @GetMapping("/countFollower/{memberId}")
    public Response<Integer> countFollower(@PathVariable long memberId){
        log.debug("## 팔로워 수를 조회합니다.");
        log.debug("회원 식별자 : {}", memberId);
//        int count = followQueryService.countFollowers(memberId);
        int count = followService.countFollowers(memberId);
        log.debug("팔로워 수 : {}", count);

        return OK(count);
    }

}
