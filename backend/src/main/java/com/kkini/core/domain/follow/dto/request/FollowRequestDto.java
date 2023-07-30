package com.kkini.core.domain.follow.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "팔로우 관련 dto", description = "팔로우 관련 요청 경우 사용하는 dto")
public class FollowRequestDto {
    
    @Schema(description = "회원 식별자")
    private String memberId;

}
