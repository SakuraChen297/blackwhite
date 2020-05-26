<template>
  <div class="Main">
    <div class="proContent">
      <adviceleft v-for="(item,index) in prodata" :key="index" :inputPro="item.pros" />
    </div>
    <div class="conContent">
      <adviceright v-for="(item,index) in condata" :key="index" :inputCon="item.cons" />
    </div>
  </div>
</template>

<script>
import adviceleft from "./adviceleft";
import adviceright from "./adviceright";
export default {
  name: "proconContent",
  components: {
    adviceleft,
    adviceright
  },
  data() {
    return {
      prodata: [],
      condata: []
      // { value: 75, pros: "Get the best score!" },
      //   {
      //     value: 100,
      //     pros: "I'm wondering why Mr.Fitz can grow up  handsome like this."
      //   },
      //   {
      //     value: 100,
      //     pros: "I can't find any app that is better than this one."
      //   },
      //   { value: 75, pros: "No one can build the page such good." }
      // ],
      // condata: [
      //   { value: 25, cons: "Nuh,get off." },
      //   { value: 0, cons: "Nope." },
      //   { value: 0, cons: "Who got the idea to build this app?It sucks." }
    };
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
    height: 40vh;
  }
  .conContent::-webkit-scrollbar {
    display: none;
  }
  .proContent {
    width: 50%;
    margin-right: 2vh;
    margin-left: 2vh;
    overflow-y: scroll;
    height: 40vh;
  }
  .proContent::-webkit-scrollbar {
    display: none;
  }
}
</style>