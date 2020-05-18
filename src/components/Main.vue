<template>
  <div id="Main" @touchmove="preventTouch">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover"
    />
    <h1>My Decisions</h1>
    <img src="./images/pen.jpg" id="pen" />
    <main class="content">
      <div class="inner">
        <div class="addNew" @click="gotolink1">
          <img src="./images/add.jpg" id="add" />
          <span class="ask">Ask New Question</span>
        </div>
        <div class="comments">
          <div class="comment1" @click="gotolink">
            <img src="./images/face.jpg" id="face" />
            <div class="title">
              Should I go fuck your mother bitch you son of a bitch motherfucker?
              <span
                class="responseNum"
              >$ responses</span>
            </div>
            <img src="./images/next.jpg" id="next" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    preventTouch(e) {
      e.preventDefault();
    },
    gotolink1() {
      this.$router.replace("/Ask");
    },
    gotolink() {
      this.$router.replace("/Discuss");
    }
  }
};
</script>

<style lang="scss" scoped>
:root {
  --themeColor: #f1c959;
  --contentColor: #f0b74b;
  --commentsColor: #f1dd53;
}
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
  height: 100vh;
  display: flex;
  background: var(--themeColor, #f1c959);
  h1 {
    white-space: nowrap;
    margin-top: 16%;
    margin-left: 6%;
    height: 6vh;
    width: auto;
  }
  #pen {
    margin-left: 15vw;
    margin-top: 9.5%;
    height: 12vh;
  }
  .content {
    position: absolute;
    bottom: 0;
    background: var(--contentColor, #f0b74b);
    border-radius: 45px 15px 0 0;
    .inner {
      margin-top: 1.5vh;
      border-radius: 20px 20px 0 0;
      background: #f8f8f8;
      padding: 6vw;
      .addNew {
        height: 9vh;
        display: flex;
        border-radius: 10px 10px 10px 10px;
        background: #f8f8f8;
        border: 2px dashed var(--themeColor, #f1c959);
        #add {
          margin: 1vh;
          margin-left: 2vh;
          height: 6vh;
        }
        .ask {
          font-weight: bold;
          font-size: 0.9em;
          margin: 5vw;
        }
      }
      .comments {
        height: 60vh;
        margin-top: 3vh;
        .comment1 {
          height: 9vh;
          border-radius: 10px 10px 10px 10px;
          background: #ffffff;
          box-shadow: 2px 2px 2px #ececec;
          display: flex;
          #face {
            height: 8vh;
            margin-left: 1vh;
          }
          #next {
            height: 8vh;
            margin-right: 1vw;
          }
          .title {
            padding-top: 1.5vh;
            width: auto;
            font-size: 0.8em;
            margin-left: 3vw;
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
      }
      .comment1:before {
        content: "";
        width: 5vw;
        border-radius: 10px 0 0 10px;
        background: var(--commentsColor, #f1dd53);
      }
    }
  }
}
</style>
