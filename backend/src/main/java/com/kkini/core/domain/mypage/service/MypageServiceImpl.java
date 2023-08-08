package com.kkini.core.domain.mypage.service;

import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.mypage.repository.MypageRepository;
import com.kkini.core.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MypageServiceImpl implements MypageService {

    private final MemberRepository memberRepository;
    private final MypageRepository mypageRepository;
    @Override
    public String getProfileImage(Long memberId) {
        memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Member.class, memberId));
        return mypageRepository.findImageById(memberId);
    }

    @Override
    public void withDrawalMembership(String email) {
        log.debug(email);
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(Member.class, email));
        log.debug("{}", member);
        log.debug("{}", member.getEmail());
//        if (member != null) log.debug("회원 탈퇴를 정상적으로 진행합니다. {}", member);
        memberRepository.delete(member);
    }
}
