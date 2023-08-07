package com.kkini.core.domain.post.repository;

import com.kkini.core.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

=======

public interface PostRepository extends JpaRepository<Post, Long> {
>>>>>>> 1c361c6 (fix: 스크랩 삭제 부분 변경 및 컨트롤러의 유저명 불러오기로 변경)
}
