package com.kkini.core.global.handler;

import com.kkini.core.global.exception.ServiceRuntimeException;
import com.kkini.core.global.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.kkini.core.global.response.Response.ERROR;

@RestControllerAdvice
@Slf4j
public class ExceptionHandler {
    private ResponseEntity<Response<?>> newResponse(Throwable throwable, HttpStatus status) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<>(ERROR(throwable, status), headers, status);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(ServiceRuntimeException.class)
    public ResponseEntity<?> handleServiceRuntimeException(ServiceRuntimeException e) {
        // 추후 상세 분류
        log.info("Unexpected service exception occurred: {}", e.getMessage(), e);
        return newResponse(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
