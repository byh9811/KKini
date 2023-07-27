package com.kkini.core.domain.follow.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(name = "팔로우 리스트 dto", description = "팔로우 리스트를 응답하는 경우 사용하는 dto")
public class FollowListResponseDto {


    @Schema(name = "팔로우 리스트")
    private List<?> followList;
//    private String memberId;
//
//    private String memberName;

}
