import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//EFF5F5 , D6E4E5 , 497174 , EB6440

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    fetch();
  }, []);

  return <div>Chat</div>;
};

export default Chat;
