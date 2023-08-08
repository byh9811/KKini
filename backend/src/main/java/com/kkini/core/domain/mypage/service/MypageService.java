package com.kkini.core.domain.mypage.service;

public interface MypageService {

    String getProfileImage(Long memberId);

    void withDrawalMembership(String email);
}
