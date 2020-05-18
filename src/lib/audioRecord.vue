<template>
  <div
    class="audioRecord"
    :class="{ active: recording, ready: isAudioAvailable }"
  >
    <div class="record-btn" @click="startorstop">
      <van-icon class="icon" name="stop-circle-o" size="2rem" />
    </div>
    <van-overlay :show="showup" @click="showup = false">
      <div class="wrapper" @click="showup = false">
        <div class="block"><div>开始录音</div></div>
      </div></van-overlay
    >
    <van-overlay :show="showupstop" @click="showupstop = false">
      <div class="wrapper" @click="showup = false">
        <div class="block"><div>终止录音</div></div>
      </div></van-overlay
    >
  </div>
</template>

<script>
/*eslint-disable*/
import Recorder from "./recorder";
import xfyunConfig from "./recorder/xfyun";
const freezeProperty = (obj, key) => {
  Object.defineProperty(obj, key, {
    configurable: false,
  });
};
const buffer = [];
export default {
  name: "audioRecord",
  mixins: [xfyunConfig],
  data() {
    return {
      processing: false,
      recording: false,
      isAudioAvailable: false,
      blank: false,
      resultCache: {},
      result: "",
      responding: false,
      clickornot: false,
      showup: false,
      showupstop: false,
    };
  },
  methods: {
    startorstop(e) {
      if (!this.clickornot) {
        this.start();
      } else {
        this.stop();
      }
    },
    start(e) {
      if (this.recording || (e && e.which !== 1)) return;
      if (!this.isAudioAvailable) {
        const config = this.getConfig;
        if (!config("appId") || !config("apiKey") || !config("apiSecret")) {
          alert(this.locale.missing_configuration);
          return;
        }
        alert(this.locale.not_supported);
        return;
      }
      this.reset();
      this.recording = true;
      console.log(1111);
      this.recorder.start();
      this.clickornot = true;
      this.showup = true;
      this.$emit("record-start");
    },
    stop(e) {
      if (e && e.which !== 1) return;
      this.recording = false;
      this.recorder.stop();
      this.$emit("record-stop");
      this.clickornot = false;
      this.showupstop = true;
      this.processing = true;
    },
    reset() {
      buffer.splice(0);
      this.resultCache = {};
      this.responding = false;
      setTimeout(() => {
        this.result = "";
      }, 500);
    },
    appendResult(text, sn) {
      this.resultCache[sn] = { text };
    },
    replaceResult(text, sn, start, end) {
      this.appendResult(text, sn);
      const resultCache = this.resultCache;
      for (let i = start; i <= end; i++) {
        resultCache[i].discarded = true;
      }
    },
    getResult() {
      return Object.values(this.resultCache)
        .filter((item) => !item.discarded)
        .map((item) => item.text)
        .join("");
    },
    setResult(data) {
      this.responding = true;
      let str = "";
      const ws = data.ws;
      for (let i = 0; i < ws.length; i++) {
        str = str + ws[i].cw[0].w;
      }
      const pgs = data.pgs;
      const sn = data.sn;
      const ls = data.ls;
      if (pgs) {
        // 开启 wpgs 会有此字段(前提：在控制台开通动态修正功能)
        // 取值为 apd 时表示该片结果是追加到前面的最终结果
        // 取值为 rpl 时表示替换前面的部分结果，替换范围为 rg 字段
        if (pgs === "apd") {
          this.appendResult(str, sn);
        } else {
          var [s, e] = data.rg;
          this.replaceResult(str, sn, s, e);
        }
      } else {
        this.appendResult(str, sn);
      }
      const result = this.getResult();
      this.result = result;

      // 如果是完成模式，则仅在识别结束时返回最终结果
      if (this.completeMode && !ls) return;

      ls && this.reset();

      if (result) {
        this.$emit("record", result);
        this.$emit("input", result);
        ls && this.$emit("record-complete", result);
      } else {
        this.$emit("record-blank");
        this.blank = true;
        setTimeout(() => {
          this.blank = false;
        }, 1000);
      }
    },
  },
  computed: {
    state() {
      return this.recorder ? this.recorder.state : "end";
    },
  },
  created() {
    const config = this.getConfig;
    const recorder = new Recorder({
      onClose: () => {
        this.stop();
        this.processing = false;
      },
      onError: () => {
        this.stop();
        this.reset();
        this.processing = false;
        this.$emit("record-failed", error);
        alert(this.locale.socket_error);
      },
      onMessage: (e) => {
        const jsonData = JSON.parse(e.data);
        if (jsonData.data && jsonData.data.result) {
          this.setResult(jsonData.data.result);
        }
      },
      onStart: () => {},
      appId: config("appId"),
      apiKey: config("apiKey"),
      apiSecret: config("apiSecret"),
      accent: config("accent"),
      language: config("language"),
      pd: config("pd"),
      rlang: config("rlang"),
      ptt: config("ptt"),
      nunum: config("nunum"),
      vad_eos: config("vad_eos"),
    });
    const freezKeys = [
      "appId",
      "apiSecret",
      "apiKey",
      "accent",
      "language",
      "pd",
      "rlang",
      "ptt",
      "nunum",
      "vad_eos",
      "config",
    ];
    freezKeys.forEach((key) => {
      freezeProperty(recorder, key);
    });
    this.recorder = recorder;
    this.isAudioAvailable =
      this.recorder.isAudioAvailable &&
      config("appId") &&
      config("apiKey") &&
      config("apiSecret");
  },
  beforeDestroy() {
    this.recorder.stop();
    this.recorder = null;
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    text-align: center;
    width: 40vh;
    height: 20vh;
    background: #f1c959;
    border-radius: 20px 20px 20px 20px;
    div {
      margin-top: 8vh;
      font-weight: bold;
    }
  }
}
</style>
