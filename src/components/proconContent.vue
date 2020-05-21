<template>
  <div class="Main">
    <div class="proContent">
      <adviceleft v-for="(item,index) in prodata" :key="index" :inputPro="item.input" />
    </div>
    <div class="conContent">
      <adviceright v-for="(item,index) in condata" :key="index" :inputCon="item.input" />
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
      prodata: [
        { value: 75, input: "Get the best score!" },
        {
          value: 100,
          input: "I'm wondering why Mr.Fitz can grow up  handsome like this."
        },
        {
          value: 100,
          input: "I can't find any app that is better than this one."
        },
        { value: 75, input: "No one can build the page such good." }
      ],
      condata: [
        { value: 25, input: "Nuh,get off." },
        { value: 0, input: "Nope." },
        { value: 0, input: "Who got the idea to build this app?It sucks." }
      ]
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