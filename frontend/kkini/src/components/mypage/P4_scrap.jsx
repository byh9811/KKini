import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from '../home/Post';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

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

function P4Scrap() {
  window.scrollTo(0, 0);
  const [scrapList, setScrapList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios.get("/scrap/list/mypage")
    .then((res) => {
      setScrapList(res.data.response.content);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap">
      {scrapList.length > 0 ? (
        <div className="flex flex-wrap">
          {scrapList.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={`Image ${item.id}`} onClick={() => setSelectedId(item.id)} />
            <Modal
              open={selectedId === item.id}
              onClose={() => setSelectedId(null)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={selectedId === item.id}>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <Post
                      key={item.id}
                      index={item.id}
                      user={item.user}
                      contents={item.contents}
                      postImage={item.imageList[0]}
                      likeCnt={item.likeCnt}
                      disLikeCnt={item.disLikeCnt}
                      createDateTime={item.createDateTime}
                      hatecnt={item.hatecnt}
                      commentcnt={item.commentcnt}
                      avgPrice={item.avgPrice}
                      reaction={item.reaction}
                      recipeName={item.recipeName}
                      // toggleLike={() => toggleLike(item.id)} // 이 함수도 기존에 정의되어 있어야 합니다.
                      postId={item.id}
                    />
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>
          
        ))}
        </div>
      ) : (
        <p>등록된 스크랩이 없습니다</p>
      )}
        {scrapList.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={`Image ${item.id}`} onClick={() => setSelectedId(item.id)} />
            <Modal
              open={selectedId === item.id}
              onClose={() => setSelectedId(null)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={selectedId === item.id}>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <Post
                      key={item.id}
                      index={item.id}
                      user={item.user}
                      contents={item.contents}
                      postImage={item.imageList[0]}
                      likeCnt={item.likeCnt}
                      disLikeCnt={item.disLikeCnt}
                      createDateTime={item.createDateTime}
                      hatecnt={item.hatecnt}
                      commentcnt={item.commentcnt}
                      avgPrice={item.avgPrice}
                      reaction={item.reaction}
                      recipeName={item.recipeName}
                      // toggleLike={() => toggleLike(item.id)} // 이 함수도 기존에 정의되어 있어야 합니다.
                      postId={item.id}
                    />
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default P4Scrap;