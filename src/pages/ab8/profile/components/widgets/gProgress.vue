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
      border: 0 !important;
      overflow: visible;
      background: rgba(132, 145, 170, 0.2) !important; 
    }
  }
  /deep/ {
    .el-progress-bar__inner {
      background: linear-gradient(90deg, #53BEFD 2.27%, #0D77F2 100%);
      height: 8px;
    }
  }
}
</style>