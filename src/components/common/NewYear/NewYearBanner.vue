<template>
  <div class="new-year-banner">
    <div class="left-1 ab">
      <img src="./img/fu_left.gif" />
    </div>
    <div class="right-1 ab">
      <img src="./img/fu_right.gif" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.center-container {
  position: relative;
}
.new-year-banner {
  .ab {
    position: absolute;
    z-index: 99;
    pointer-events: none;
  }
  .left-1 {
    left: 1%;
    top: -75px;
    img {
      width: 100px;
    }
  }
  .right-1 {
    right: 1%;
    top: -75px;
    img {
      width: 100px;
    }
  }
}
</style>
