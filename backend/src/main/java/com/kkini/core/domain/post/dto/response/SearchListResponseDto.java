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
@Schema(description = "검색 조회 응답 DTO")
public class SearchListResponseDto {

    @Schema(description = "포스트 ID")
    private int id;

    @Schema(description = "이미지")
    private List<MultipartFile> images;

}
