package com.kkini.core.domain.post.service;

import com.kkini.core.domain.member.entity.Member;
import com.kkini.core.domain.member.repository.MemberRepository;
import com.kkini.core.domain.post.dto.request.PostRegisterRequestDto;
import com.kkini.core.domain.post.dto.request.PostUpdateRequestDto;
import com.kkini.core.domain.post.entity.Post;
import com.kkini.core.domain.post.repository.PostRepository;
import com.kkini.core.domain.postimage.entity.PostImage;
import com.kkini.core.domain.postimage.repository.PostImageRepository;
import com.kkini.core.domain.recipe.entity.Recipe;
import com.kkini.core.domain.recipe.repository.RecipeRepository;
import com.kkini.core.global.exception.NotFoundException;
import com.kkini.core.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostImageRepository postImageRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final RecipeRepository recipeRepository;
    private final S3Util s3Util;

    // 포스트 작성
    @Override
    public void savePost(PostRegisterRequestDto dto, List<MultipartFile> img, Long memberId) {
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(Member.class, memberId));
        Recipe recipe = null;
        if (dto.getRecipeId() != null) {
            recipe = recipeRepository.findById(dto.getRecipeId()).orElseThrow(() -> new NotFoundException(Recipe.class, dto.getRecipeId()));
        }

        Post post = postRepository.save(Post.builder()
                .member(writer)
                .recipe(recipe)
                .contents(dto.getContents())
                .build()
        );

        // S3에 이미지 저장
        List<String> images = s3Util.uploadFiles("post", img);

        // 이미지 테이블 저장
        for(String image : images) {
            postImageRepository.save(PostImage.builder()
                    .post(post)
                    .image(image)
                    .build());
        }
    }
    
    // 포스트 삭제
    @Override
    public void removePost(Long postId, Long memberId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new NotFoundException(Post.class, postId));

        // 자신이 작성한 글만 삭제할 수 있다.
        if(post.getMember().getId().equals(memberId)) {
            postRepository.delete(post);
        }
    }

    // 포스트 수정
//    @Override
//    public void modifyPost(PostUpdateRequestDto postUpdateRequestDto) {
//        Post post = postRepository.findById(postUpdateRequestDto.getPostId()).orElseThrow(() -> new NotFoundException(Post.class, postUpdateRequestDto.getPostId()));
//        post.setContents(postUpdateRequestDto.getContents());
//
//        for(Long id : postUpdateRequestDto.getImageList()) {
//            postImageRepository.deleteById(id);
//        }
//
//        postRepository.save(post);
//    }

}
