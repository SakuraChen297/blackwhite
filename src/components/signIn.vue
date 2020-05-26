<template>
  <div id="Main" @touchmove="preventTouch">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <h1>登录</h1>
    <div class="inner">
      <van-form class="form" @submit="onSubmit">
        <van-field
          class="first"
          :style="{background:'#f8f8f8'}"
          v-model="username"
          name="用户名/手机/邮箱"
          label="用户"
          placeholder="用户名/手机/邮箱"
          :rules="[{ required: true, message: '请填写用户名/手机/邮箱' }]"
        />
        <van-field
          class="second"
          :style="{background:'#f8f8f8'}"
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button @click="signin" round block typeC="info" native-type="submit" color="#2c2e38">
            <div :style="{ font: 'black' ,fontWeight:'bold'}">登录</div>
          </van-button>
          <div class="noregister" @click="goregister">注册</div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "signIn",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    goregister() {
      this.$router.replace("/register");
    },
    signin() {
      if (this.username !== "" && this.password !== "") {
        axios({
          method: "POST",
          url: "/user/login/",
          params: {
            username: this.username,
            password: this.password
          }
        })
          .then(res => {
            alert("登录成功！3s后进入主界面");
            console.log("success");
            console.log(res);
            this.$store.commit("handleToken", res.data.token);
            this.$store.commit("handleUserName", this.username);
            setTimeout(() => {
              this.$router.replace("/Main");
            }, 3000);
          })
          .catch(error => {
            console.log(error);
            alert("登陆失败！请检查您的用户名与密码是否匹配");
          });
      }
    },
    preventTouch(e) {
      e.preventDefault();
    },
    gotolink() {
      this.$router.replace("/Main");
    },
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>

<style lang="scss" scoped>
$themeColor: #ffffff;
$contentColor: #2c2e38;
$commentsColor: #2c2e38;
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
*::before,
*::after {
  box-sizing: border-box;
}
#Main {
  height: 100%;
  background: $themeColor;
  h1 {
    margin-left: 40.4%;
    margin-top: 10%;
    height: 6vh;
    width: 2em;
  }
  .inner {
    height: 70vh;
    margin-top: 10vh;
    background: #f8f8f8;
    .first {
      height: 10vh;
    }
    .second {
      height: 10vh;
    }
    .noregister {
      margin: 2vw;
      text-align: right;
      font-weight: bold;
    }
  }
}
</style>
