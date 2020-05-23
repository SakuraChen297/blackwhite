<template>
  <div class="home">
    <div>test</div>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  mounted() {
    axios({
      method: "get",
      url: "/test"
    }).then(res => {
      console.log(res);
    });
  }
};
</script>
