package com.kkini.core.domain.reaction.service;

import com.kkini.core.domain.reaction.dto.request.ReactionRegisterRequestDto;

public interface ReactionService {

    void saveReaction(ReactionRegisterRequestDto reactionRegisterRequestDto, Long memberId);

}
