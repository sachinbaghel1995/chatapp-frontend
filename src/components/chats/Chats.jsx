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
  const [messages, setMessages] = useState([]);
  const [user, SetUser] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/users/user", {
          headers: { Authorization: token },
        });

        if (response.data && response.data.user) {
          console.log(response.data.user);
          SetUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    console.log(user.name);

    getUserData();
  }, [token]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/messages/getmessage", {
        headers: { Authorization: token },
      });

      if (response.data && response.data.messages) {
        setMessages(response.data.messages); 
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); 

    const intervalId = setInterval(fetchMessages, 1000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);
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
          {messages.map((message) => (
            <li key={message.id}>
              {user.name}-{message.text}
            </li>
          ))}
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
