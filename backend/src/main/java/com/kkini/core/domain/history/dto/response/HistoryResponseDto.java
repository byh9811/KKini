package com.kkini.core.domain.history.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Schema(description = "내 검색 기록 리스트 조회 필드")
public class HistoryResponseDto {

    @Schema(description = "검색했던 단어의 ID")
    private String wordId;

    @Schema(description = "검색했던 단어")
    private String word;

    @Schema(description = "검색했던 시간")
    private Timestamp searchedTime;
}
