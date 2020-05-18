<template>
  <div id="recordGlobal" @touchmove="preventTouch">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <h2 class="recordTitle">实时转写</h2>
    <main class="recordMain">
      <div class="buttonWrapper">
      <audioRecord
          ref="recorderButton"
          class="recordButton"
          v-if="show"
          @record="showResult"
          @record-start="recordStart"
          @record-stop="recordStop"
          @record-blank="recordNoResult"
          @record-failed="recordFailed"
          @record-complete="recordComplete"
        >识别</audioRecord>
      </div>
      <div class="resultWrapper">
        <div class="output">{{ result }}</div>
      </div>
    </main>
  </div>
</template>

<script>
/*eslint-disable*/
import audioRecord from "../lib/audioRecord.vue";
export default {
  name: "Recorder",
  data() {
    return {
      result: "",
      show: true
    };
  },
  components: {
    audioRecord
  },
  methods: {
    preventTouch(e) {
      e.preventDefault();
    },
    recordStart() {
      console.info("录音开始");
    },
    showResult(text) {
      console.info("收到识别结果：", text);
      this.result = text;
    },
    recordStop() {
      console.info("录音结束");
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

<style>
.output {
  background: white;
  height: 200px;
  width: 400px;
  border: 1px solid red;
}
</style>
