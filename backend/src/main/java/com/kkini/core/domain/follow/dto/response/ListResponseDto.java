package com.kkini.core.domain.follow.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "리스트 dto", description = "리스트를 응답하는 경우 사용하는 dto")
public class ListResponseDto {

    @Schema(description = "회원 식별자")
    private String id;

    @Schema(description = "닉네임")
    private String name;
}
