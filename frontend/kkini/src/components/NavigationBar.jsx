import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

function NavigationBar() {

  const navigate = useNavigate();

  const ref = useRef(null);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <BottomNavigation
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: 500, margin: '0 auto' }}
        ref={ref}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction onClick={() => {navigate('/home/n1')}} label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n2')}} label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n3')}} label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n4')}} label="Archive" icon={<ArchiveIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n5')}} label="Recents" icon={<RestoreIcon />} />
      </BottomNavigation>
  );
}

export default NavigationBar;
