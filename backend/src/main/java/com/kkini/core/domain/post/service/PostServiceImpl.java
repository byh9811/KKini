package com.kkini.core.domain.post.service;

import com.kkini.core.domain.image.entity.Image;
import com.kkini.core.domain.image.repository.ImageRepository;
import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.post.dto.request.PostRegisterRequestDto;
import com.kkini.core.domain.post.entity.Post;
import com.kkini.core.domain.post.repository.PostRepository;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.domain.recipe.repository.RecipeRepository;
import com.kkini.core.global.exception.NotFoundException;
import com.kkini.core.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final RecipeRepository recipeRepository;
    private final ImageRepository imageRepository;
    private final S3Util s3Util;

    // 포스트 작성
    @Override
    public void savePost(PostRegisterRequestDto dto, Long memberId) {
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Member.class, memberId));
        Recipe recipe = recipeRepository.findById(dto.getRecipeId()).orElseThrow(() -> new NotFoundException(Recipe.class, dto.getRecipeId()));

        Post post = postRepository.save(Post.builder()
                .member(writer)
                .recipe(recipe)
                .contents(dto.getContents())
                .build()
        );

        // S3에 이미지 저장
        List<String> images = s3Util.uploadFiles("post", dto.getImages());

        // 이미지 테이블 저장
        for(String image : images) {
            imageRepository.save(Image.builder()
                    .post(post)
                    .image(image)
                    .build());
        }
    }
    
    // 포스트 삭제
    public void removePost(Long postId) {

    }

    // 포스트 수정

}
