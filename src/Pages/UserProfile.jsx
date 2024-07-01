import React, { useState, useEffect } from "react";
import styles from "../assets/cssfiles/module/profile.module.css";
import img from "../assets/imgs/paws.webp";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setUsername(user.nickname || user.name);
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const handlePasswordChange = async () => {
    const domain = "dev-z53na0k6znkt7cwx.us.auth0.com";
    const clientId = "eN8bndYfmSwIjxrfwITsmqi7uZe5UqfN";
    const connection = "Username-Password-Authentication"; // Replace with your connection name if different

    const url = `https://${domain}/dbconnections/change_password`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        email: email,
        connection: connection,
      }),
    };

    const response = await fetch(url, requestOptions);
    if (response.ok) {
      alert("Password reset email sent!");
    } else {
      alert("Failed to send password reset email.");
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
              <div className={styles.inputField}>
                <input type="text" value={username} />
                <label>UserName</label>
              </div>
              <div className={styles.inputField}>
                <input type="text" value={email} />
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
                <p>To change your password, click the button below.</p>
                <button
                  className={styles.button}
                  onClick={handlePasswordChange}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={styles.button}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
