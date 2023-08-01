package com.kkini.core.domain.collection.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "도감 리스트 조회 필드")
public class CollectionListResponseDto {
    @Schema(description = "도감 ID")
    private Long collectionId;

    @Schema(description = "요리 이미지")
    private String image;

}
