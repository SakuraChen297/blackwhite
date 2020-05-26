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
    <div class="gotoWrapper">
      <div class="back" @click="goback">Back</div>
      <div class="lite" @click="goLite">Lite</div>
    </div>

    <div class="title">{{ title }}</div>
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
      <popup
        ref="popup"
        :title="title"
        @getcache="cacheGet"
        @getproTag="protagDown"
        @getconTag="contagDown"
      ></popup>
    </van-popup>
  </div>
</template>

<script>
import proconBar from "./proconBar";
import proconContent from "./proconContent";
import popup from "./Popup";
import axios from "axios";
export default {
  name: "Discuss",
  data() {
    return {
      show: false,
      title: "",
      id: 0,
      proKey: [],
      conKey: []
    };
  },
  components: {
    proconBar,
    popup,
    proconContent
  },
  methods: {
    // preventTouch(e) {
    //   e.preventDefault();
    // }, @touchmove="preventTouch"
    contagDown(data) {
      for (let i = 0; i < data.length; i++) {
        this.conKey.push(data[i]);
      }
    },

    protagDown(data) {
      for (let i = 0; i < data.length; i++) {
        this.proKey.push(data[i]);
      }
    },
    goLite() {
      this.$router.push({
        name: "Lite",
        params: { id: this.id, keyData: this.keyData }
      });
    },
    showPopup() {
      this.show = true;
    },

    goback() {
      this.$router.replace("/Main");
    },
    cacheGet(data) {
      if (data.value > 50) {
        this.$refs.proconContent.prodata.push(data);
        axios({
          method: "POST",
          url: `/record/${this.id}/pros/`,
          params: {
            pros: data.pros,
            tags: this.proKey.join(",")
          }
        }).then(res => {
          console.log("pros in success");
        });
      } else if (data.value < 50) {
        this.$refs.proconContent.condata.push(data);
        axios({
          method: "POST",
          url: `/record/${this.id}/cons/`,
          params: {
            cons: data.cons,
            tags: this.conKey.join(",")
          }
        }).then(console.log("cons in success"));
      }
      this.$refs.popup.input = "";
      this.$refs.popup.value = 50;
      this.show = false;
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    axios({
      method: "GET",
      url: `/record/${this.id}/`
    }).then(res => {
      let data = res.data.data;
      this.title = data.title.title;
      this.$refs.proconContent.prodata = data.pros;
      this.$refs.proconContent.condata = data.cons;
    });
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
  .gotoWrapper {
    display: flex;
    .back {
      font-weight: bold;
      font-size: 0.8em;
      margin-left: 5vh;
      margin-top: 5vh;
      width: 5vh;
    }
    .lite {
      font-weight: bold;
      font-size: 0.8em;
      margin-left: 66vw;
      margin-top: 5vh;
      width: 5vh;
    }
  }
  .title {
    margin: 5vh;
    margin-top: 2vh;
    font-weight: bold;
    font-size: 1.5em;
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
