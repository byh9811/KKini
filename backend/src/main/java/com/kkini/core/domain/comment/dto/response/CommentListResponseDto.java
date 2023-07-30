package com.kkini.core.domain.comment.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "댓글 조회 응답 DTO")
public class CommentListResponseDto {

    @Schema(description = "댓글 ID")
    private Long id;

    @Schema(description = "부모 댓글 ID")
    private Long parentsId;
    
    @Schema(description = "작성일")
    private String createDatetime;

    @Schema(description = "내용")
    private String contents;

}
