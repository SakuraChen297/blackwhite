<template>
  <div id="Main" @touchmove="preventTouch">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <h1>注册</h1>
    <div class="inner">
      <van-form class="form" @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="passwordRe"
          type="password"
          name="密码"
          label="二次确认"
          placeholder="请再输入一次密码"
          :rules="[{ required: true, message: '请再输入一次密码' }]"
        />
        <van-field
          v-model="mailortel"
          name="邮箱/手机"
          label="邮箱/手机"
          placeholder="邮箱或手机号码"
          :rules="[{ required: true, message: '请填写邮箱或手机号码' }]"
        />
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请输入短信验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              color="#f1c959"
              :disabled="show"
              @click="countDown"
              native-type="button"
            >
              <div v-if="!show">发送验证码</div>
              <div v-if="show">{{ count }}s后重新发送</div>
            </van-button>
          </template>
        </van-field>
        <van-button
          class="btn"
          @click="gotolink"
          round
          block
          type="info"
          native-type="submit"
          color="#f1c959"
        >
          <div>注册</div>
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      passwordRe: "",
      mailortel: "",
      sms: "",
      show: false,
      count: "",
      timer: null,
    };
  },
  methods: {
    preventTouch(e) {
      e.preventDefault();
    },
    countDown() {
      const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    gotolink() {
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.mailortel !== "" &&
        this.sms !== ""
      ) {
        this.$router.replace("/signIn");
      }
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
  background: var(--themeColor, #f1c959);
  h1 {
    margin-left: 40.4%;
    margin-top: 10%;
    height: 6vh;
    width: 2em;
  }
  .inner {
    margin-top: 10vh;
    background: #f8f8f8;
  }
}
</style>
