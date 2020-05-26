<template>
  <div class="Main" v-if="show">
    <van-swipe-cell>
      <template #right>
        <van-button @click="getoff" square type="danger" text="Delete" :style="{ height: '100%' }" />
      </template>
      <div class="comment1" @click="gotolink">
        <div class="title">
          {{title}}
          <!-- <span class="responseNum">{{response}} responses</span> -->
        </div>
        <div class="iconWrapper">
          <van-icon name="arrow" id="next" size="25" />
        </div>
      </div>
    </van-swipe-cell>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "comment",
  data() {
    return {
      show: true,
      title: this.titlein,
      response: this.responsein,
      key: this.keypass,
      distpass: {}
    };
  },
  props: ["titlein", "responsein", "keypass"],
  methods: {
    getoff() {
      this.show = false;
      axios({
        method: "DELETE",
        url: `/record/${this.key}`
      });
    },
    gotolink() {
      this.$router.push({
        name: "Discuss",
        params: { id: this.key }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
$themeColor: #ffffff;
$contentColor: #2c2e38;
$commentsColor: #2c2e38;
.comment1 {
  height: 8vh;
  border-radius: 10px 10px 10px 10px;
  background: #ffffff;
  box-shadow: 2px 2px 2px #ececec;
  margin-bottom: 3vh;
  display: flex;
  #next {
    margin-top: 2vh;
    margin-left: 8vw;
  }
  .title {
    font-weight: bold;
    padding-top: 1.5vh;
    width: 60vw;
    font-size: 0.8em;
    margin-left: 7vw;
    // .responseNum {
    //   display: block;
    //   padding: 0;
    //   height: auto;
    //   width: 50vw;
    //   font-size: 0.8em;
    //   color: #a0a0a0;
    //   white-space: nowrap;
    // }
  }
}
.comment1:before {
  content: "";
  width: 3vw;
  border-radius: 10px 0 0 10px;
  background: $commentsColor;
}
</style>