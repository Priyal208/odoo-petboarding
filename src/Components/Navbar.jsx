import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const Navbar = () => {
  const csrftoken = localStorage.getItem("csrftoken");
  const userType = localStorage.getItem("userType");
  const [value, setValue] = useState("/");
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(csrftoken);
    setValue(location.pathname);
    setIsLoggedIn(!!csrftoken);
  }, [location.pathname, csrftoken]);

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
          {isLoggedIn && userType === "user" ? (
            <>
              <BottomNavigationAction
                value="/"
                component={Link}
                to="/"
                icon={<MdHome size={30} />}
              />
              <BottomNavigationAction
                value="/user"
                component={Link}
                to="/user"
                icon={<FaUser size={24} />}
              />
            </>
          ) : isLoggedIn && userType === "ngo" ? (
            <>{/* TODO: Adjust actions for NGO user */}</>
          ) : (
            <>
              <BottomNavigationAction
                value="/"
                component={Link}
                to="/"
                showLabel
                label="Home"
                icon={<MdHome size={30} />}
              />
              <BottomNavigationAction
                value="/register"
                showLabel
                label="Register"
                component={Link}
                to="/register"
                icon={<FaUserPlus size={28} />}
              />
              <BottomNavigationAction
                value="/login"
                showLabel
                label="Login"
                component={Link}
                to="/login"
                icon={<FaUser size={24} />}
              />
            </>
          )}
        </BottomNavigation>
      </nav>
    </div>
  );
};

export default Navbar;
