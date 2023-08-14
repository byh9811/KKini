package com.kkini.core.domain.preference.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.kkini.core.domain.preference.entity.QPreference.preference;

@Repository
@RequiredArgsConstructor
public class PreferenceQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Long getMostInterestingCategory(Long memberId) {
        return jpaQueryFactory.select(
                        preference.category.id
                )
                .from(preference)
                .where(preference.member.id.eq(memberId))
                .orderBy(preference.weight.desc())
                .limit(1)
                .fetchOne();
    }
}
