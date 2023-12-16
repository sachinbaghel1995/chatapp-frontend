import React, { useState, useEffect } from "react";
import style from "./Chats.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getMessage } from "../Redux-Store/MessageSlice";
import { Link, useParams } from "react-router-dom";

const Chats = () => {
  const dispatch = useDispatch();

  const [Text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/users/user", {
          headers: { Authorization: token },
        });

        if (response.data && response.data.user) {
          console.log(response.data.user);

        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [token]);

  const SendMessage = async () => {
    try {
      const response = await axios.post(
        "/api/messages/message",
        { message: Text },
        { headers: { Authorization: token } }
      );

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.chatpage}>
      <div className={style.chatContainer}>
        <ul className={style.chatlist}>
          <ChatList />
        </ul>
      </div>
      <div className={style.inputContainer}>
        <input
          value={Text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
          placeholder="Type your message..."
        />
        <button disabled={Text.length === 0} onClick={SendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
