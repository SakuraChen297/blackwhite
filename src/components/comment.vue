<template>
  <div class="comment1" @click="gotolink">
    <!-- <img src="./images/face.jpg" id="face" /> -->
    <div class="title">
      Should I just go back home and learn more about JavaScript & HTML?
      <span
        class="responseNum"
      >$ responses</span>
    </div>
    <van-icon name="arrow" id="next" size="25" />
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  methods: {
    gotolink() {
      this.$router.replace("/Discuss");
    }
  }
};
</script>

<style lang='scss' scoped>
$themeColor: #ffffff;
$contentColor: #2c2e38;
$commentsColor: #2c2e38;
.comment1 {
  height: auto;
  border-radius: 10px 10px 10px 10px;
  background: #ffffff;
  box-shadow: 2px 2px 2px #ececec;
  display: flex;
  // #face {
  //   height: 8vh;
  //   margin-left: 1vh;
  // }
  #next {
    margin-top: 2vh;
    margin-right: 1vh;
  }
  .title {
    padding-top: 1.5vh;
    width: auto;
    font-size: 0.8em;
    margin-left: 7vw;
    .responseNum {
      display: block;
      padding: 0.3vh;
      height: auto;
      width: 50vw;
      font-size: 0.8em;
      text-align: left;
      color: #a0a0a0;
      white-space: nowrap;
    }
  }
}
.comment1:before {
  content: "";
  width: 5vw;
  border-radius: 10px 0 0 10px;
  background: $commentsColor;
}
</style>