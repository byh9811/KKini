package com.kkini.core.domain.oauth2.jwt;

import com.kkini.core.domain.oauth2.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        log.info("＃# 필러팅 시작");
        log.debug(" => servletRequest : {}", servletRequest);
        log.debug(" => servletResponse : {}", servletResponse);
        log.debug(" => filterChain : {}", filterChain);



//        Long userId = tokenProvider.getUserIdFromToken(jwt);
//
//        UserDetails userDetails = customUserDetailsService.loadUserById(userId);
//        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);


        //1. Request Header 에서 JWT Token 추출
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) servletRequest);
        log.info("## 토큰 생성 완료 : {}", token);

        //2. validateToken 메서드로 토큰 유효성 검사
        // 유효한 경우에
        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication jwtAuthentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwtAuthentication.getName());
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
