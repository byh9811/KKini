package com.kkini.core.domain.member.dto.request;


import lombok.Data;

@Data
public  class MemberJoinRequestDto {

    private String name;
    private String email;
    private String nickname;
    // 네이버에서 어떻게 프로필사진을 주는지 확인
    // 링크일 경우에는 링크를 받아서 변경 => 어떻게 할지 고민
//    private String image;
}
