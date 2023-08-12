package com.kkini.core.domain.mypage.controller;

import com.kkini.core.domain.follow.dto.response.FollowListResponseDto;
import com.kkini.core.domain.follow.service.FollowQueryService;
import com.kkini.core.domain.follow.service.FollowService;
import com.kkini.core.domain.mypage.dto.response.MypageInfoResponseListDto;
import com.kkini.core.domain.mypage.service.MypageQueryService;
import com.kkini.core.domain.mypage.service.MypageService;
import com.kkini.core.domain.oauth2.UserPrincipal;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static com.kkini.core.global.response.Response.OK;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/mypage")
@Tag(name = "Mypage", description = "마이페이지 API")
public class MypageController {

    private final MypageQueryService mypageQueryService;
    private final MypageService mypageService;
    private final FollowService followService;
    private final FollowQueryService followQueryService;

    @Operation(summary = "마이페이지 정보", description = "멤버 식별자의 마이페이지 정보를 출력합니다.")
    @Parameter(name = "memberId", description = "정보를 조회할 멤버 식별자")
    @GetMapping("/info/{memberId}")
    public Response<MypageInfoResponseListDto> getOtherpageInfo(@PathVariable String memberId, @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.debug("## 마이페이지 정보를 보여줍니다.");
        log.debug("조회할 멤버 식별자 : {}",memberId);

        MypageInfoResponseListDto mypageInfoResponseListDto = null;

        if (memberId.equals("mypage")){
            mypageInfoResponseListDto = mypageQueryService.getMypageInfo(userPrincipal.getId());
        } else{
            mypageInfoResponseListDto = mypageQueryService.getMypageInfo(Long.parseLong(memberId));
        }

        return OK(mypageInfoResponseListDto);
    }


    @Operation(summary = "프로필 이미지", description = "해당 유저의 프로필 이미지를 불러옵니다.")
    @GetMapping("/profileImage/{memberId}")
    public Response<String> getOtherProfileImage(@PathVariable Long memberId, @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.debug("## 프로필 이미지를 불러옵니다.");
        log.debug("멤버 식별자 : {}", memberId);

        String image = "";

        if (memberId == -1){
            image = mypageQueryService.getProfileImage(userPrincipal.getId());
        } else {
            image = mypageQueryService.getProfileImage(memberId);
        }

        log.debug("불러온 프로필 이미지 : {}", image);

        return OK(image);
    }

    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴를 진행합니다.")
    @DeleteMapping("/withdrawal")
    public Response<Void> withDrawalMembership(@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.debug("## 회원 탈퇴를 진행합니다.");
        log.debug("탈퇴를 진행할 회원 : {}", userPrincipal.getId());
        mypageService.withDrawalMembership(userPrincipal.getId());
        return OK(null);
    }


    @Operation(summary = "팔로우 수 조회", description = "회원의 팔로우 수를 조회합니다.")
    @Parameter(name = "memberId", description = "대상 회원의 멤버 식별자")
    @GetMapping("/countFollow")
    public Response<Integer> countFollow( @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.debug("## 팔로우 수를 조회합니다.");

        int count = followService.countFollows(userPrincipal.getId());

        log.debug("팔로우 수 : {}",count);

        return OK(count);
    }

    @Operation(summary = "팔로워 수 조회", description = "회원의 팔로워 수를 조회합니다.")
    @Parameter(name = "memberId", description = "대상 회원의 멤버 식별자")
    @GetMapping("/countFollower")
    public Response<Integer> countFollower(@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.debug("## 팔로워 수를 조회합니다.");

        int count = followService.countFollowers(userPrincipal.getId());

        log.debug("팔로워 수 : {}", count);

        return OK(count);
    }

    @Operation(summary = "팔로우 리스트", description = "회원(memberId)의 팔로우 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로우 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/followList")
    public Response<Page<FollowListResponseDto>> followList
            (@Parameter(hidden = true)@AuthenticationPrincipal UserPrincipal userPrincipal,
             @PageableDefault(size = 50) Pageable pageable){
        log.debug("## 팔로우 리스트를 조회합니다.");
        log.debug("조회할 멤버 식별자 : {}", userPrincipal.getId());
        Page<FollowListResponseDto> followList = followQueryService.getFollowList(userPrincipal.getId(), pageable);
        log.debug("팔로우 리스트 : {}",followList);

        return OK(followList);
    }

    @Operation(summary = "팔로워 리스트", description = "회원(memberId)의 팔로워 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로워 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/followerList")
    public Response<Page<FollowListResponseDto>> followerList(@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PageableDefault(size = 50) Pageable pageable){
        log.debug("## 팔로워 리스트를 조회합니다.");
        log.debug("조회할 멤버 식별자 : {}", userPrincipal.getId());
        Page<FollowListResponseDto> followerList = followQueryService.getFollowerList(userPrincipal.getId(), pageable);
        log.debug("팔로워 리스트 : {}", followerList);

        return OK(followerList);
    }


}
