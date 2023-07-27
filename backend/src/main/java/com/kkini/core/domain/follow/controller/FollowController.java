package com.kkini.core.domain.follow.controller;

import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
@CrossOrigin("*")
@Tag(name = "FollowController", description = "팔로우 관리 API 입니다.")
@Slf4j
public class FollowController {

    @Operation(summary = "팔로우 추가", description = "본인(memberId)이 팔로우(targetMemberId)를 추가합니다.")
    @Parameters({@Parameter(name = "memberId", description = "팔로우를 신청하는 ID"),@Parameter(name = "targetMemberId", description = "팔로우를 하고 싶은 ID")})
    @PostMapping("/{memberId}/{targetMemberId}")
    public Response<?> addFollow(@PathVariable String memberId, @PathVariable String targetMemberId){
        log.info("팔로우 신청");
        log.info(memberId+" 가 "+targetMemberId+" 를 팔로우로 추가");
        return Response.OK("OK");
    }

    @Operation(summary = "팔로우 삭제", description = "본인(memberId)이 팔로우(targetMemberId)를 삭제합니다.")
    @Parameters({@Parameter(name = "memberId", description = "팔로우 삭제를 신청하는 ID"),@Parameter(name = "targetMemberId", description = "팔로우를 삭제하고 싶은 ID")})
    @DeleteMapping("/{memberId}/{targetMemberId}")
    public Response<?> deleteFollow(@PathVariable String memberId, @PathVariable String targetMemberId){
        log.info("팔로우 삭제");
        log.info(memberId+" 가 "+targetMemberId+" 를 팔로우에서 삭제");
        return Response.OK("OK");
    }

}
