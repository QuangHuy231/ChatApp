import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contact from "../components/Contact";
import Logo from "../assets/logo2.png";
import Logout from "../components/Logout";

//EFF5F5 , D6E4E5 , 497174 , EB6440

const Chat = () => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        setCurrentUserName(data.username);

        setCurrentUserImage(data.avatarImage);
      }
    };
    fetch();
  }, [navigate]);

  return (
    <Container>
      <form>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>VOICE CALL</h3>
        </div>
        <Contact />
        <div className="current-user">
          <img src={currentUserImage} alt="avatar" />

          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
          <Logout />
        </div>
      </form>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f8ede3;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #dfd3c3;
    border-radius: 2rem;
    padding: 10px 20px;
    width: 50%;
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img {
        height: 5rem;
      }
    }
    .current-user {
      background-color: #eb6440;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      margin-left: 36px;
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: space-around;
      transition: 0.5s ease-in-out;

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;
export default Chat;
