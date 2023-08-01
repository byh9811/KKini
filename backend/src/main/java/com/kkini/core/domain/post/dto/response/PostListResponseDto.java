package com.kkini.core.domain.post.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "포스트 조회 응답 DTO")
public class PostListResponseDto {

    @Schema(description = "포스트 ID")
    private int id;

    @Schema(description = "내용")
    private String contents;

    @Schema(description = "포스트의 소유자가 자신인지 여부")
    private boolean isMine;

    @Schema(description = "레시피")
    private int recipeId;

    @Schema(description = "이미지")
    private List<MultipartFile> images;

    @Schema(description = "생성일")
    private String createDateTime;

    @Schema(description = "좋아요 수")
    private int likeCnt;

    @Schema(description = "싫어요 수")
    private int hateCnt;

    @Schema(description = "반응(좋아요-true, 싫어요-false, 반응없음-null)")
    private Boolean reaction;

    @Schema(description = "댓글 수")
    private int commentCnt;

    @Schema(description = "평균 가격")
    private int avgPrice;

    @Schema(description = "스크랩 여부")
    private boolean isScrap;

}
