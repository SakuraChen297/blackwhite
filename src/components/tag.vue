<template>
  <div class="Main">
    <van-tag v-if="show" closeable size="medium" @close="close" color="#2c2e38">{{tagName}}</van-tag>
  </div>
</template>

<script>
export default {
  name: "tag",
  props: ["tagname"],
  data() {
    return {
      show: true,
      tagName: this.tagname
    };
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("closetag", this.tagName);
    }
  }
};
</script>

<style>
</style>