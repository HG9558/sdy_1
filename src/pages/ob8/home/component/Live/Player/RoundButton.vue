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
  background:  linear-gradient(0deg, #96D6FC 0%, #41A7FA 13.54%, #61B3F9 81.77%, #7CDEFE 100%);
  border-radius: 41.994px;
  border: 0;
  color: $c-f;
  padding:0px;
  &.round-button__disabled {
    background: $c-c;
    box-shadow: none;
    opacity: 1 !important;
  }
  &.bg-orange{
    background:  linear-gradient(0deg, #FDC78C 0%, #F0870E 13.54%, #F0AE2D 81.77%, #FFE089 100%);;
  }
}
</style>
