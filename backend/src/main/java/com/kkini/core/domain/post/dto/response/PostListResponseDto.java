package com.kkini.core.domain.post.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@Schema(description = "포스트 조회 응답 DTO")
public class PostListResponseDto {

    @Schema(description = "포스트 ID")
    private Long id;

    @Schema(description = "내용")
    private String contents;

    @Schema(description = "포스트의 소유자가 자신인지 여부")
    private Boolean isMine;

    @Schema(description = "레시피")
    private Long recipeId;

    @Schema(description = "이미지")
    private List<String> images;

//    @Schema(description = "생성일")
//    private String createDateTime;

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
    private Boolean isScrap;

    public PostListResponseDto(Long id, String contents, Boolean isMine, Long recipeId, int likeCnt, int hateCnt, Boolean reaction, int avgPrice, Boolean isScrap) {
        this.id = id;
        this.contents = contents;
        this.isMine = isMine;
        this.recipeId = recipeId;
        this.likeCnt = likeCnt;
        this.hateCnt = hateCnt;
        this.reaction = reaction;
        this.avgPrice = avgPrice;
        this.isScrap = isScrap;
    }

}
