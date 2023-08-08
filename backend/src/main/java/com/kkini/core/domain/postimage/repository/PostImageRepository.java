package com.kkini.core.domain.postimage.repository;

import com.kkini.core.domain.postimage.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostImageRepository extends JpaRepository<PostImage, Long> {

}