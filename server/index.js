const express = require("express");
const uniqid = require("uniqid");
const app = express();
const socketIO = require("socket.io");

const server = app.listen(3001);

const io = socketIO(server, {
  cors: { origin: "https://localhost:3000" },
});

const messages = [
  { id: uniqid(), author: "server", text: "welcome to ze chat" },
];

io.on("connect", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
