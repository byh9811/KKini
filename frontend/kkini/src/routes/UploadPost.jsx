import React, { useEffect, useState } from 'react';
import './Upload.css'

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';

function UploadPost() {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
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
    if (fileList.length > 0) {
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
        navigate('/n1')
      })
      .catch((error) => {
        console.error('업로드 실패:', error);
      });
    } else {
      alert('이미지를 업로드하세요');
    }
  }

  return (
    <div className="uploader-wrapper">
      <div>
        {
          fileList.length < 5 && (
            <div>
              <label>이미지 선택</label>
              <input
                // id="fileInput"
                type="file" multiple={true} accept="image/*"
                onChange={saveImage}
                onClick={(e) => e.target.value = null}
                ref={refParam => inputRef = refParam}
                style={{ display: "none" }}
              />
              <button onClick={() => inputRef.click()}>
                사진 업로드
              </button>

            </div>
          )
        }
      </div>

      <div className="file-container">
        {
          fileList?.map((item, index) => (
            <div className="file-wrapper" key={index} draggable onDragStart={(e) => e.dataTransfer.setData("index", index)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => moveImage(e.dataTransfer.getData("index"), index)}>
              <img src={item.preview_URL} alt="Uploaded file" />
              <div className="delete-button" onClick={() => { deleteImage(index) }}>
                <HighlightOffIcon fontSize="large" color="error" />
              </div>
            </div>
          ))
        }
      </div>

      <div>
        <label for="combo-box-demo">참고 음식</label>
        <Autocomplete
        styled ={{width: '500px'}}
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </div>
      <br />

      <div>
        <label for="content">내용 입력</label>
        <br />
        <textarea name="" id="content" cols="30" rows="10"></textarea>
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

export default UploadPost;

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];