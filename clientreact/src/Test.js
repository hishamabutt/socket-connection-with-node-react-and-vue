import React, { Component } from "react";
import io from "socket.io-client";

const fun=()=>{

    io.emit('send_message',"123")
  };


class Test extends Component {
  

  componentDidMount = async () => {
    //socket.io connection
    const socket = io('http://localhost:5000/',{query:{id:'123'}});
    // const socket = io({path:'http://localhost:5000/'});

    socket.emit('send_message',"123");

    socket.on("username", (message) => {
      console.log(message);
    });

    socket.on("receive_message", (message) => {
      console.log(message);
    });

    // socket.on("deletedThought", (id) => {
    //   const updatedThoughts = this.state.thoughts.filter((thought) => {
    //     return thought._id !== id;
    //   });

    //   this.setState({ thoughts: updatedThoughts });
    // });

    // socket.on("thoughtsCleared", () => {
    //   this.setState({ thoughts: [] });
    // });

    
  };

  
  
  render() {

    return (
      <div><button onClick={()=>fun()}>Hello</button>

      </div>
    );
  }
}


export default Test;
