<template>
  <div>Hello</div>
</template>

<script>
import io from "socket.io-client";

export default {

  name: 'HelloWorld',
  props: {
    msg: String,
  },
  mounted() {

   const socket = io('http://localhost:5000/',{query:{id:'123'}});
    // const socket = io({path:'http://localhost:5000/'});

    socket.emit('send_message',"123")

    socket.on("receive_message", (message) => {
      console.log(message);
    });

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
