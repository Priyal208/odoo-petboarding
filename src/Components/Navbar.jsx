
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FaUser, FaUserPlus} from 'react-icons/fa';
import { PiHandCoinsBold } from "react-icons/pi";
import { MdCampaign, MdHome, MdContentPasteSearch } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { ImStatsBars } from "react-icons/im";
import { RiFeedbackFill } from "react-icons/ri";
import { FaClipboard } from "react-icons/fa";




const Navbar = () => {
  const csrftoken = localStorage.getItem('csrftoken');
  const userType = localStorage.getItem('userType');
  const [value, setValue] = useState(0);
  const location = useLocation();
  //eslint-disable-next-line
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setValue(location.pathname);
    setIsScrollable(window.innerHeight < document.body.offsetHeight);
  }, [location.pathname]);

  return (
    <div className='fixed bottom-0 left-0 w-full z-50'>
    <nav className='nav'>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          
          width: '100%',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          backgroundColor: '#b8ddfa',
        }}
      >
        {csrftoken && userType === "user" ? (
          [
            <BottomNavigationAction 
            key="home" value="/" component={Link} 
            to="/" icon={<MdHome size={30}/>} 
            />,
            
            <BottomNavigationAction key="profile" value="/user" component={Link} to="/user" icon={<FaUser size={24} />} />,
           
          ]
        ) : csrftoken && userType === "ngo" ? (
          [
            
          ]
        )
          : (
            [
              <BottomNavigationAction 
              key="home" value="/" component={Link} 
              to="/" icon={<MdHome size={30}/>} 
              showLabel
              label = "Home"  
              />,
             
              <BottomNavigationAction key="register" value="/register" showLabel label="Register" component={Link} to="/register" icon={<FaUserPlus size={28} />} />,
              <BottomNavigationAction key="login" value="/login" showLabel label="Login" component={Link} to="/login" icon={<FaUser size={24} />} />,
            ]
          )}
      </BottomNavigation>
    </nav>
    </div>
  );
};

export default Navbar;


