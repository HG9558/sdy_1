<template>
  <div class="g-progress">
    <el-progress :text-inside="textInside" :color="color" :stroke-width="strokeWidth" :percentage="percentage" :show-text="showText"></el-progress>
  </div>

</template>

<script>
export default {
  name: "gProgress",
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    strokeWidth: {
      type: Number,
      default: 10,
    },
    showText: {
      type: Boolean,
      default: false,
    },
    textInside: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#F9CB91", //默认色
    },
  },
};
</script>

<style lang="scss" scoped>
.g-progress {
  /deep/ {
    .el-progress-bar__outer {
      background-color: $c-cd;
      backdrop-filter: blur(3px);
    }
  }
  /deep/ {
    .el-progress-bar__inner {
      background: linear-gradient(270deg, #ffb3b3 0%, #ff7676 100%);
      transform: rotate(-180deg);
    }
  }
}
</style>