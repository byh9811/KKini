package com.kkini.core.domain.scrap.repository;

import com.kkini.core.domain.scrap.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    Scrap deleteById(Scrap scrap);

}
