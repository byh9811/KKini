package com.kkini.core.domain.post.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "포스트 수정 요청 DTO")
public class PostUpdateRequestDto {

    @Schema(description = "포스트")
    private Long postId;

    @Schema(description = "내용")
    private String contents;

    @Schema(description = "레시피")
    private Long recipeId;

    @Schema(description = "삭제 이미지 목록")
    private List<Long> imageList;

}
