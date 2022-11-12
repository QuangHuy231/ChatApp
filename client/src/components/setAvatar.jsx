import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoute.js";
import { AuthContext } from "../context/authContext.js";
export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = () => {
      if (!localStorage.getItem("user")) navigate("/login");
    };
    fetchUser();
  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
  const upload = async (e) => {
    try {
      const base64 = await convertBase64(avatar);
      return base64;
    } catch (err) {
      console.log(err);
    }
  };

  const setProfilePicture = async () => {
    const imgUrl = await upload();

    const user = await JSON.parse(localStorage.getItem("user"));
    await axios.put(`${setAvatarRoute}/${user.id}`, {
      image: imgUrl,
    });

    localStorage.setItem("user", JSON.stringify(currentUser));
    navigate("/login");
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Upload Image To Set Your Profile</h1>
        </div>
        <input
          type="file"
          id="avatar"
          onChange={(e) => {
            setAvatar(e.target.files[0]);
          }}
        />
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #eff5f5;
  height: 100vh;
  width: 100vw;
  .title-container {
    h1 {
      color: #497174;
    }
  }

  .submit-btn {
    background-color: #eb6440;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #497174;
    }
  }
`;
