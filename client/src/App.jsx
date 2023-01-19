import React, { useEffect, useState } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3001");

function App() {
  const [messageList, setMessageList] = useState([]);
  const [nickName, setNickName] = useState("");
  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("initialMessageList", (messages) => {
      setMessageList(messages);
    });

    socket.on("messageToClient", (newMessageText) => {
      setMessageList((prev) => [...prev, newMessageText]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("messageFromClient", {
      text: newMessageText,
      author: nickName,
    });
  };

  return (
    <div className="App">
      <h2>Messages</h2>
      {messageList.map((message) => {
        return (
          <div key={message.id}>
            {message.author} : {message.text}
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <h2>New Message</h2>
        <input
          type="text"
          name="author"
          placeholder="nickname"
          value={nickName}
          required
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="text"
          name="messageContent"
          placeholder="message"
          value={newMessageText}
          required
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}

export default App;
