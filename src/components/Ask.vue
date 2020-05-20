<template>
  <div id="Main">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
    <div class="back" @click="goback">Back</div>
    <van-field class="addTitle" v-model="value" placeholder="What is your dilema?" type="textarea" />
    <main class="content">
      <div class="inner">
        <div class="procon">
          <span>Pros</span>
          <span>Cons</span>
        </div>
        <proconBar></proconBar>
        <div class="procon2">
          <span>PROS</span>
          <span>CONS</span>
        </div>
        <proconContent class="proconContent"></proconContent>
        <van-button color="#2c2e38" size="large" @click="showPopup" id="addResponse">
          <div>Add your response</div>
        </van-button>
      </div>
    </main>
    <van-popup class="popper" v-model="show" position="bottom" round>
      <popup></popup>
    </van-popup>
  </div>
</template>

<script>
import proconBar from "./proconBar";
import proconContent from "./proconContent";
import popup from "./Popup";
export default {
  name: "Discuss",
  data() {
    return {
      show: false,
      value: ""
    };
  },
  components: {
    popup,
    proconContent,
    proconBar
  },
  methods: {
    showPopup() {
      this.show = true;
    },

    goback() {
      this.$router.replace("/Main");
    }
  }
};
</script>

<style lang="scss" scoped>
$themeColor: #ffffff;
$contentColor: #2c2e38;
$commentsColor: #f1dd53;
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
  .back {
    font-weight: bold;
    font-size: 0.8em;
    margin-left: 5vh;
    margin-top: 5vh;
    width: 5vh;
  }
  .addTitle {
    background: $themeColor;
    padding-left: 5vh;
    font-weight: bold;
    font-size: 1.5em;
    max-height: 20vh;
  }
  .content {
    position: absolute;
    bottom: 0;
    background: $contentColor;
    border-radius: 45px 15px 0 0;
    .inner {
      margin-top: 1.5vh;
      border-radius: 20px 20px 0 0;
      background: #f8f8f8;
      width: 100vw;
      .procon {
        padding: 6vw;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 0.8em;
      }
      .bar {
        display: flex;
        justify-content: space-between;
        .proBar {
          width: 50%;
          height: 6vh;
          background: #f4d850;
          border-radius: 0 50px 50px 0;
        }
        .conBar {
          width: 50%;
          height: 6vh;
          background: #ed9c48;
          border-radius: 50px 0 0 50px;
        }
      }
      .procon2 {
        display: flex;
        justify-content: space-between;
        padding: 6vw;
        font-weight: bold;
        font-size: 1em;
      }
      #addResponse {
        margin-bottom: 1.5vh;
        width: 90vw;
        left: 50%;
        margin-left: -45vw;
        border-radius: 8px 8px 8px 8px;
        height: 6vh;
        div {
          color: #ffffff;
          font-weight: bold;
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>
