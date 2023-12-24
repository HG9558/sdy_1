<template>
  <div class="sponsor">
    <div v-if="i"><img class="post" src="./assets/1.png"></div>
    <div v-else><img class="post" src="./assets/2.png"></div>
    <div class="fix">
      <p :class="i&&'act'" @click="i=1"><i><img src="./assets/c.png"></i></p>
      <p :class="i||'act'" @click="i=0"><i><img src="./assets/m.png"></i></p>
    </div>
    <img v-if="i" src="./assets/m1.png" class="m1">
    <img v-else src="./assets/m2.png" class="m2">
  </div>
</template>
<script>

export default {
  data() {
    return {
      i: 1,
    }
  },
  created() {
    document.querySelector('.footer-container').style.display = 'none'
  },
  beforeDestroy() {
    document.querySelector('.footer-container').style.display = ''
  }
}
</script>

<style lang="scss" scoped>
.sponsor {
  font-size: 0;
  overflow-x: hidden;
  position: relative;
  .m2,.m1 {
    position: absolute;
    width: 62%;
    left: 19%;
    top: 33.8%;
    border-radius: 5px;
  }
  img.m2 {
    top: 34%;
  }
  .fix {
    z-index: 1;
    position: fixed;
    width: 100px;
    height: 230px;
    border-radius: 0 10px 10px 0;
    overflow: hidden;
    top: 25%;
    left: 0;
    p {
      margin: 0;
      height: 115px;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      cursor: pointer;
      i {
        width: 65px;
        height: 65px;
        border-radius: 32.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
      }
      img {
        width: 54px;
        height: 54px;
      }
      &.act {
        background-color: #CFB79D;
      }
    }
  }
  .post {
    margin-top: -10px;
    margin-left: -10px;
    width: calc(100% + 20px);
    background: linear-gradient(180.09deg, #C4C4C4 56.01%, rgba(196, 196, 196, 0) 79.23%);
  }
}
</style>
