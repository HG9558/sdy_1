<template>
  <el-dialog :visible.sync="openDialog" :title="title" :width="width" center>
    <div slot="title" class="dialog-title">{{ title }}</div>
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "gDialog",
  props: {
    width: {
      type: String,
      default: "500px", //默认450px
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {},
  },
  computed: {
    openDialog: {
      get () {
        return this.visible;
      },
      set (val) {
        this.$emit("update", val); // openDialog改变的时候通知父组件
      },
    },
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
/deep/ {
  .el-dialog {
    background: #fffcfc;
    // border: NaNpx solid #fff7ed;
    border-radius: 20px;
    box-shadow: 0px 7px 13px 6px rgba(183, 159, 132, 0.14);
    overflow: hidden;
    // width: 600px !important;
  }
  .el-dialog__header {
    background: linear-gradient(
      180deg,
      #cebeaf 0%,
      #c6a277 86.11%,
      #d2c2b2 100%
    );
    padding: 0;
    color: #fff;
  }
  .el-dialog__body {
    padding: 0;
  }
}
.dialog-title {
  width: 330px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  height: 49px;
  color: #fff;
  line-height: 49px;
}
</style>