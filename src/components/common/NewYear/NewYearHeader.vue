<template>
  <div class="new-year-sdy">
    <div class="left-1 ab">
      <img src="./img/006-3.gif" />
    </div>
    <div class="left-2 ab">
      <img src="./img/005-3.gif" />
    </div>
    <div class="right-1 ab">
      <img src="./img/006-3.gif" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.new-year-sdy {
  .ab {
    position: absolute;
    z-index: 9999;
    pointer-events: none;
  }
  .left-1 {
    left: 1%;
    img {
      width: 70px;
    }
  }
  .left-2 {
    left: 6%;
    top: -20px;
    img {
      width: 160px;
    }
  }
  .right-1 {
    right: 11.5%;
    top: -20px;
    img {
      width: 70px;
    }
  }
}
</style>
