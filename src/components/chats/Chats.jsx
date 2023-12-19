import React, { useState, useEffect } from "react";
import style from "./Chats.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getMessage } from "../Redux-Store/MessageSlice";
import { Link, useParams } from "react-router-dom";
import GroupCreation from "./GroupCreation";
import GroupList from "./GroupList";

const Chats = () => {
  const dispatch = useDispatch();

  const [Text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, SetUser] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getStoredMessages = () => {
      const storedMessages = JSON.parse(localStorage.getItem("messages"));
      if (storedMessages) {
        setMessages(storedMessages);
      }
    };

    getStoredMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const lastMessageTimestamp =
        messages.length > 0 ? messages[0].createdAt : null;

      const response = await axios.get("/api/messages/getmessage", {
        headers: { Authorization: token },
        params: { lastMessageTimestamp },
      });

      if (response.data && response.data.messages) {
        const newMessages = response.data.messages;

        const updatedMessages = [...newMessages, ...messages];
        const latestTenMessages = updatedMessages.slice(0, 10); // Take only the latest ten messages

        localStorage.setItem("messages", JSON.stringify(latestTenMessages));

        setMessages(latestTenMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  // useEffect(() => {
  //   fetchMessages();

  //   const intervalId = setInterval(fetchMessages, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

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
  console.log(user);
  return (
    <div className={style.chatpage}>
      <div className={style.chatContainer}>
        <div>
          <GroupCreation />
        </div>
        <div>
          <GroupList />
        </div>
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
