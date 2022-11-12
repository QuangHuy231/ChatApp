import axios from "axios";
import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { allUsersRoute } from "../utils/APIRoute.js";
//EFF5F5 , D6E4E5 , 497174 , EB6440

const Contact = (currentUser) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await axios.get(allUsersRoute);
      setContacts(data.data);
    };
    fetchUsers();
  }, [currentUser]);

  return (
    <Container>
      <div className="contacts">
        {contacts.map((contact) => (
          <div className="contact" key={contact._id}>
            <img src={contact.avatarImage} alt="" />
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
const Container = styled.div`
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
`;
export default Contact;
