import React from "react";
import styles from "../module/profile.module.css";
import img from "../assets/imgs/paws.webp";
import { MdAddPhotoAlternate } from "react-icons/md";

const Profile = () => {
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
                <input type="text" required value={"shubh21"} />
                <label>UserName</label>
              </div>
              <div className={styles.inputField}>
                <input type="text" required value={"shubhdoshi21@gmail.com"} />
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
                // defaultChecked
                className={styles.accordianInput}
              />
              <label className={styles.tabLabel} htmlFor="chck1">
                Change Password
              </label>
              <div className={styles.tabContent}>
                <div className={`${styles.password}`}>
                  <div className={styles.inputField}>
                    <input type="password" required />
                    <label>Current Password</label>
                  </div>
                  <div className={styles.inputField}>
                    <input type="password" required />
                    <label>New Password</label>
                  </div>
                  <div className={styles.inputField}>
                    <input type="password" required />
                    <label>Confirm Password</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.button} type="submit">
              Save
            </button>
            <button className={styles.button}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
