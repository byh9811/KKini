package com.kkini.core.domain.image.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "리스트 조회 응답 DTO")
public class ImageListResponseDto {

    @Schema(description = "포스트 ID")
    private int id;

    @Schema(description = "이미지")
    private List<String> images;

}
