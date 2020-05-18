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
          v-model="username"
          name="用户名/手机"
          label="用户名/手机"
          placeholder="用户名/手机"
          :rules="[{ required: true, message: '请填写用户名/手机' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button
            @click="gotolink"
            round
            block
            typeC="info"
            native-type="submit"
            color="#f1c959"
          >
            <div :style="{ font: 'black' }">登录</div>
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "signIn",
  data() {
    return {
      username: "",
      password: "",
      mail: "",
    };
  },
  methods: {
    preventTouch(e) {
      e.preventDefault();
    },
    gotolink() {
      this.$router.replace("/Main");
    },
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  --themeColor: #f1c959;
  --contentColor: #f0b74b;
  --commentsColor: #f1dd53;
}
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
  background: var(--themeColor, #f1c959);
  h1 {
    margin-left: 40.4%;
    margin-top: 10%;
    height: 6vh;
    width: 2em;
  }
  .inner {
    height: 60vh;
    margin-top: 10vh;
    background: #f8f8f8;
  }
}
</style>
