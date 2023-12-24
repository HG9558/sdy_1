<template>
  <div>
    <i v-if="isShowArrow" class="el-icon-back arrow" @click="prev"></i>
    <div class="menu-wrapper">
      <div :class="['scroll-container',{'flex-start':isShowArrow}]" :style="{transform:`translateX(${-translateWidth}%)`}">
        <slot></slot>
      </div>
    </div>
    <i v-if="isShowArrow" class="el-icon-right right-arrow arrow" @click="next"></i>
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: {
    length: {   // 列表长度
      type: Number,
      default: 0
    },
    num: {    // 每行展示数量
      type: Number,
      default: 0
    }
  },
  computed: {
    isShowArrow() {
      return this.length > this.num;
    }
  },
  data () {
    return {
      isDirectionStart: false,
      translateWidth: 0
    }
  },
  methods: {
    prev(){
      if(this.translateWidth/100 > 0){
        this.translateWidth -= 100;
      }
    },
    next(){
      let pageSize = Math.ceil( this.length / this.num );
      if(this.translateWidth/100 < pageSize - 1){
        this.translateWidth += 100;
      }
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
.multi-language .scroll-container {
	white-space: nowrap;
}
</style>
