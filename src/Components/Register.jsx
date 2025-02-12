import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../Components/InputField";
import ReactiveButton from "reactive-button";
import custBackgroundImage from "../assets/imgs/pngtree-blue-pastel-background-picture-image_1599663.jpg";
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import i1 from '../assets/imgs/white-dog-pastel-blue-background-3d_89917-269.jpg';
import LoginTextLink from "../Components/LoginTextLink";
import axios from "axios";

function CustomBackground({ image }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
}

function Register() {
  const location = useLocation();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [userTypingPassword, setUserTypingPassword] = useState(false);
  const isLogin = location.pathname !== "/register";

  const customButtonStyle = {
    borderRadius: "20px",
    background: "linear-gradient(to bottom, #b3d9ff, #3399ff)",
    padding: "16px 32px",
    marginTop: "1rem",
    fontSize: "18px",
    fontWeight: "800",
    boxShadow: "rgb(38, 57, 77) 0px 15px 30px -10px",
    letterSpacing: "0.1rem",
    width: "fit-content",
    margin: "auto",
  };

  const [fullName, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("idle");

  const [isMinLength, setIsMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  useEffect(() => {
    setError("");
  }, [isLogin]);

  const validate = (value) => {
    setIsMinLength(value.length >= 8);
    setHasUpperCase(/[A-Z]/.test(value));
    setHasLowerCase(/[a-z]/.test(value));
    setHasNumber(/[0-9]/.test(value));
    setHasSymbol(/[^A-Za-z0-9]/.test(value));
  };

  const handleRegister = async () => {
    setState('loading'); // Set button state to loading
    try {
      const response = await axios.post("http://localhost:3000/auth/api/v1/register", { fullName, phoneNumber ,email, password });

      if (response.status === 200) {
        setState('success'); 
        console.log(response);
      } else {
        setError(response.message || "An error occurred during registration.");
        setState('error'); // Set button state to error if there's an issue with registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.message || 'Registration failed. Please try again.');
      console.log(error.response);
      setState('error'); // Set button state to error if there's an error caught in try-catch block
    }
  };

  const handleLogin = async () => {
    setState('loading'); // Set button state to loading
    try {
      const response = await axios.post("http://localhost:3000/auth/api/v1/login", { email, password });
  
      if (response.status === 200) {
        setState('success'); // Set button state to success if login is successful
      } else {
        setError(response.message || "An error occurred during login.");
        setState('error'); // Set button state to error if there's an issue with login
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.message || 'Login failed. Please try again.');
      setState('error'); // Set button state to error if there's an error caught in try-catch block
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 lg:px-8">
      <CustomBackground image={custBackgroundImage} />
      <div className="w-full max-w-6xl flex flex-row sm:flex-col items-center justify-center rounded-xl shadow-2xl p-6 lg:p-12">
        <div className="w-full flex justify-center items-center mb-8 lg:mb-0">
          <form className="flex flex-col gap-4 w-full max-w-md">
            {!isLogin && (
              <>
                <h1 className="text-center text-indigo-900 font-semibold text-2xl lg:text-3xl">Create Account</h1>
                <InputField
                  className="h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => {
                    setError("");
                    setName(e.target.value);
                  }}
                  required
                />
                <InputField
                  className="h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setError("");
                    setPhoneNumber(e.target.value);
                  }}
                  required
                />
              </>
            )}
            {isLogin && (
              <h1 className="text-center text-indigo-900 font-bold text-2xl lg:text-3xl underline">Welcome Back</h1>
            )}
            <InputField
              className="h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              required
            />
            <div className="relative w-full">
              <InputField
                className="w-full h-12 px-4 py-2 border-b-2 border-blue-800 text-lg bg-white shadow-md"
                type={isPassVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                  validate(e.target.value);
                  setUserTypingPassword(e.target.value.length > 0);
                }}
                required
              />
              {isPassVisible ? (
                <FaEye
                  className="absolute right-4 top-3 text-blue-500 cursor-pointer"
                  onClick={() => setIsPassVisible(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-4 top-3 text-blue-500 cursor-pointer"
                  onClick={() => setIsPassVisible(true)}
                />
              )}
            </div>

            {userTypingPassword && (
              <div className="text-left w-full mt-2">
                <p className={`text-sm ${isMinLength ? 'text-green-500' : 'text-red-500'}`}>• Minimum 8 characters</p>
                <p className={`text-sm ${hasUpperCase ? 'text-green-500' : 'text-red-500'}`}>• At least one uppercase letter</p>
                <p className={`text-sm ${hasLowerCase ? 'text-green-500' : 'text-red-500'}`}>• At least one lowercase letter</p>
                <p className={`text-sm ${hasNumber ? 'text-green-500' : 'text-red-500'}`}>• At least one number</p>
                <p className={`text-sm ${hasSymbol ? 'text-green-500' : 'text-red-500'}`}>• At least one symbol</p>
              </div>
            )}
            {!isLogin && (
              <>
                <div className="w-full relative flex justify-center mt-4">
                  <ReactiveButton
                    style={customButtonStyle}
                    buttonState={state}
                    idleText="Register"
                    loadingText="Wait..."
                    successText="Registered"
                    errorText="Error"
                    messageDuration={3000}
                    disabled={!(isMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol)}
                    onClick={handleRegister}
                  />
                  {error && (
                    <p className="absolute top-[-20px] w-full text-center text-red-500 font-semibold">
                      {error}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col mt-8 gap-2 items-center">
                  <LoginTextLink />
                  <LoginTextLink
                    text={"Are you an NGO?"}
                    link={"/ngoregister"}
                    linkText={"Register Here!"}
                    className="text-indigo-800 underline"
                  />
                </div>
              </>
            )}
            {isLogin && (
              <div className="w-full relative flex justify-center mt-4">
                <ReactiveButton
                  style={customButtonStyle}
                  buttonState={state}
                  idleText="Login"
                  loadingText="Wait..."
                  successText="Logged In"
                  errorText="Error"
                  onClick={handleLogin} 
                />
                {error && (
                  <p className="absolute top-[-20px] w-full text-center text-red-500 font-semibold">
                    {error}
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
        <div className="sm:w-full flex justify-center items-center p-4 lg:mt-0 mt-8">
          <img className="block sm:hidden rounded-xl w-2/3" src={i1} alt="Cute dog" />
        </div>
      </div>
    </div>
  );
}

export default Register;
