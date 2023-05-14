const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Set up routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Store connected users
const users = {};

// Handle new user connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle join event
  socket.on("join", (username, room) => {
    // Store the user in the room
    socket.join(room);
    users[socket.id] = { username, room };

    // Broadcast a message to the room
    socket.to(room).emit("message", `${username} has joined the room`);

    // Update the list of users in the room
    io.to(room).emit("users", getUsersInRoom(room));
  });

  // Handle message event
  socket.on("message", (message) => {
    const { username, room } = users[socket.id];
    io.to(room).emit("message", `${username}: ${message}`);
  });

  // Handle user disconnections
  socket.on("disconnect", () => {
    const { username, room } = users[socket.id];
    delete users[socket.id];

    // Broadcast a message to the room
    socket.to(room).emit("message", `${username} has left the room`);

    // Update the list of users in the room
    io.to(room).emit("users", getUsersInRoom(room));
  });
});

// Helper function to get users in a room
function getUsersInRoom(room) {
  return Object.values(users).filter((user) => user.room === room);
}
