<template>
  <div class="Main">
    <div class="trustWrapper">
      <div class="span1">HELP ME DECIDE</div>
      <div class="title">{{ realtitle }}</div>
      <div id="decisionWrapper">
        <!-- <img src="./images/decision.jpg" /> -->
        <div class="decision">{{ decision }}</div>
      </div>
    </div>
    <van-slider
      class="slider"
      v-model="value"
      :step="1"
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
      <div class="tagWrapper">
        <tag class="tag" v-for="(item,index) in keyData" :key="index" :tagname="item.word" />
      </div>
    </div>
    <div id="recordWrapper">
      <van-icon id="recordButton" name="stop-circle-o" size="2rem" @click="showOverlay" />
      <van-field
        @input="debouncer"
        @compositionstart="flag=false"
        @compositionend="flag=true"
        @keyup="pinyin"
        class="input"
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
import tag from "./tag";
import axios from "axios";
import _ from "lodash";
import audioRecord from "../lib/audioRecord.vue";
export default {
  name: "popup",
  props: ["title"],
  data() {
    return {
      flag: true,
      input: "",
      input2: "",
      overlay: false,
      value: 50,
      cache: {},
      realtitle: this.title,
      decision: "I'm undecided.",
      keyData: []
    };
  },
  components: {
    audioRecord,
    tag
  },
  methods: {
    pinyin() {
      if (this.flag) {
        this.debouncer();
      }
    },
    debouncer: _.debounce(function() {
      axios({
        method: "POST",
        url: "/sentiment/score",
        data: {
          text: this.input
        }
      }).then(res => {
        this.value = res.data * 100;
      });
      axios({
        method: "POST",
        url: "/xf",
        data: {
          text: this.input
        }
      }).then(res => {
        let data = JSON.parse(res.data.replace(/'/g, '"'));
        // let e = Math.round(data.keyData.length * 0.3);
        // this.keyData = data.keyData.slice(0, e);
        this.keyData = data.keyData;
      });
    }, 1000),
    postup() {
      if (this.value !== 50 && this.input !== "") {
        if (this.value > 50) {
          this.cache = { value: this.value, pros: this.input };
          this.$emit("getproTag", this.keyData);
        } else if (this.value < 50) {
          this.cache = { value: this.value, cons: this.input };
          this.$emit("getconTag", this.keyData);
        }
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
      this.input = this.input2;
      this.debouncer();
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
  },
  watch: {
    title(ti) {
      this.realtitle = ti;
    },
    value(val) {
      if (50 < val && val <= 75) {
        this.decision = "I agree.";
      } else if (75 < val && val <= 100) {
        this.decision = "I strongly agree.";
      } else if (25 <= val && val < 50) {
        this.decision = "I disagree.";
      } else if (0 <= val && val < 25) {
        this.decision = "I strongly disagree.";
      } else {
        this.decision = "I'm undecided.";
      }
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
      padding: 3vw;
      margin-top: 2vh;
      font-weight: bold;
      font-size: 1.3em;
      min-height: 12vh;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 85vw;
    }
    #decisionWrapper {
      display: block;
      .decision {
        text-align: center;
        padding: 3vw;
        font-weight: bold;
        margin-bottom: 2vh;
        font-size: 1.3em;
      }
    }
  }
  .slider {
    margin-top: 3vh;
  }
  #compareWrapper {
    margin-top: 5vh;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    span {
      font-size: 0.9em;
      font-weight: bold;
      width: 11vw;
      text-align: center;
    }
    .tagWrapper {
      padding-bottom: 0;
      margin-top: 2vh;
      display: flex;
      flex-wrap: wrap;
      height: auto;
      width: 100%;
      .tag {
        padding: 0;
        margin-bottom: 1vh;
        margin-right: 2vw;
      }
    }
  }
  #recordWrapper {
    display: flex;
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
