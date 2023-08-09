package com.kkini.core.domain.comment.service;

import com.kkini.core.domain.comment.dto.response.CommentListResponseDto;
import com.kkini.core.domain.comment.dto.response.CommentListUpResponseDto;
import com.kkini.core.domain.comment.repository.CommentQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CommentQueryServiceImpl implements CommentQueryService {

    private final CommentQueryRepository commentQueryRepository;

    @Override
    public List<CommentListUpResponseDto> getCommentList(Long postId) {

        List<CommentListUpResponseDto> commentListUp = new ArrayList<>();

        // 댓글 목록 조회
        List<CommentListResponseDto> commentList = commentQueryRepository.findCommentList(postId);

        // 부모 댓글 저장
        for(CommentListResponseDto item : commentList) {
            if(item.getParentsId() == null) {
                commentListUp.add(new CommentListUpResponseDto(item, new ArrayList<>()));
            }
        }

        // 자식 댓글 저장
        for(int i=0; i<commentListUp.size(); i++) {
            Long parentsId = commentListUp.get(i).getParents().getId();
            
            for(int j=0; j<commentList.size(); j++) {
                if(commentList.get(j).getParentsId() != null && commentList.get(j).getParentsId().equals(parentsId)) {
                    commentListUp.get(i).getChildren().add(commentList.get(j));
                }
            }
        }

        return commentListUp;
    }

}
