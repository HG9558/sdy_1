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
      background: rgba(188, 169, 151, 0.2) !important;
    }
  }
  /deep/ {
    .el-progress-bar__inner {
      background: linear-gradient(270deg, #F8E0C8 0%, #BCA997 100%) !important;
      transform: rotate(-180deg);
    }
  }
}
</style>
