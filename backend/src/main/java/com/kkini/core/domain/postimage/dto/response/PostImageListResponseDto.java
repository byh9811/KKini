package com.kkini.core.domain.postimage.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "리스트 조회 응답 DTO")
public class PostImageListResponseDto {

    @Schema(description = "포스트 ID")
    private Long id;

    @Schema(description = "이미지")
    private String image;

}