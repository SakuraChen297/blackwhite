/*eslint-disable*/
const defaultConfig = {
  appId: "5eb36bb1",
  apiKey: "f84419c9dc0214f21c03ccb5fc56b06f",
  apiSecret: "f7ca9546b632b65a09aeb4e437fe265b",
  interactiveMode: "press",
  returnMode: "increment",
  language: "zh_cn",
  vad_eos: 10000,
  accent: "mandarin",
};
export default {
  props: {
    appId: String,
    apiKey: String,
    apiSecret: String,
    language: String,
    accent: String,
    pd: String,
    rlang: String,
    ptt: Number,
    nunum: Number,
    vad_eos: Number,
  },
  methods: {
    getConfig(key) {
      if (!this.IATConfig) this.IATConfig = {};
      return this[key] || this.IATConfig[key] || defaultConfig[key];
    },
  },
};
