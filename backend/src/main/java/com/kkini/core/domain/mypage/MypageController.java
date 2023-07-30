package com.kkini.core.domain.mypage;

import com.kkini.core.domain.follow.dto.response.ListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{memberId}")
@CrossOrigin("*")
@Tag(name="MypageController", description = "마이페이지 API 입니다.")
@Slf4j
public class MypageController {

    @Operation(summary = "팔로우 리스트", description = "회원(memberId)의 팔로우 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로우 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/follow")
    public Response<?> followList(@PathVariable String memberId){
        log.debug("팔로우 리스트를 확인합니다.");
        log.debug("{}", memberId);
        List<ListResponseDto> list = null;
        return Response.OK("OK");
    }

    @Operation(summary = "팔로워 리스트", description = "회원(memberId)의 팔로워 리스트를 확인할 수 있습니다.")
    @Parameter(name = "memberId", description = "팔로워 리스트를 보고 싶은 회원(memberId)")
    @GetMapping("/follower")
    public Response<?> followerList(@PathVariable String memberId){
        log.debug("팔로워 리스트를 확인합니다.");
        log.debug("{}", memberId);
        List<ListResponseDto> list = null;
        return Response.OK("OK");
    }

    
}
