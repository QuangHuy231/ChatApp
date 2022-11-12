import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo2.png";
import Logout from "../components/Logout";
import { AuthContext } from "../context/authContext.js";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoute.js";
import loader from "../assets/loader.gif";
import { BiPhoneCall } from "react-icons/bi";

//EFF5F5 , D6E4E5 , 497174 , EB6440

const Chat = () => {
  const [contacts, setContacts] = useState([{}]);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        if (!currentUser.isAvatarImageSet) {
          navigate("/setAvatar");
        }

        const data = await JSON.parse(localStorage.getItem("user"));
        setCurrentUser(data);

        setCurrentUserName(data.username);

        setCurrentUserImage(data.avatarImage);
      }
    };
    fetch();
  }, [currentUser.isAvatarImageSet, navigate, setCurrentUser]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const id = currentUser.id;
        const data = await axios.get(`${allUsersRoute}/${id}`);

        setContacts(data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [currentUser.id]);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <form>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>VOICE CALL</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact) => (
                <div className="contact" key={contact.id}>
                  <img src={contact.avatarImage} alt="" />
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                  <Button>
                    <BiPhoneCall />
                  </Button>
                </div>
              ))}
            </div>
            <div className="current-user">
              <img src={currentUserImage} alt="avatar" />

              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
              <Logout />
            </div>
          </form>
        </Container>
      )}
    </>
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
    .contacts {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      gap: 0.8rem;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .contact {
        background-color: #ffffff34;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
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
            color: black;
          }
        }
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
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
export default Chat;
