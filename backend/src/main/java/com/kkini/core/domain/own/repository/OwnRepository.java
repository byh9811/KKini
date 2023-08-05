package com.kkini.core.domain.own.repository;

import com.kkini.core.domain.own.entity.Own;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnRepository extends JpaRepository<Own, Long> {

}
