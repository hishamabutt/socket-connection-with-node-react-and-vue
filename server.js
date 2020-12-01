const express = require('express');
var cors = require('cors')
const app = express();
const http = require('http');

//Init Middleware
app.use(cors())
app.use(express.json({ extented: false }));
const PORT = process.env.PORT || 5000;


const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });

io.on("connection", (socket) => {
    console.log("socket.io: User id: ", socket.handshake.query.id);
    socket.join(socket.handshake.query.id);


    socket.on('send_message', message => {
        console.log("Message",message);
    
        //Send message to only that particular room
        io.to(message).emit('receive_message', {
            'content': "content",
            'senderChatID': "senderChatID",
            'receiverChatID':"receiverChatID",
        })
    })

    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });

  

server.listen(PORT, () => console.log(`Sever Started on Port ${PORT}`));
