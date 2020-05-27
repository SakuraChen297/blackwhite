<template>
  <div class="sliderWrapper">
    <div class="tag">{{tag}}</div>
    <van-slider
      class="slider"
      v-model="value"
      :step="1"
      active-color="#2c2e38"
      inactive-color="#ffffff"
      bar-height="14px"
      :style="{ border: '1px solid #2c2e38' }"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "rateslider",
  props: ["tagword", "recordid"],
  data() {
    return {
      id: this.recordid,
      tag: this.tagword,
      value: 50
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: `/api/record/${this.id}/keys/`
    }).then(res => {
      console.log(res);
      let rating = res.data.data;
      for (let i = 0; i < rating.length; i++) {
        if (rating[i].keyword === this.tag) {
          this.value = rating[i].rating;
          break;
        }
      }
    });
  },
  beforeDestroy() {
    axios({
      method: "DELETE",
      url: `/api/record/${this.id}/keys/`
    }).then(res => {
      console.log("deletesuccess");
      axios({
        method: "POST",
        url: `/api/record/${this.id}/keys/`,
        params: {
          keyword: this.tag,
          rating: this.value
        }
      }).then(console.log("postsuccess"));
    });
  }
};
</script>

<style lang='scss' scoped>
.sliderWrapper {
  padding: 4vh;
  padding-top: 2vh;
  .tag {
    font-weight: bold;
    font-size: 0.9em;
  }
  .slider {
    margin-top: 1vh;
  }
}
</style>