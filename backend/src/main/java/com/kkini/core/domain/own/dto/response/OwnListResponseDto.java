package com.kkini.core.domain.own.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "내 뱃지 리스트 조회 필드")
public class OwnListResponseDto {

    @Schema(description = "뱃지 이름")
    private String name;

    @Schema(description = "뱃지 이미지")
    private String image;

}
