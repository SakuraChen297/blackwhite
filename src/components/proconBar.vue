<template>
  <div class="bar">
    <div class="proBar"></div>
    <div class="conBar"></div>
  </div>
</template>

<script>
export default {
  name: "proconBar",
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
$probarcolor: #2c2e38;
$conbarcolor: #ffffff;

.bar {
  border-radius: 20px 20px 20px 20px;
  border: 1px solid $probarcolor;
  display: flex;
  justify-content: space-between;
  margin-right: 5vw;
  margin-left: 5vw;
  .proBar {
    border-radius: 20px 0 0 20px;
    width: 50%;
    height: 3vh;
    background: $probarcolor;
  }
  .conBar {
    border-radius: 0 20px 20px 0;
    width: 50%;
    height: 3vh;
    background: $conbarcolor;
  }
}
</style>