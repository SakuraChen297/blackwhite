<template>
  <div class="Main">
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
</template>

<script>
export default {
  name: "advice",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.Main {
  .adviceCon {
    margin-bottom: 5vh;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 2px 2px 2px #ececec;
  }
}
</style>