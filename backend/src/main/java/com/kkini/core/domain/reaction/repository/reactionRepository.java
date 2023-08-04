package com.kkini.core.domain.reaction.repository;

import com.kkini.core.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface reactionRepository extends JpaRepository<Comment, Long> {

}
