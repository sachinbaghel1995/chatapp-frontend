// <----------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>------------------------

import React, { useState, useEffect } from "react";
import style from "./Chats.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getMessage } from "../Redux-Store/MessageSlice";
import { Link, useParams } from "react-router-dom";
import GroupCreation from "./GroupCreation";
import GroupList from "./GroupList";
import io from "socket.io-client";

const Chats = () => {
  const group = useParams();
  const groupId = group.id;
  console.log(groupId);
  const [Text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, SetUser] = useState("");
  const [toggleImage, setToggleImage] = useState(false);
  const token = localStorage.getItem("token");
  const [image, setImage] = useState([]);

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

      const response = await axios.get(`/api/messages/getmessage/${groupId}`, {
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
        `/api/messages/message/${groupId}`,
        { message: Text },
        { headers: { Authorization: token } }
      );
      socket.emit("message", { message: Text });
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  const toggleImageHandler = () => {
    setToggleImage((prev) => !prev);
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/api/messages/image/${groupId}`, {
          headers: { Authorization: token },
        });

        if (
          response.data &&
          response.data.images &&
          response.data.images.length > 0
        ) {
          // Extract the image path from the response
          const imagePath = response.data.images[0].image;
          setImage(imagePath); // Set the image path directly in state
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [groupId, token]);

  const SendImage = async () => {
    try {
      const formData = new FormData();

      formData.append("image", image);

      const response = await axios.post(
        `/api/messages/image/${groupId}`,
        formData,
        { headers: { Authorization: token } }
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <div className={style.chatpage}>
      <div className={style.container}>
        <div className={style.leftSection}>
          <div></div>
          <div></div>
        </div>

        <div className={style.rightSection}>
          <div className={style.chatContainer}>
            <ul className={style.chatlist}>
              <ChatList />
              {image && (
                <img
                  src={`http://localhost:3000/${image} `}
                  width={100} height={100}
                  
                />
              )}
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
            <button onClick={toggleImageHandler}>SendImage</button>
            {toggleImage && (
              <form onSubmit={SendImage} encType="multipart/form-data">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">send</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
