<template>
  <div class="Main">
    <div class="proContent">
      <van-swipe-cell class="advicePro">
        <template #left>
          <van-button square type="danger" text="Delete" :style="{ height: '100%' }" />
        </template>
        <van-cell value="Go and get the best score for the app!" />
      </van-swipe-cell>
      <van-swipe-cell class="advicePro">
        <template #left>
          <van-button square type="danger" text="Delete" :style="{ height: '100%' }" />
        </template>
        <van-cell value="I'm wondering why Mr.Fitz can grow up  handsome like this." />
      </van-swipe-cell>
    </div>
    <div class="conContent">
      <van-swipe-cell class="adviceCon">
        <van-cell value="Nuh,get off." />
        <template #right>
          <van-button square type="danger" text="Delete" :style="{ height: '100%' }" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell class="adviceCon">
        <van-cell value="Nope." />
        <template #right>
          <van-button square type="danger" text="Delete" :style="{ height: '100%' }" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "proconContent",
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.Main {
  display: flex;
  .conContent {
    width: 50%;
    margin-right: 2vh;
    margin-left: 2vh;
    overflow-y: scroll;
    max-height: 46vh;
    .adviceCon {
      margin-bottom: 5vh;
      border-radius: 10px 10px 10px 10px;
      box-shadow: 2px 2px 2px #ececec;
    }
  }
  .conContent::-webkit-scrollbar {
    display: none;
  }
  .proContent {
    width: 50%;
    margin-right: 2vh;
    margin-left: 2vh;
    overflow-y: scroll;
    max-height: 46vh;
    .advicePro {
      margin-bottom: 5vh;
      border-radius: 10px 10px 10px 10px;
      box-shadow: 2px 2px 2px #ececec;
    }
  }
  .proContent::-webkit-scrollbar {
    display: none;
  }
}
</style>