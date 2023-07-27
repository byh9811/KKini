package com.kkini.core.domain.notification.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "알림 읽음 처리 요청 dto")
public class NotificationReadRequestDto {

    @Schema(description = "알림 식별자")
    private Long id;

    @Schema(description = "수신인 식별자")
    private Long receiver_id;

    @Schema(description = "포스트 식별자")
    private Long postId;
    
    @Schema(description = "댓글 식별자")
    private Long commentId;

    @Schema(description = "카테고리")
    private String category;

    @Schema(description = "확인 여부")
    private String checked;
}
