package com.kkini.core.domain.scrap.controller;

import com.kkini.core.domain.oauth2.UserPrincipal;
import com.kkini.core.domain.scrap.dto.request.AddScrapRequestDto;
import com.kkini.core.domain.scrap.dto.response.ScrapListResponseDto;
import com.kkini.core.domain.scrap.service.ScrapQueryService;
import com.kkini.core.domain.scrap.service.ScrapService;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static com.kkini.core.global.response.Response.OK;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/scrap")
@Tag(name = "Scrap", description = "스크랩 관리 API")
public class ScrapController {

    private final ScrapQueryService scrapQueryService;
    private final ScrapService scrapService;

    @Operation(summary = "스크랩 추가", description = "해당 포스트(postId)를 스크랩에 추가합니다.")
    @Parameter(name = "postId", description = "스크랩에 추가하고 싶은 포스트 식별자(postId)")
    @PostMapping("/{postId}")
    public Response<Void> addScrap(@PathVariable Long postId, @AuthenticationPrincipal UserPrincipal userPrincipal
    , Principal principal) {
        log.debug("{}", userPrincipal);
        log.debug("{}", principal.toString());
        log.debug("## 스크랩을 추가합니다.");
        log.debug("추가할 포스트 식별자 : {}", postId);
        AddScrapRequestDto addScrapRequestDto = new AddScrapRequestDto();
//        addScrapRequestDto.setMemberId(1L); // 해당 부분은 추후에 user.getMemberId()로 교체할 예정
        log.debug("현재 접근 멤버 : {}",userPrincipal.getUsername()); // 시큐리티의 User를 사용할 때는 이부분을 사용하고
//        log.debug("{}", userPrincipal.getUerId);
        // 아닐때는 아래의 getId를 주석해제하고 사용해야합니다.
//        log.debug("현재 접근 멤버 : {}", userPrincipal.getId()); // 이 부분이 제가 선언한 UserPrincipal을 사용하는 부분인데
        // 여기서 nullpoint가 발생합니다.

//        addScrapRequestDto.setMemberId(userPrincipal.getUsername()); // 해당 부분은 추후에 user.getMemberId()로 교체할 예정
        addScrapRequestDto.setPostId(postId);
        addScrapRequestDto.setEmail(userPrincipal.getUsername());
        scrapService.addScrap(addScrapRequestDto);

        return OK(null);
    }

    @Operation(summary = "스크랩 삭제", description = "해당 포스트(postId)를 스크랩에서 삭제합니다.")
    @Parameter(name = "id", description = "삭제하고 싶은 포스트의 스크랩 식별자(id)")
    @DeleteMapping("/{id}")
    public Response<Void> deleteScrap(@PathVariable Long id) {
        log.debug("## 스크랩을 삭제합니다.");
        log.debug("## 삭제할 스크랩 식별자 : {}", id);
        scrapService.deleteScrap(id);

        return OK(null);
    }

    @Operation(summary = "스크랩 리스트", description = "회원(memberId)의 스크랩 리스트를 응답합니다.")
    @Parameter(name = "memberId", description = "조회를 원하는 회원 식별자")
    @GetMapping("/list}")
    public Response<Page<ScrapListResponseDto>> scrapList(@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal, @PageableDefault(size = 20) Pageable pageable) {
        log.debug("## 스크랩 리스트를 조회합니다.");
        log.debug("조회할 멤버 식별자 : {}",userPrincipal.getId());
        Page<ScrapListResponseDto> list = scrapQueryService.getScrapList(userPrincipal.getId(), pageable);

        return OK(list);
    }

    @Operation(summary = "스크랩 개수 조회", description = "스크랩 개수를 조회합니다.")
    @GetMapping("/count")
    public Response<Integer> countScrapList(@Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.debug("## 스크랩 개수를 조회합니다.");
        log.debug("조회할 멤버 식별자 : {}", userPrincipal.getId());
        int count = scrapService.countScrapList(userPrincipal.getId());
//        int count = scrapService.countScrapList(1L);
        return OK(count);
    }


}
