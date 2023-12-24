<template>
  <div>
    <i v-if="isShowArrow" class="el-icon-back arrow" @click="translateWidth=0"></i>
    <div class="menu-wrapper">
      <div :class="['scroll-container',{'flex-start':isShowArrow}]" :style="{transform:`translateX(${translateWidth}%)`}">
        <slot></slot>
      </div>
    </div>
    <i v-if="isShowArrow" class="el-icon-right right-arrow arrow" @click="translateWidth=-100"></i>
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: {
    isShowArrow: Boolean,
    num: Number
  },
  data () {
    return {
      isDirectionStart: false,
      translateWidth: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  flex-shrink: 0;
  color: rgba(221, 221, 221, 0.8);
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  left: -40px;
  &.right-arrow {
    left: auto;
    right: 0px;
  }
  &:hover {
    transform: translateY(-50%) scale(1.2);
  }
}

.menu-wrapper {
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  &.p-50 {
    padding: 0 50px;
  }
  .scroll-container {
    transition: 0.3s;
    height: 100%;
    @include flex(center);
    &.flex-start {
      justify-content: flex-start;
    }
    &.ml_25 {
      margin-left: -25%;
    }
  }
}
</style>