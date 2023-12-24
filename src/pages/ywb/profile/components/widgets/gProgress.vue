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
      default: "#E8EDF9", //默认色
    },
  },
};
</script>

<style lang="scss" scoped>
.g-progress {
  /deep/ {
    .el-progress-bar__outer {
      background-color: #E8EDF9;
    }
  }
  /deep/ {
    .el-progress-bar__inner {
      background: linear-gradient(90deg, #FBBB98 0.02%, #E1956E 100%);
      transform: rotate(-180deg);
    }
  }
}
</style>