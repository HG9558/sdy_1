<template>
  <div class="new-year-hot">
    <div class="left ab">
      <img src="../img/dl_banner.gif" />
    </div>
    <!-- ------------------ -->
    <div class="left-0 ab">
      <img src="../img/dl_two.gif" />
    </div>
    <div class="right-0 ab">
      <img src="../img/jie.gif" />
    </div>
    <!-- ------------------ -->
    <div class="left-2 ab">
      <img src="../img/sign_hot_2.png" />
    </div>
    <div class="left-3 ab">
      <img src="../img/006-3.gif" />
    </div>
    <!-- ------------------ -->
    <div class="left-4 ab">
      <img src="../img/006-3.gif" />
    </div>
    <div class="right-4 ab">
      <img src="../img/006-3.gif" />
    </div>
    <!-- ------------------ -->
    <div class="left-5 ab">
      <img src="../img/006-3.gif" />
      <img src="../img/005-3.gif" />
    </div>
    <div class="right-5 ab">
      <img src="../img/005-3.gif" />
      <img src="../img/006-3.gif" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.new-year-hot {
  .ab {
    position: absolute;
    z-index: 99;
    pointer-events: none;
  }
  .left {
    left: 60%;
    top: 80px;
    img {
      width: 98px;
    }
  }
  .left-0 {
    left: 4%;
    top: 645px;
    img {
      width: 113px;
    }
  }
  .right-0 {
    right: 4%;
    top: 645px;
    img {
      width: 113px;
    }
  }
  .left-1 {
    left: 1%;
    top: -40px;
    img {
      width: 98px;
    }
  }
  .right-1 {
    right: 1%;
    top: -40px;
    img {
      width: 98px;
    }
  }
  .left-2 {
    left: 0;
    top: 900px;
    img {
      width: 150px;
    }
  }
  .left-3 {
    left: 2%;
    top: 1680px;
    img {
      width: 140px;
    }
  }
  .left-4 {
    left: 4%;
    top: 3500px;
    img {
      width: 90px;
    }
  }
  .right-4 {
    right: 4%;
    top: 3450px;
    img {
      width: 160px;
    }
  }
  .left-5 {
    left: 2%;
    top: 3900px;
    img {
      width: 110px;
      &:nth-child(2) {
        width: 190px;
        transform: translateY(100px);
      }
    }
  }
  .right-5 {
    right: 3%;
    top: 3950px;
    img {
      width: 160px;
      &:nth-child(1) {
        width: 190px;
        transform: translateY(100px);
      }
    }
  }
}
</style>
