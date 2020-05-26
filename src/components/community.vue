<template>
  <div class="Main">
    <van-search class="searchIn" v-model="value" shape="round" placeholder="请输入搜索关键词">
      <template #left>
        <van-icon name="wap-nav" size="18" color="#c0c2d4" class="search" />
      </template>
    </van-search>
    <div class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-card v-for="item in list" :key="item" :border="false">
          <template #thumb id="fuck">
            <img src="./images/space.jpg" class="img" />
          </template>
          <template #desc>
            <div class="description">我应该在大城市生活吗？</div>
          </template>
          <template #tags>
            <div class="bar">
              <div class="proBar"></div>
              <div class="conBar"></div>
            </div>
          </template>
        </van-card>
      </van-list>
    </div>
    <van-nav-bar title="标题" left-text="返回">
      <template #left>
        <van-icon name="browsing-history" size="18" color="#2c2e38" class="left" />
      </template>
      <template #title>
        <van-icon name="add" size="50" color="#c0c2d4" @click="gotoAsk" />
      </template>
      <template #right>
        <van-icon name="manager-o" size="18" color="#c0c2d4" class="right" @click="gotoMain" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: "community",
  data() {
    return {
      value: "",
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    gotoMain() {
      if (this.$store.getters.token === null) {
        alert("未登录，请先登录");
        this.$router.push({ name: "signIn" });
      } else {
        this.$router.push({ name: "Main" });
      }
    },
    gotoAsk() {
      if (this.$store.getters.token === null) {
        alert("未登录，请先登录");
        this.$router.push({ name: "signIn" });
      } else {
        this.$router.push({ name: "Ask" });
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
$themeColor: #ffffff;
$contentColor: #2c2e38;
$commentsColor: #2c2e38;
$probarcolor: #2c2e38;
$conbarcolor: #ffffff;
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
  .searchIn {
    height: 10vh;
    font-weight: bold;
    .search {
      margin: 1vw;
      margin-right: 3vw;
    }
  }
  .left {
    margin-left: 15vw;
  }
  .right {
    margin-right: 15vw;
  }

  .back {
    font-weight: bold;
    font-size: 0.8em;
    margin-left: 5vh;
    margin-top: 5vh;
    width: 5vh;
  }
  .content {
    height: 80%;
    overflow: scroll;
    .description {
      padding-top: 3vh;
      text-align: center;
      font-size: 1.2em;
    }
    .bar {
      margin-top: 3vh;
      border-radius: 20px 20px 20px 20px;
      border: 1px solid $probarcolor;
      display: flex;
      justify-content: space-between;
      margin-right: 5vw;
      margin-left: 5vw;
      .proBar {
        border-radius: 20px 0 0 20px;
        width: 50%;
        height: 2vh;
        background: $probarcolor;
      }
      .conBar {
        border-radius: 0 20px 20px 0;
        width: 50%;
        height: 2vh;
        background: $conbarcolor;
      }
    }
  }
}
</style>