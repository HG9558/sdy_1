<template>
  <div :class="`loading-container ${styleName}`" v-if="showLoading">
    <img class="load" src="./img/load.gif" alt="" />
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    showLoading: Boolean,
    styleName: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped lang="scss">
.loading-container {
  @include flex(center, column);
  text-align: center;
  min-height: 840px;
  position: absolute;
  top: 45%;
  width: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.discount {
    width: calc(100% - 200px);
    left: 200px;
    transform: translateY(-50%);
  }
  .no-data-title {
    font-size: 22px;
    line-height: 31px;
    color: #cebeae;
    margin-top: 31px;
  }
  .no-data-img {
    width: 150px;
  }
  .load {
    width: 150px;
  }
}
</style>