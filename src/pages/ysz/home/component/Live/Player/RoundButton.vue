<template>
  <el-button v-bind="$attrs" :disabled="disabled" round class="round-button" :class="{'round-button__disabled': disabled}">{{text}}</el-button>
</template>

<script>
export default {
  props: {
    text: String,
    disabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.round-button {
  display: block;
  height: 28px;
  background: linear-gradient(90deg, $bg-ffa, #ffc107);
  border-radius: 41.994px;
  box-shadow: #ffa00091 0px 2px 4px 0px;
  border: 0;
  color: $c-f;
  padding:0px;
  &.round-button__disabled {
    background: $c-c;
    box-shadow: none;
    opacity: 1 !important;
  }
}
</style>
