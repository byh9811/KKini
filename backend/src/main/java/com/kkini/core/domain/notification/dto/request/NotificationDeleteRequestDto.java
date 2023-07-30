package com.kkini.core.domain.notification.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "알림 삭제 요청 처리 dto")
public class NotificationDeleteRequestDto {

    @Schema(description = "알림 식별자")
    private Long id;

}
