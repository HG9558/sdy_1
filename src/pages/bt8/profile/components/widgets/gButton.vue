<template>
  <div class="g-button" :style="{width:width+'px'}">
    <el-button :size="size" :type="type" :loading="loading" :disabled="disabled" :round="round" @click="handleClick">
      <slot></slot>
    </el-button>
  </div>

</template>

<script>
export default {
  name: "gButton",
  props: {
    width: {
      // 按钮尺寸
      default: 150,
    },
    size: {
      // 按钮尺寸
      type: String,
      default: "medium",
    },
    type: {
      // 按钮类型
      type: String,
      default: null,
    },
    loading: {
      // 按钮加载标识
      type: Boolean,
      default: false,
    },
    round: {
      // 按钮加载标识
      type: Boolean,
      default: false,
    },
    disabled: {
      // 按钮是否禁用
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {};
  },
  methods: {
    handleClick () {
      // 按钮操作处理函数
      this.$emit("click", {});
    },
  },
};
</script>

<style lang="scss" scoped>
.g-button {
  display: inline-block;
  /deep/ {
    .el-button--line {
      border-color: #f9cb91;
      color: #f9cb91;
    }
    .el-button--line:focus,
    .el-button--line:hover {
      background-color: $c-f;
    }
    .el-button--medium {
      width: 100%;
    }
    .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
      background-color: #c9c9c9;
    }
    .el-button--primary {
      color: $c-f;
      background:  linear-gradient(312.61deg, #475B86 11.98%, #C5D6FF 165.62%);
      border-radius: 8px;
      height: 40px;
      border-color: transparent;
      font-size: 16px;
    }
    .el-button--primary:focus,
    .el-button--primary:hover {
      background-color: $c-ff3;
    }
    .el-button--darkgreen {
      color: $c-f;
      background-color: #5eafc2;
      border-color: transparent;
    }
    .el-button--darkgreen:focus,
    .el-button--darkgreen:hover {
      background-color: #5eafc2;
    }
  }
}
</style>