package com.kkini.core.domain.reaction.service;

import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.post.entity.Post;
import com.kkini.core.domain.post.repository.PostRepository;
import com.kkini.core.domain.reaction.dto.request.ReactionRegisterRequestDto;
import com.kkini.core.domain.reaction.entity.Reaction;
import com.kkini.core.domain.reaction.repository.ReactionRepository;
import com.kkini.core.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ReactionServiceImpl implements ReactionService {

    private final ReactionRepository reactionRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    @Override
    public void saveReaction(ReactionRegisterRequestDto dto, Long memberId) {
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Reaction.class, memberId));
        Post post = postRepository.findById(dto.getPostId()).orElseThrow(() -> new NotFoundException(Post.class, dto.getPostId()));
        Reaction reaction = reactionRepository.findByMemberIdAndPostId(memberId, dto.getPostId());
        if(reaction == null) {
            reactionRepository.save(
                    Reaction.builder()
                            .member(writer)
                            .post(post)
                            .state(dto.getState())
                            .build()
            );
        } else {
            reaction.setState(dto.getState());

            reactionRepository.save(reaction);
        }
    }

}
