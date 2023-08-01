package com.kkini.core.domain.reaction.controller;

import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.kkini.core.global.response.Response.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reaction")
@Slf4j
@Tag(name = "Reaction", description = "Reaction 관리 API")
public class ReactionController {

    // 수정
    @Operation(summary = "포스트 반응", description = "포스트에 반응(좋아요/싫어요/없음)을 한다.")
    @Parameters({
            @Parameter(description = "포스트 식별자"),
            @Parameter(description = "상태(좋아요/싫어요/없음)")
    })
    @PutMapping("/{id}")
    public Response<Void> modifyReaction(@PathVariable("id") Long id, @RequestBody Boolean state) {
        // 프론트에서 현재상태와 비교&계산하여 어떤 상태(좋아요/싫어요/없음)로 변환할 것인지 계산하여 전달한다.
        log.debug("modifyReaction() Entered");
        log.debug("{}", id);
        log.debug("{}", state);
        return OK(null);
    }

}
