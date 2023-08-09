import React, { useEffect, useState } from 'react';
import "./Upload.css";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadRecipes() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("카테고리 선택");
  const [categoryId, setCategoryId] = useState(null);
  const navigate = useNavigate();

  const saveImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreviewUrl(previewURL);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    if (previewUrl) {
      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    }
  }, [previewUrl]);

  const handleFileUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("fileType", "post");
      formData.append("files", selectedImage);

      axios
        .post('http://localhost:8080/api/s3', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('업로드 성공:', response.data);
          navigate('/n4');
        })
        .catch((error) => {
          console.error('업로드 실패:', error);
        });
    } else {
      alert('이미지를 업로드하세요');
    }
  };

  const handleCategorySelect = (key) => {
    switch (key) {
      case '1':
        setSelectedCategory("한식");
        setCategoryId(1);
        break;
      case '2':
        setSelectedCategory("중식");
        setCategoryId(2);
        break;
      case '3':
        setSelectedCategory("일식");
        setCategoryId(3);
        break;
      case '4':
        setSelectedCategory("양식");
        setCategoryId(4);
        break;
      case '5':
        setSelectedCategory("기타");
        setCategoryId(5);
        break;
      default:
        setSelectedCategory("카테고리 선택");
        setCategoryId(null);
    }
  };

  return (
    <div className="uploader-wrapper">
      <div>
        <label>이미지 선택</label>
        <input
          type="file" accept="image/*"
          onChange={saveImage}
          onClick={(e) => e.target.value = null}
          style={{ display: "none" }}
        />

        <button onClick={(e) => e.target.previousSibling.click()}>
          사진 업로드
        </button>
      </div>

      <div className="file-container">
        {
          selectedImage && (
            <div className="file-wrapper">
              <img src={previewUrl} alt="Uploaded file" />
              <div className="delete-button" onClick={deleteImage}>
                <HighlightOffIcon fontSize="large" color="error" />
              </div>
            </div>
          )
        }
      </div>

      <div>
        <labe>범주 구분</labe>
        <br />
        <select value={selectedCategory} onChange={(e) => handleCategorySelect(e.target.value)}>
          <option value="1">한식</option>
          <option value="2">중식</option>
          <option value="3">일식</option>
          <option value="4">양식</option>
          <option value="5">기타</option>
        </select>
      </div>
      <br />

      <div>
        <label>제목</label>
        <br />
        <input type="text" name="" id="" />
      </div>
      <br />

      <div>
        <label>내용 입력</label>
        <br />
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <br />

      <div>
        <button onClick={handleFileUpload}>
          파일 업로드
        </button>
      </div>
    </div>
  );
}

export default UploadRecipes;
