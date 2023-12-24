<template>
  <div class="SplitLine-spacer">
    <img class="SplitLine-spacer-left spacer-img" src="./img/bg-spacer-left.png" alt="">
    <slot></slot>
    <img class="SplitLine-spacer-right spacer-img" src="./img/bg-spacer-right.png" alt="">
  </div>
</template>

<script>
export default {
  name: "SplitLine"
}
</script>

<style lang="scss" scoped>
.SplitLine-spacer {
  z-index: 10;
  position: absolute;
  width: 100%;

  @include flex();
  margin: 0 0 17px;
  .spacer-img {
    height: 40px;
  }
}
</style>