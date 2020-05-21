<template>
  <div id="Main" @touchmove="preventTouch">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <h1>My Decisions</h1>
    <!-- <img src="./images/logo2.jpg" id="logo" /> -->
    <main class="content">
      <div class="inner">
        <div class="addNew" @click="gotolink1">
          <van-icon name="add" id="add" size="35" />
          <span class="ask">Ask New Question</span>
        </div>
        <div class="comments">
          <comment
            v-for="item in commentdata"
            :key="item.id"
            :titlein="item.title"
            :responsein="item.responses"
          ></comment>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import comment from "./comment";
export default {
  name: "Main",
  data() {
    return {
      commentdata: [
        {
          id: 0,
          title:
            "Should I just go back home and learn more about JavaScript & HTML?",
          responses: 6
        },
        {
          id: 1,
          title: "I don't know if I can beat this tough man.",
          responses: 5
        }
      ]
    };
  },
  components: {
    comment
  },
  methods: {
    preventTouch(e) {
      e.preventDefault();
    },
    gotolink1() {
      this.$router.replace("/Ask");
    }
  }
};
</script>

<style lang="scss" scoped>
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
#Main {
  height: 100%;
  display: flex;
  background: $themeColor;
  h1 {
    white-space: nowrap;
    margin-top: 16%;
    margin-left: 6%;
    height: 6vh;
    width: auto;
  }
  // #logo {
  //   margin-left: 15vw;
  //   margin-top: 0;
  //   height: 12vh;
  // }
  .content {
    position: absolute;
    bottom: 0;
    background: $contentColor;
    border-radius: 45px 15px 0 0;
    .inner {
      width: 100vw;
      margin-top: 1.5vh;
      border-radius: 20px 20px 0 0;
      background: #f8f8f8;
      padding: 6vw;
      .addNew {
        height: 9vh;
        display: flex;
        border-radius: 10px 10px 10px 10px;
        background: #f8f8f8;
        border: 2px dashed $contentColor;
        #add {
          margin: 2vh;
          margin-top: 1.6vh;
          margin-left: 2vh;
        }
        .ask {
          font-weight: bold;
          font-size: 0.9em;
          margin: 5vw;
          margin-left: 3.6vw;
        }
      }
      .comments {
        height: 50vh;
        margin-top: 3vh;
        overflow: scroll;
      }
      .comments::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
