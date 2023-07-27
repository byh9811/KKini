package com.kkini.core.domain.notification.controller;

import com.kkini.core.domain.notification.dto.request.NotificationDeleteRequestDto;
import com.kkini.core.domain.notification.dto.request.NotificationReadRequestDto;
import com.kkini.core.domain.notification.dto.response.NotificationListResponseDto;
import com.kkini.core.global.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Tag(name = "NoticifationController", description = "알림 관리 API 입니다.")
@Slf4j
@RequestMapping("/noti")
public class NotificationController {

    @GetMapping("/{memberId}")
    public Response<?> getNotificationList(@PathVariable Long memberId){

        log.debug("현재 알림을 불러옵니다.");
        log.debug("{}", memberId);
        List<NotificationListResponseDto> list = null;
        log.debug("{}", list);

        return Response.OK("OK");
    }

    @PostMapping("/read")
    public Response<?> readNotification(@RequestBody NotificationReadRequestDto notificationReadRequestDto){

        log.debug("알림 읽음 처리");
        log.debug("{}", notificationReadRequestDto);

        return Response.OK("OK");
    }

    @DeleteMapping
    public Response<?> deleteNotification(@RequestBody NotificationDeleteRequestDto notificationDeleteRequestDto){

        log.debug("알림 삭제 처리");
        log.debug("{}", notificationDeleteRequestDto);

        return Response.OK("OK");
    }
}
