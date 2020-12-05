const express = require('express');
var cors = require('cors')
const app = express();
const http = require('http');
const message=require('./changestreams/message');
const mongoose = require('mongoose');
const config = require('config');
const {
  getAllToken,
  checkToken
} = require('./utils/token');


const db = config.get('mongoURI');
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

//Init Middleware
app.use(cors())
app.use(express.json({ extented: false }));


//mongod --replSet "rs"
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
  // message(connection,io);
  getAllToken();
  // checkToken("5fcb537887d72c80e821dc23","124");

});


const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:8080","http://localhost:3000"],
      methods: ["GET", "POST"]
    }
  });

io.use((socket, next) => {
  console.log("middleware");
  if(checkToken(socket.handshake.query)){
    next();
  }
  else{
    const err = new Error("not authorized");
    err.data = { content: "Token is not valid" }; // additional details
    next(err);
  }
  
}).on("connection", (socket) => {

    const {company_id,user_id,token}=socket.handshake.query;
    console.log("company = "+company_id + "user = "+user_id + "token = "+token);
    console.log("socket.io: User id: ", user_id +" company :" + company_id);
    socket.join("company"+company_id);
    socket.join("user"+user_id);

    io.to("company"+company_id).emit('company',"hello company "+company_id);
    io.to("user"+user_id).emit('user',"hello user "+user_id);
    
    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });


  
  

server.listen(PORT, () => console.log(`Sever Started on Port ${PORT}`));

