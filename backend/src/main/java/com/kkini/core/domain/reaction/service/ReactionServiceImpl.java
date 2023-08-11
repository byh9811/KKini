package com.kkini.core.domain.reaction.service;

import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.post.entity.Post;
import com.kkini.core.domain.post.repository.PostRepository;
import com.kkini.core.domain.preference.entity.Preference;
import com.kkini.core.domain.preference.repository.PreferenceRepository;
import com.kkini.core.domain.reaction.dto.request.ReactionRegisterRequestDto;
import com.kkini.core.domain.reaction.entity.Reaction;
import com.kkini.core.domain.reaction.repository.ReactionRepository;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.domain.recipe.repository.RecipeRepository;
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

    private final Boolean LIKE = true;
    private final Boolean DISLIKE = false;

    private final ReactionRepository reactionRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PreferenceRepository preferenceRepository;
    private final RecipeRepository recipeRepository;

    @Override
    public void saveReaction(ReactionRegisterRequestDto dto, Long memberId) {
        boolean haveCategory = false;
        Preference preference = null;

        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Reaction.class, memberId));
        Post post = postRepository.findById(dto.getPostId()).orElseThrow(() -> new NotFoundException(Post.class, dto.getPostId()));
        Reaction oldReaction = reactionRepository.findByMemberIdAndPostId(memberId, dto.getPostId());
        Recipe recipe = null;

        if(post.getRecipe() != null) {
            recipe = recipeRepository.findById(post.getRecipe().getId()).orElseThrow(() -> new NotFoundException(Recipe.class, post.getRecipe().getId()));
        }

        // 레시피가 존재하는 포스트만 가중치 적용
        if(recipe != null) { haveCategory = true; }

        if(recipe != null && haveCategory) {
            // 사용자의 카테고리에 대한 가중치 불러오기 - 해당 포스트가 가지는 카테고리
            preference = preferenceRepository.findByCategoryIdAndMemberId(recipe.getCategory().getId(), memberId);
        }

        // 신규
        if(oldReaction == null) {
            Reaction newReaction = Reaction.builder()
                    .member(writer)
                    .post(post)
                    .state(dto.getState())
                    .build();

            reactionRepository.save(newReaction);

            // NONE -> LIKE, NONE -> DISLIKE
            if(newReaction.getState() == LIKE) {
                post.increaseLikeCnt();
            }

            if(newReaction.getState() == DISLIKE) {
                post.increaseDisLikeCnt();
            }

            // 가중치 갱신
            if(haveCategory) {
                if(newReaction.getState() == LIKE) {
                    preference.increaseWeightByLike();
                }

                if(newReaction.getState() == DISLIKE) {
                    preference.decreaseWeightByLike();
                }

                preferenceRepository.save(preference);
            }
        }

        // 수정
        else {
            Boolean oldState = oldReaction.getState();
            oldReaction.setState(dto.getState());

            reactionRepository.save(oldReaction);

            // 결과 NONE : LIKE -> LIKE, DISLIKE -> DISLIKE
            if(oldState == dto.getState()) {
                if(oldState == LIKE) {
                    post.decreaseLikeCnt();
                }

                if(oldState == DISLIKE) {
                    post.decreaseDisLikeCnt();
                }
            }

            // LIKE -> DISLIKE, DISLIKE -> LIKE
            else {
                if(oldState == LIKE) {
                    post.decreaseLikeCnt();
                    post.increaseDisLikeCnt();
                }

                if(oldState == DISLIKE) {
                    post.decreaseDisLikeCnt();
                    post.increaseLikeCnt();
                }
            }

            // 가중치 갱신
            if(haveCategory) {
                // 결과 NONE : LIKE -> LIKE, DISLIKE -> DISLIKE
                if(oldState == dto.getState()) {
                    if (oldState == LIKE) {
                        preference.decreaseWeightByLike();
                    }

                    if (oldState == DISLIKE) {
                        preference.increaseWeightByLike();
                    }
                }

                // LIKE -> DISLIKE, DISLIKE -> LIKE
                else{
                    if (dto.getState() == LIKE) {
                        preference.increaseWeightByLike();
                        preference.increaseWeightByLike();
                    }

                    if (dto.getState() == DISLIKE) {
                        preference.decreaseWeightByLike();
                        preference.decreaseWeightByLike();
                    }
                }

                preferenceRepository.save(preference);
            }
        }
    }

}
