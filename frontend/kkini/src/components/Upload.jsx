import React, { useEffect, useState } from 'react';
import "./Upload.css";
import { Button } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';

function Upload() {
  const [fileList, setFileList] = useState([]);
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const tmpFileList = [];
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length && fileList.length < 5; i++) {
        const preview_URL = URL.createObjectURL(files[i]);
        tmpFileList.push({
          fileObject: files[i],
          preview_URL: preview_URL,
        });
      }
    }
    setFileList([...tmpFileList, ...fileList]);
  };

  const deleteImage = (index) => {
    const tmpFileList = [...fileList];
    tmpFileList.splice(index, 1);
    setFileList(tmpFileList);
  }

  const moveImage = (fromIndex, toIndex) => {
    const tmpFileList = [...fileList];
    const [removedItem] = tmpFileList.splice(fromIndex, 1);
    tmpFileList.splice(toIndex, 0, removedItem);
    setFileList(tmpFileList);
  }

  useEffect(() => {
    return () => {
      fileList?.forEach((item) => {
        URL.revokeObjectURL(item.preview_URL);
      })
    }
  }, []);

  const handleFileUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("fileType", "post");
      formData.append("files", fileList[i].fileObject);
    }

    axios.post('http://localhost:8080/api/s3', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('업로드 성공:', response.data);
    })
    .catch((error) => {
      console.error('업로드 실패:', error);
    });
  };

  return (
    <div className="uploader-wrapper">
      {fileList.length < 5 && (
        <input
          type="file" multiple={true} accept="image/*"
          onChange={saveImage}
          onClick={(e) => e.target.value = null}
          ref={refParam => inputRef = refParam}
          style={{ display: "none" }}
        />
      )}

      <div className="file-container">
        {fileList?.map((item, index) => (
          <div className="file-wrapper" key={index} draggable onDragStart={(e) => e.dataTransfer.setData("index", index)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => moveImage(e.dataTransfer.getData("index"), index)}>
            <img src={item.preview_URL} alt="Uploaded file" />
            <div className="delete-button" onClick={() => { deleteImage(index) }}>
              <HighlightOffIcon fontSize="large" color="error" />
            </div>
          </div>
        ))}
      </div>

      {fileList.length < 5 && (
        <div className="upload-button">
          <Button variant="contained" onClick={() => inputRef.click()}>
            Upload
          </Button>
        </div>
      )}

      {/* Additional Button */}
      <div className="additional-button">
        <Button variant="contained" color="primary" onClick={handleFileUpload}>
          Additional Button
        </Button>
      </div>
    </div>
  );
}

export default Upload;
