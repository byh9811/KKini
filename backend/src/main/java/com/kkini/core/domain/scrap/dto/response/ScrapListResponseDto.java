package com.kkini.core.domain.scrap.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "스크랩 리스트 응답 dto")
public class ScrapListResponseDto {

    @Schema(description = "포스트 식별자")
    private Long postId;

    @Schema(description = "이미지")
    private String image;
}
