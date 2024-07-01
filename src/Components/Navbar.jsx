import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaUser, FaQuestion } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { LuDog } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [value, setValue] = useState("/");
  const location = useLocation();
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setValue(location.pathname);
    setIsScrollable(window.innerHeight < document.body.offsetHeight);
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <nav className="nav">
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{
            width: "100%",
            margin: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            backgroundColor: "#b8ddfa",
          }}
        >
          <BottomNavigationAction
            key="home"
            value="/"
            component={Link}
            to="/"
            icon={<MdHome size={30} />}
            showLabel
            label="Home"
          />
          <BottomNavigationAction
            key="services"
            value="/services"
            component={Link}
            to="/services"
            icon={<LuDog size={28} />}
            showLabel
            label="Services"
          />

          <BottomNavigationAction
            key="faqs"
            value="/faqs"
            component={Link}
            to="/faqs"
            icon={<FaQuestion size={24} />}
            showLabel
            label="FAQs"
          />
          <BottomNavigationAction
            key="aboutus"
            value="/aboutus"
            component={Link}
            to="/aboutus"
            icon={<IoSearchSharp size={24} />}
            showLabel
            label="About Us"
          />
          {!isAuthenticated && (
            <>
              <BottomNavigationAction
                key="login"
                value="/"
                component={Link}
                to="/"
                onClick={() => loginWithRedirect()}
                icon={<FaUser size={24} />}
                showLabel
                label="Login"
              />
            </>
          )}
          {isAuthenticated && (
            <>
              <BottomNavigationAction
                key="profile"
                value="/user"
                component={Link}
                to="/user"
                icon={<FaUser size={24} />}
                showLabel
                label="Profile"
              />
            </>
          )}
        </BottomNavigation>
      </nav>
    </div>
  );
};

export default Navbar;
