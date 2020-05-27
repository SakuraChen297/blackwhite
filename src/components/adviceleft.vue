<template>
  <div class="Main" v-if="show">
    <van-swipe-cell class="advice">
      <template #left>
        <van-button @click="getoff" square type="danger" text="Delete" :style="{ height: '100%' }" />
      </template>
      <van-cell :value="a" class="value" />
    </van-swipe-cell>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "adviceleft",
  data() {
    return {
      show: true,
      a: this.inputPro,
      id: this.delID
    };
  },
  props: ["inputPro", "delID"],
  methods: {
    getoff() {
      axios({
        method: "DELETE",
        url: `/api/pros/${this.id}/`,
        params: {
          token: this.$store.getters.token
        }
      }).then(res => {
        this.show = false;
        console.log("Delete successfully");
      });
      // axios({
      //   method: "DELETE",
      //   url: `/pros/${this.id}`
      // }).then(console.log("Delete successfully"));
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