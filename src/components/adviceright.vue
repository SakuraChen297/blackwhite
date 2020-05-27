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
import axios from "axios";
export default {
  name: "adviceright",
  data() {
    return {
      show: true,
      a: this.inputCon,
      id: this.delID
    };
  },
  props: ["inputCon", "delID"],
  methods: {
    getoff() {
      axios({
        method: "DELETE",
        url: `/api/cons/${this.id}/`,
        params: {
          token: this.$store.getters.token
        }
      }).then(res => {
        this.show = false;
        console.log("Delete successfully");
      });
      // axios({
      //   method: "DELETE",
      //   url: `/cons/${this.id}`
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