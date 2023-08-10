import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RestaurantMenuTwoToneIcon from '@mui/icons-material/RestaurantMenuTwoTone';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

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
        <BottomNavigationAction onClick={() => {navigate('/home/n1')}} icon={<HomeIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n2')}} icon={<SearchIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n3')}} icon={<AddTwoToneIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n4')}} icon={<RestaurantMenuTwoToneIcon />} />
        <BottomNavigationAction onClick={() => {navigate('/home/n5')}} icon={<PermIdentityOutlinedIcon />} />
      </BottomNavigation>
  );
}

export default NavigationBar;
