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
			background: #222328 !important;
    }
  }
  /deep/ {
    .el-progress-bar__inner {
			background: linear-gradient(135.44deg, #E7D7A6 0.76%, #DCBF80 97%);
      transform: rotate(-180deg);
    }
  }
}
</style>
