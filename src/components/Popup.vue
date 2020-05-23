<template>
  <div class="Main">
    <div class="trustWrapper">
      <div class="span1">HELP ME DECIDE</div>
      <div class="title">Should I just go back home and learn more about JavaScript & HTML?</div>
      <div id="decisionWrapper">
        <!-- <img src="./images/decision.jpg" /> -->
        <h3>I'm undecided.</h3>
      </div>
    </div>
    <van-slider
      class="slider"
      v-model="value"
      :step="25"
      active-color="#2c2e38"
      inactive-color="#ffffff"
      bar-height="14px"
      :style="{ border: '1px solid #2c2e38' }"
    />
    <div id="compareWrapper">
      <span>Strong Con</span>
      <span>Con</span>
      <span>Pro</span>
      <span>Strong Pro</span>
    </div>
    <div id="recordWrapper">
      <van-icon id="recordButton" name="stop-circle-o" size="2rem" @click="showOverlay" />
      <van-field
        @input="debouncer"
        class="input"
        :value="input"
        v-model="input"
        placeholder="Tell me why?"
        type="textarea"
      ></van-field>
    </div>
    <van-button @click="postup" color="#2c2e38" size="large" class="postResponse">
      <div>Post response</div>
    </van-button>
    <audioRecord
      v-if="overlay"
      @record="showResult"
      @record-start="recordStart"
      @record-stop="recordStop"
      @record-blank="recordNoResult"
      @record-failed="recordFailed"
      @record-complete="recordComplete"
    />
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import audioRecord from "../lib/audioRecord.vue";
export default {
  name: "popup",
  data() {
    return {
      input: "",
      input2: "",
      overlay: false,
      value: 50,
      cache: {}
    };
  },
  components: {
    audioRecord
  },
  methods: {
    debouncer: _.debounce(() => {
      axios({
        method: "POST",
        url: "/sentiment/score",
        data: {
          text: "苹果很非常十分昂贵"
        }
      }).then(res => {
        console.log("success");
        console.log(res);
      });
    }, 1000),
    postup() {
      if (this.value !== 50 && this.input !== "") {
        console.log(this.value);
        this.cache = { value: this.value, input: this.input };
        console.log(this.cache);
        this.$emit("getcache", this.cache);
      }
    },
    showOverlay() {
      this.overlay = true;
    },
    showResult(text) {
      console.info("收到识别结果：", text);

      this.input2 = text;
    },
    recordStart() {
      console.info("录音开始");
    },
    recordStop() {
      console.info("录音结束");
      setInterval(() => {
        this.input = this.input2;
      }, 500);
      this.overlay = false;
      this.input2 = "";
    },
    recordNoResult() {
      console.info("没有录到什么，请重试");
    },
    recordComplete(text) {
      console.info("识别完成! 最终结果：", text);
    },
    recordFailed(error) {
      console.info("识别失败，错误栈：", error);
    }
  }
};
</script>

<style lang="scss" scoped>
$themeColor: #ffffff;
$contentColor: #2c2e38;
$commentsColor: #2c2e38;
.Main {
  padding: 4vh;
  .trustWrapper {
    .span1 {
      font-size: 0.6em;
      color: grey;
    }
    .title {
      margin-top: 2vh;
      font-weight: bold;
      font-size: 1.3em;
      min-height: 12vh;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 85vw;
    }
    #decisionWrapper {
      display: flex;
      justify-content: center;
      // img {
      //   transform: translateX(-1.5vw);
      //   height: 8vh;
      // }
      // h3 {
      //   transform: translateY(-0.5vh);
      //   padding-left: 2vh;
      // }
    }
  }
  .slider {
    margin-top: 3vh;
  }
  #compareWrapper {
    margin-top: 5vh;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 0.9em;
      font-weight: bold;
      width: 11vw;
      text-align: center;
    }
  }
  #recordWrapper {
    display: flex;
    margin-top: 3vh;
    height: 15vh;
    #recordButton {
      height: 10vh;
      width: 10vh;
      margin-top: 5vh;
      margin-left: 1.5vh;
    }
    .input {
      margin-top: 3vh;
      border: 1px solid #eeeeee;
      border-radius: 8px 8px 8px 8px;
      max-height: 10vh;
    }
  }
  .postResponse {
    width: 90vw;
    left: 50%;
    margin-left: -45vw;
    border-radius: 8px 8px 8px 8px;
    height: 6.5vh;
    div {
      color: #ffffff;
    }
  }
}
</style>
