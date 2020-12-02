const express = require('express');
var cors = require('cors')
const app = express();
const http = require('http');
const message=require('./changestreams/message');
const mongoose = require('mongoose');
const config = require('config');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getAllUsers
} = require('./utils/users');


const db = config.get('mongoURI');
const PORT = process.env.PORT || 5000;

//Init Middleware
app.use(cors())
app.use(express.json({ extented: false }));

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:8080","http://localhost:3000"],
      methods: ["GET", "POST"]
    }
  });


io.on("connection", (socket) => {
    console.log("socket.io: User id: ", socket.handshake.query.id);
    socket.join(socket.handshake.query.id);
    userJoin('1','hisham',socket.id);
    
    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });

//connect to db
mongoose.connect(process.env.DB_URI || db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");
  console.log("Setting change streams");
  message(connection,io);

});
  

server.listen(PORT, () => console.log(`Sever Started on Port ${PORT}`));

