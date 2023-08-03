package com.kkini.core.domain.evaluation.controller;

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
@RequestMapping("/api/evaluation")
@Slf4j
@Tag(name = "Evaluation", description = "평가 관리 API")
public class EvaluationController {

    // 평가 입력
    @Operation(summary = "포스트 음식 평가", description = "포스트 음식의 가치를 금액으로 평가한다.")
    @Parameters({
            @Parameter(name = "id", description = "포스트 식별자"),
            @Parameter(name = "price", description = "금액")
    })
    @PostMapping("/{id}")
    public Response<Void> setEvaluation(@PathVariable("id") Long id, @RequestBody int price) {
        log.debug("setEvaluation() Entered");
        log.debug("{}", id);
        log.debug("{}", price);
        return OK(null);
    }

}
