<template>
  <div class="Main" v-if="show">
    <van-swipe-cell class="advice">
      <template #right>
        <van-button @click="getoff" square type="danger" text="Delete" :style="{ height: '100%' }" />
      </template>
      <van-cell :value="a" class="value" />
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "adviceright",
  data() {
    return {
      show: true,
      a: this.inputCon
    };
  },
  props: ["inputCon"],
  methods: {
    getoff() {
      this.show = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.Main {
  display: flex;
  justify-content: center;
  .advice {
    margin-bottom: 3vh;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 2px 2px 2px #ececec;
  }
}
</style>