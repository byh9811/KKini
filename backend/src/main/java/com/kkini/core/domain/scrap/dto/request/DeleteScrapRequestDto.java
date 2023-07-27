package com.kkini.core.domain.scrap.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "스크랩 삭제 요청 dto")
public class DeleteScrapRequestDto {

    @Schema(description = "스크랩 식별자")
    public Long id;

    @Schema(description = "멤버 식별자")
    public Long memberId;
}
