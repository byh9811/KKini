import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import CommentsPage from './CommentPage';
import axios from 'axios';
// import ImageSlider from './ImageSlider.jsx';  // 여기서 'path_to_imageslider.jsx'는 실제 ImageSlider 컴포넌트가 있는 경로로 대체해야 합니다.

// 모달
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

// 드로워
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// 모달
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Post = forwardRef(({ user, index, postImage, createDateTime, likeCnt: initialLikeCnt, contents, disLikeCnt: initialdisLikeCnt, commentcnt, avgPrice, recipeName, postId }, ref) => {
    const [amount, setAmount] = useState('');
    const [amounts, setAmounts] = useState([]);
    const [averageAmount, setAverageAmount] = useState(null);
    const [reaction, setReaction] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCnt, setLikeCnt] = useState(initialLikeCnt); 
    const [disLikeCnt, setdisLikeCnt] = useState(initialdisLikeCnt);
    const [comments, setComments] = useState([]);

    // 모달
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setAmount('');
    };

    // 드로워
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

    const toggleDrawer = (anchor, open) => (event) => {
        fetchComments();
        axios.get(`/comment/${postId}`)
        .then(res=> setComments(res.data.response))
        .catch(err=> console.log("err:" , err))
        // console.log(comments)
    if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
    ) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };
    
      const fetchComments = async () => {
        if (!postId) return;
        try {
        //   console.log(postId)
          const response = await axios.get(`/comment/${postId}`);
        //   console.log(response);
          // if (response.data.success) {
          //     console.log(response.data)
          //   setComments(response.data.comments); // 예상 응답 구조에 따라 수정 필요
          // }
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      // 드로워end

    const handleIconClick = (type) => {
        let newReaction = null;
    
        // 좋아요 아이콘을 위한 로직
        if (type === 'like') {
            newReaction = reaction === true ? null : true;
        }
        // 싫어요 아이콘을 위한 로직
        else if (type === 'dislike') {
            newReaction = reaction === false ? null : false;
        }
    
        // 서버에 PUT 요청을 보내 상태 변경을 저장
        axios.put(`/reaction/${postId}`, {
            postId: postId,
            reaction: newReaction
        })
        .then((response) => {
            // 성공적으로 응답받았을 때의 처리 로직
            // console.log('반응들감')
            if(newReaction === true) {
                setLikeCnt(prevLikeCnt => prevLikeCnt + (reaction === false ? 0 : 1));
                if(reaction === false) {
                    setdisLikeCnt(prevDislikeCnt => prevDislikeCnt - 1);
                }
            } else if(newReaction === false) {
                setdisLikeCnt(prevDislikeCnt => prevDislikeCnt + (reaction === true ? 0 : 1));
                if(reaction === true) {
                    setLikeCnt(prevLikeCnt => prevLikeCnt - 1);
                }
            } else {
                if(reaction === true) {
                    setLikeCnt(prevLikeCnt => prevLikeCnt - 1);
                } else if(reaction === false) {
                    setdisLikeCnt(prevDislikeCnt => prevDislikeCnt - 1);
                }
            }
    
            setReaction(newReaction);
        })
        .catch((error) => {
            // 에러가 발생했을 때의 처리 로직
            console.error('There was an error sending the PUT request:', error);
        });
    }

    const handleSave = () => {
        const newAmounts = [...amounts, parseFloat(amount)];
        setAmounts(newAmounts);

        const totalAmount = newAmounts.reduce((a, b) => a + b, 0);
        const avgAmount = (totalAmount / newAmounts.length).toFixed(0);
        setAverageAmount(avgAmount);

        handleClose();
    };

    return (
        <PostContainer ref={ref}>
            <PostHeader>
                <PostHeaderAuthor>
                    <Avatar className='m-2'/>
                    <div className="userInfo">
            <div>{user}</div>
            <span>{createDateTime}</span>
          </div>
                </PostHeaderAuthor>
            </PostHeader>
            <Contentstext>{contents}<b> #{recipeName}</b></Contentstext>
            <PostImage>
                <img src={postImage} alt="" />
            </PostImage>

            <PostFooterIcons>
                <div className='post__iconsMain'>
                    <PostIcon>
                    <FavoriteBorderIcon 
                        style={{ color: reaction === true ? 'red' : 'gray' }}
                        onClick={() => handleIconClick('like')}
                    />
                    </PostIcon>
                    <PostIcon>
                    <ThumbDownOffAltRoundedIcon 
                        style={{ color: reaction === false ? 'blue' : 'gray' }}
                        onClick={() => handleIconClick('dislike')}
                    />
                    </PostIcon>
                    <PostIcon>
                        <div>
                            {/* 드로워 */}
                            {['bottom'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)}>
                                    <ChatBubbleOutlineRoundedIcon onClick={() =>{ 
                                        axios.get(`/comment/${postId}`).then(res=> setComments(res.data.response))
                                        .catch(err=> console.log("err:" , err))
                                        }} />
                                </Button>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    <CommentsPage 
                                        postId={postId} 
                                        comments={comments}
                                        onCommentsChange={fetchComments} // 이 부분이 정확한지 확인
                                    />
                                </SwipeableDrawer>
                                </React.Fragment>
                            ))}
                        </div>
                    </PostIcon>
                    <div><CountText><b>{likeCnt}</b>좋아요  <b>{disLikeCnt}</b>싫어요  <b>{commentcnt}</b>개의 댓글</CountText></div>
                </div>
                <div className='post__iconSave'>
                    <PostIcon onClick={handleOpen}>
                        <LocalAtmRoundedIcon />     {/* 이게 금액평가 아이콘 */}
                        <div><CountText>{avgPrice}</CountText></div>
                    </PostIcon>
                    <PostIcon>
                        {isBookmarked ? 
                            <BookmarkIcon onClick={() => setIsBookmarked(false)} /> 
                            : 
                            <BookmarkBorderRoundedIcon onClick={() => setIsBookmarked(true)} />
                        }
                    </PostIcon>
                </div>
            </PostFooterIcons>

            {averageAmount && <div>평가된 금액의 평균: {averageAmount}원</div>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    금액 평가창
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    이 음식이 얼마처럼 보이나요???
                    <img src={postImage} alt="" style={{ maxWidth: '100%', borderRadius: '6px' }} />
                    <div>
                        <input
                            type="number"
                            value={amount}
                            placeholder="금액을 입력하세요"
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ textAlign: 'center', width: '100%', padding: '10px', margin: '10px 0' }}
                        />
                    </div>
                    <Button variant="secondary" onClick={handleClose}>닫기</Button>
                    <Button variant="primary" onClick={handleSave}>금액 평가 완료</Button>
                </Typography>
                </Box>
            </Modal>
        </PostContainer>
    );
});

export default Post;

const PostContainer = styled.div`
  // width: 550px;
  margin: 0px 40px 50px 40px;
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const PostHeaderAuthor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bolder;

  > .userInfo {
    margin-left: 5px;
    
    > div {
      color: black;
      font-size: 13px;
      margin: 0;
    }

    > span {
      color: gray;
      font-size: 10px;
      margin: 0;
    }
  }
`;



const PostImage = styled.div`
  img {
    width: 95%;
    border-radius: 6px;
    border: 0.6px solid rgba(128, 128, 128, 0.516);
    margin: 0 auto;
  }
`;

const PostFooterIcons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const PostIcon = styled.div`
  display: inline-block; 
  padding: 7px;
  font-size: 30px;
  margin: 0px 10px auto;

    &:hover {
        cursor: pointer;
    }
`;


const CountText = styled.span`
    display: flex;
    font-size: 10px; // 원하는 크기로 조절하세요.
    
`;

const Contentstext = styled.span`
    display: flex;
    font-size: 15px; 
    
`;

const Recipetext = styled.span`
    display: flex;
    font-size: 15px; 
    color: #4545b1
`;
