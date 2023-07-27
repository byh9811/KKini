package com.kkini.core.domain.member.controller;


import com.kkini.core.domain.member.dto.request.MemberJoinRequestDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@CrossOrigin("*")
@Tag(name = "MemberController", description = "회원 관리 API 입니다.")
@Slf4j
public class MemberController {

    @GetMapping("/oauth/{code}")
    @Operation(summary = "SNS 로그인 시도", description = "SNS 로그인 여부를 확인하여 login or join")
    public Response<String> userJoin(@PathVariable String code) {
        log.info("로그인 테스트");
        log.info("네이버 로그인 코드 : " + code);

        return Response.OK(code);
    }

}
