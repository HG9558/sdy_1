<template>
  <div class="wallet-dialog">
    <el-form size="small">
      <el-form-item>
        <div class="text">
          {{ dialogData.dialogContent }}
        </div>
      </el-form-item>
      <el-form-item>
        <div class="footer">
          <el-button class="self-footer cancel" type="primary" @click="sumbit(false)"
            >{{$t('取消')}}</el-button
          >
          <el-button class="self-footer sumbit" type="primary" @click="sumbit(true)"
            >{{$t('确认')}}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["dialogData"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    sumbit(bool) {
      this.$emit("dialog-event", {
        type: "base",
        sumbit: bool,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../css/dialog.scss";
</style>
