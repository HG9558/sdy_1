<template>
  <el-dialog
    :visible.sync="openDialog"
    :append-to-body="true"
    :title="title"
    :width="width"
    center
  >
    <div
      slot="title"
      class="dialog-title"
    >{{title}}</div>
    <slot></slot>
    <span
      slot="footer"
      class="dialog-footer"
    >
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
      default: "450px", //默认450px
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {},
  },
  computed: {
    openDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val); // openDialog改变的时候通知父组件
      },
    },
  },
  methods: {
    handleClick() {
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
    border: NaNpx solid #fff7ed;
    border-radius: 20px;
    box-shadow: 0px 7px 13px 6px rgba(183, 159, 132, 0.14);
    overflow: hidden;
  }
  .el-dialog__header {
    background: #e3a55a;
    padding: 0;
  }
  .el-dialog__body{
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
  font-family: Benmo Jinhei Regular, Benmo Jinhei Regular-Regular;
  font-weight: bolder;
  text-align: center;
  height: 49px;
  color: $c-f;
  line-height: 49px;
  letter-spacing: 0px;
}
</style>