package com.kkini.core.domain.follow.repository;

import com.kkini.core.domain.follow.entity.Follow;
import com.kkini.core.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    int countByMeId(long id);
    int countByTargetId(long id);

//    Follow findByMeId(Long id);
}
