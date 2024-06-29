import React, { useState, useEffect } from "react";
import styles from "../module/profile.module.css";
import img from "../assets/imgs/paws.webp";
import { MdAddPhotoAlternate } from "react-icons/md";
import axios from "axios";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/api/v1/userProfile");
        if (response.data.success) {
          setUsername(response.data.user.username);
          setEmail(response.data.user.email);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    setPasswordError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/api/v1/resetPassword",
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        alert("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(response.data.message);
      }
    } catch (error) {
      setPasswordError("An error occurred. Please try again.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="bg-custom-gradient h-screen p-[20vh]">
      <div className={`${styles.container} backdrop-blur-sm shadow-2xl`}>
        <div className={styles.wrapper}>
          <div className={styles.avatarUpload}>
            <div className={styles.avatarEdit}>
              <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />
              <label htmlFor="imageUpload">
                <MdAddPhotoAlternate size={30} />
              </label>
            </div>
            <div className={styles.avatarPreview}>
              <div id="imagePreview">
                <img src={img} className={`${styles.photo}`} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.formContainer}>
            <div className={`${styles.passwordUser}`}>
              {/* <div className={styles.inputField}>
                <input type="text" required value={username} readOnly />
                <label>UserName</label>
              </div> */}
              <div className={styles.inputField}>
                <input type="text" required value={email} readOnly />
                <label>EmailId</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.tabs}>
            <div className={styles.tab}>
              <input
                type="radio"
                name="accordion"
                id="chck1"
                defaultChecked
                className={styles.accordianInput}
              />
              <label className={styles.tabLabel} htmlFor="chck1">
                Change Password
              </label>
              <div className={styles.tabContent}>
                <form onSubmit={handleChangePassword}>
                  <div className={`${styles.password}`}>
                    <div className={styles.inputField}>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <label>Current Password</label>
                    </div>
                    <div className={styles.inputField}>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <label>New Password</label>
                    </div>
                    <div className={styles.inputField}>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label>Confirm Password</label>
                    </div>
                  </div>
                  {passwordError && (
                    <div className={styles.error}>{passwordError}</div>
                  )}
                  <div className={styles.btnContainer}>
                    <button className={styles.button} type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.button}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
