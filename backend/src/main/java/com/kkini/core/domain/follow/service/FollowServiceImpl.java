package com.kkini.core.domain.follow.service;

import com.kkini.core.domain.follow.dto.request.FollowRequestDto;
import com.kkini.core.domain.follow.entity.Follow;
import com.kkini.core.domain.follow.repository.FollowRepository;
import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService{

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    @Override
    public void addFollow(FollowRequestDto followRequestDto) {
        Member follower = memberRepository.findById(followRequestDto.getMemberId()).orElseThrow(() -> new NotFoundException(Member.class, followRequestDto.getMemberId()));
        Member followee = memberRepository.findById(followRequestDto.getTargetMemberId()).orElseThrow(() -> new NotFoundException(Member.class, followRequestDto.getMemberId()));
        Follow follow = followRepository.save(Follow.builder()
                .follower(follower)
                .followee(followee)
                .build());
    }

    @Override
    public void deleteFollow(Long id) {
        Follow follow = followRepository.findById(id).orElseThrow(() -> new NotFoundException(Follow.class));
        Follow deleteFollow = followRepository.deleteById(follow);
    }
}
