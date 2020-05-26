<template>
  <div id="Main">
    <!-- <meta name="full-screen" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="x5-fullscreen" content="true" />-->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
    <div class="back" @click="getTitle">Back</div>
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
        <proconContent ref="proconContent" class="proconContent"></proconContent>
        <van-button color="#2c2e38" size="large" @click="showPopup" id="addResponse">
          <div>Add your response</div>
        </van-button>
      </div>
    </main>
    <van-popup class="popper" v-model="show" position="bottom" round>
      <popup ref="popup" :title="value" @getcache="cacheGet"></popup>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import proconBar from "./proconBar";
import proconContent from "./proconContent";
import popup from "./Popup";
export default {
  name: "Discuss",
  data() {
    return {
      show: false,
      value: "",
      id: 0
    };
  },
  components: {
    popup,
    proconContent,
    proconBar
  },
  methods: {
    getTitle() {
      console.log(this.value);
      if (this.value === "") {
        this.$router.replace("/community");
      } else {
        axios({
          method: "POST",
          url: "/record/",
          params: {
            token: this.$store.getters.token,
            title: this.value
          }
        }).then(res => {
          this.id = res.data.data.id;
          console.log(this.id);
          console.log("success");
          this.$router.replace("/community");
        });
      }
    },
    cacheGet(data) {
      console.log(data);
      if (data.value > 50) {
        this.$refs.proconContent.prodata.push(data);
      } else {
        this.$refs.proconContent.condata.push(data);
      }
      this.show = false;
      this.$refs.popup.input = "";
      this.$refs.popup.value = 50;
    },
    showPopup() {
      this.show = true;
    },
    preventTouch(e) {
      e.preventDefault();
    }
  },
  mounted() {
    this.$refs.proconContent.prodata = [];
    this.$refs.proconContent.condata = [];
  },
  beforeDestroy() {
    console.log(this.id);
    let pro = this.$refs.proconContent.prodata,
      con = this.$refs.proconContent.condata;
    if (pro.length !== 0) {
      for (let i = 0; i < pro.length; i++) {
        axios({
          method: "POST",
          url: `/record/${this.id}/pros`,
          params: {
            pros: pro[i].pros
          }
        }).then(console.log("pros input successfully"));
      }
    }
    if (con.length !== 0) {
      for (let i = 0; i < con.length; i++) {
        axios({
          method: "POST",
          url: `/record/${this.id}/cons`,
          params: {
            cons: con[i].cons
          }
        }).then(console.log("cons input successfully"));
      }
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
