<template>
  <div class="audioRecord" :classif="{ active: recording, ready: isAudioAvailable }">
    <van-overlay :show="showup" @click="destroy">
      <div class="wrapper">
        <div class="block">
          <div>{{ this.$parent.input2 }}</div>
          <recordingicon class="icon"></recordingicon>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
/*eslint-disable*/
import recordingicon from "../components/recordingicon";
import Recorder from "./recorder";
import xfyunConfig from "./recorder/xfyun";

const freezeProperty = (obj, key) => {
  Object.defineProperty(obj, key, {
    configurable: false
  });
};
const buffer = [];
export default {
  name: "audioRecord",
  mixins: [xfyunConfig],
  components: {
    recordingicon
  },
  data() {
    return {
      processing: false,
      recording: false,
      isAudioAvailable: false,
      blank: false,
      resultCache: {},
      result: "",
      responding: false,
      showup: false
    };
  },
  methods: {
    destroy() {
      this.$destroy();
    },
    start() {
      if (!this.isAudioAvailable) {
        const config = this.getConfig;
        if (!config("appId") || !config("apiKey") || !config("apiSecret")) {
          alert(this.locale.missing_configuration);
          return;
        }
        alert(this.locale.not_supported);
        return;
      }
      this.showup = true;
      this.reset();
      this.recording = true;
      this.recorder.start();
      this.$emit("record-start");
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
    stop() {
      this.recording = false;
      if (this !== null) {
        this.recorder.stop();
      }
      this.$emit("record-stop");
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
        .filter(item => !item.discarded)
        .map(item => item.text)
        .join("");
    }
  },
  mounted: function() {
    this.start();
  },
  computed: {
    state() {
      return this.recorder ? this.recorder.state : "end";
    }
  },
  created() {
    const config = this.getConfig;
    const recorder = new Recorder({
      onClose: () => {
        if (this !== null) {
          this.recorder.stop();
        }
        this.processing = false;
      },
      onError: () => {
        this.stop();
        this.reset();
        this.processing = false;
        this.$emit("record-failed", error);
        alert(this.locale.socket_error);
      },
      onMessage: e => {
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
      vad_eos: config("vad_eos")
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
      "config"
    ];
    freezKeys.forEach(key => {
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
    this.stop();
    this.recorder = null;
  }
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    padding: 5vw;
    width: 100%;
    height: 100%;
    background: transparent;
    align-items: center;
    justify-content: center;
    display: flex;
    div {
      line-height: 30px;
      color: white;
      font-size: 1.2em;
      height: 60%;
      overflow: scroll;
    }
    div::-webkit-scrollbar {
      display: none;
    }
    .icon {
      position: absolute;
      bottom: 0;
      transform: translateY(20vh);
    }
  }
}
</style>
