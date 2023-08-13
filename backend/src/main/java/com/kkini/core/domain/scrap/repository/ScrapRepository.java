package com.kkini.core.domain.scrap.repository;

import com.kkini.core.domain.scrap.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    int countByMember_Id(Long id);

    int countByMember_IdAndPost_Id(Long memberId, Long postId);
//    int findByMember_IdAndId(Long memberId, Long postId);
}
