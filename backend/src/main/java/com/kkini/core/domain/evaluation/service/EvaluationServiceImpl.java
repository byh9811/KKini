package com.kkini.core.domain.evaluation.service;

import com.kkini.core.domain.evaluation.dto.request.EvaluationRegisterRequestDto;
import com.kkini.core.domain.evaluation.entity.Evaluation;
import com.kkini.core.domain.evaluation.repository.EvaluationRepository;
import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.post.entity.Post;
import com.kkini.core.domain.post.repository.PostRepository;
import com.kkini.core.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class EvaluationServiceImpl implements EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    @Override
    public void saveEvaluation(EvaluationRegisterRequestDto dto, Long memberId) {

        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Evaluation.class, memberId));
        Post post = postRepository.findById(dto.getPostId()).orElseThrow(() -> new NotFoundException(Post.class, dto.getPostId()));
        Evaluation evaluation = evaluationRepository.findByMemberIdAndPostId(memberId, dto.getPostId());
        if(evaluation == null) {
            evaluationRepository.save(
                    Evaluation.builder()
                            .member(writer)
                            .post(post)
                            .price(dto.getPrice())
                            .build()
            );
        } else {
            evaluation.setPrice(dto.getPrice());

            evaluationRepository.save(evaluation);
        }

    }

}
