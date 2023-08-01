package com.kkini.core.domain.follow.controller;

import com.kkini.core.domain.follow.dto.request.FollowRequestDto;
import com.kkini.core.domain.follow.dto.response.ListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.kkini.core.global.response.Response.OK;

@RestController
@RequestMapping("/follow")
@CrossOrigin("*")
@Tag(name = "FollowController", description = "팔로우 관리 API 입니다.")
@Slf4j
public class FollowController {

    @Operation(summary = "팔로우 추가", description = "본인(memberId)이 팔로우(targetMemberId)를 추가합니다.")
    @Parameters({
            @Parameter(name = "memberId", description = "팔로우를 신청하는 ID"),
            @Parameter(name = "targetMemberId", description = "팔로우를 하고 싶은 ID")})
    @PostMapping("/{memberId}")
    public Response<Void> addFollow(@PathVariable Long memberId){
        log.debug("팔로우 신청합니다.");
        log.debug("{}", memberId);
        FollowRequestDto followRequestDto = new FollowRequestDto();
        followRequestDto.setTargetMemberId(memberId);
        return OK(null);
    }

    @Operation(summary = "팔로우 삭제", description = "본인(memberId)이 팔로우(targetMemberId)를 삭제합니다.")
    @Parameter(name = "id", description = "팔로우 삭제를 하려는 팔로우 식별자")
    @DeleteMapping("/{id}")
    public Response<Void> deleteFollow(@PathVariable Long id){
        log.debug("팔로우 삭제합니다.");
        log.debug("{}", id);
        return OK(null);
    }


    @Operation(summary = "팔로우 리스트", description = "회원(memberId)의 팔로우 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로우 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/follow/{memberId}")
    public Response<List<ListResponseDto>> followList(@PathVariable Long memberId){
        log.debug("팔로우 리스트를 확인합니다.");
        log.debug("{}", memberId);

        ListResponseDto listResponseDto = new ListResponseDto();
        List<ListResponseDto> list = null;
        list.add(listResponseDto);
        return OK(list);
    }

    @Operation(summary = "팔로워 리스트", description = "회원(memberId)의 팔로워 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로워 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/follower/{memberId}")
    public Response<List<ListResponseDto>> followerList(@PathVariable Long memberId){
        log.debug("팔로워 리스트를 확인합니다.");
        log.debug("{}", memberId);

        ListResponseDto listResponseDto = new ListResponseDto();
        List<ListResponseDto> list = null;
        list.add(listResponseDto);
        return OK(list);
    }

}
