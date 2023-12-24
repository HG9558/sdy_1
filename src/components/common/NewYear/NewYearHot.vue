<template>
  <div class="new-year-hot">
    <div class="left ab">
      <img src="./img/dl_banner.gif" />
    </div>
    <!-- ------------------ -->
    <!-- <div class="left-0 ab">
      <img src="./img/fu_left.gif" />
    </div>
    <div class="right-0 ab">
      <img src="./img/fu_right.gif" />
    </div> -->
    <!-- ------------------ -->
    <div class="left-1 ab">
      <img src="./img/fu_hot.png" />
    </div>
    <div class="right-1 ab">
      <img src="./img/fu_hot.png" />
    </div>
    <!-- ------------------ -->
    <div class="left-2 ab">
      <img src="./img/sign_hot.png" />
    </div>
    <div class="left-3 ab">
      <img src="./img/006-3.gif" />
    </div>
    <div class="right-2 ab">
      <img src="./img/005-2.gif" />
    </div>
    <!-- ------------------ -->
    <div class="left-4 ab">
      <img src="./img/006-2.gif" />
    </div>
    <div class="left-5 ab">
      <img src="./img/005-3.gif" />
    </div>
    <div class="right-3 ab">
      <img src="./img/005-3.gif" />
    </div>
    <div class="right-4 ab">
      <img src="./img/006-3.gif" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.new-year-hot {
  position: relative;
}
.new-year-hot {
  .ab {
    position: absolute;
    z-index: 99;
    pointer-events: none;
  }
  .left {
    left: 1%;
    top: -2440px;
    img {
      width: 70px;
    }
  }
  .left-0 {
    left: 1%;
    top: -1200px;
    img {
      width: 113px;
    }
  }
  .right-0 {
    right: 1%;
    top: -1200px;
    img {
      width: 113px;
    }
  }
  .left-1 {
    left: 1%;
    top: -40px;
    img {
      width: 70px;
    }
  }
  .right-1 {
    right: 1%;
    top: -40px;
    img {
      width: 70px;
    }
  }
  .left-2 {
    left: 0;
    top: 565px;
    img {
      width: 110px;
    }
  }
  .left-3 {
    left: 2%;
    top: 1320px;
    img {
      width: 110px;
    }
  }
  .right-2 {
    right: 4%;
    top: 1100px;
    img {
      width: 120px;
    }
  }
  .left-4 {
    left: 1%;
    top: 1750px;
    img {
      width: 80px;
    }
  }
  .left-5 {
    left: 6%;
    top: 1720px;
    img {
      width: 210px;
    }
  }
  .right-3 {
    right: 6%;
    top: 1700px;
    img {
      width: 210px;
    }
  }
  .right-4 {
    right: 2%;
    top: 1700px;
    img {
      width: 150px;
    }
  }
}
</style>
