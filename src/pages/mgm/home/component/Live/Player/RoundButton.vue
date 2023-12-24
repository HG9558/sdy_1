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
  background: linear-gradient(94.56deg, $bg-bf 6.17%, #cebeae 95.04%);
  border-radius: 41.994px;
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
