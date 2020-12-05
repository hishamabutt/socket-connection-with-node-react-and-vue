const message= (conn,io)=>{
    const test = conn.collection("test").watch();
  
    test.on("change", (change) => {
      console.log(change.operationType);
      switch (change.operationType) {
        case "insert":
          console.log(change.fullDocument);
          io.to('123').emit('receive_message', change.fullDocument)
          break;
        case "replace":
          console.log(change.fullDocument);
          users=getAllUsers();
          io.to('123').emit('receive_message', users);
          break;
        case "delete":
          console.log(change.fullDocument);
          break;
      }
    });
  
}
module.exports = message;
