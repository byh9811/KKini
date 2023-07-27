package com.kkini.core.domain.notification.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "알림 리스트 응답 dto")
public class NotificationListResponseDto {

    @Schema(description = "알림 식별자")
    private Long id;

    @Schema(description = "수신인 식별자")
    private Long receiverId;

    @Schema(description = "송신인 식별자")
    private Long senderId;

    @Schema(description = "포스트 식별자")
    private Long postId;

    @Schema(description = "댓글 식별자")
    private Long commentId;

    @Schema(description = "알림 생성일")
    private String createDateTime;

    @Schema(description = "분류")
    private String category;

    @Schema(description = "확인 여부")
    private String checked;
}
