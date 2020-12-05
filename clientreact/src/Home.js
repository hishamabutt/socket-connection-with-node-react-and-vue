import React,{useEffect} from 'react'
import io from "socket.io-client";

export default function Home(props) {

    
    useEffect(() => {
        const temp=props.location.state.data;
        console.log(temp);


        //socket.io connection
        const socket = io('http://localhost:5000/',{query:{company_id:temp.company_id,user_id:temp.user_id,token:temp.token}});
        // const socket = io({path:'http://localhost:5000/'});

        // client-side
        socket.on("connect_error", (err) => {
            console.log(err instanceof Error); // true
            console.log(err.message); // not authorized
            console.log(err.data); // { content: "Please retry later" }
        });

        socket.on("company", (message) => {
            console.log(message);
        });
        socket.on("user", (message) => {
            console.log(message);
        });

        socket.on("receive_message", (message) => {
            console.log(message);
        });





      },[]);
    return (
        <div>
            Hello
        </div>
    )
}
