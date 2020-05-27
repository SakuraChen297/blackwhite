<template>
  <div class="Main">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <div class="back" @click="goBack">Back</div>
    <div class="title">Rate</div>
    <rateSlider
      class="rateSlider"
      v-for="(item,index) in tag "
      :key="index"
      :tagword="item"
      :recordid="id"
    ></rateSlider>
  </div>
</template>

<script>
import axios from "axios";
import rateSlider from "./rateSlider";
export default {
  name: "Lite",
  data() {
    return {
      id: this.$route.query.id,
      keyData: this.$route.query.keyData,
      tag: []
    };
  },
  components: {
    rateSlider
  },
  methods: {
    uniq(array) {
      let temp = {},
        r = [],
        len = array.length,
        val,
        type;
      for (let i = 0; i < len; i++) {
        val = array[i];
        type = typeof val;
        if (!temp[val]) {
          temp[val] = [type];
          r.push(val);
        } else if (temp[val].indexOf(type) < 0) {
          temp[val].push(type);
          r.push(val);
        }
      }
      return r;
    },
    goBack() {
      this.$router.push({
        path: "/Discuss",
        query: { id: this.id }
      });
    }
  },
  mounted() {
    axios({
      method: "GET",
      url: `/api/record/${this.id}/pros/`
    }).then(res => {
      console.log(res);
      let prodata = res.data.pros;
      if (prodata.length === 0) {
        console.log("no pro");
      } else {
        for (let i = 0; i < prodata.length; i++) {
          if (prodata[i].tags === null) {
            continue;
          } else {
            let tag = this.tag.concat(prodata[i].tags.split(","));
            this.tag = this.uniq(tag);
          }
        }
      }
    });
    axios({
      method: "GET",
      url: `/api/record/${this.id}/cons/`
    }).then(res => {
      console.log(res);
      let condata = res.data.cons;
      if (condata.length === 0) {
        console.log("no con");
      } else {
        for (let i = 0; i < condata.length; i++) {
          if (condata[i].tags === null) {
            continue;
          } else {
            let tag = this.tag.concat(condata[i].tags.split(","));
            this.tag = this.uniq(tag);
          }
        }
      }
    });
  }
};
</script>

<style lang='scss' scoped>
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

.Main {
  height: 100%;
  background: $themeColor;
  overflow: scroll;
  .back {
    font-weight: bold;
    font-size: 0.8em;
    margin-left: 5vh;
    margin-top: 5vh;
    width: 5vh;
  }
  .title {
    text-align: center;
    margin: 5vh;
    margin-top: 5vh;
    font-weight: bold;
    font-size: 1.7em;
  }
}
</style>