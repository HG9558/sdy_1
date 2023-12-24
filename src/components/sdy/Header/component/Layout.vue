<template>
  <div>
    <i v-if="isShowArrow" class="left-arrow arrow" @click="prev"></i>
    <div class="menu-wrapper">
      <div :class="['scroll-container',{'flex-start':isShowArrow}]" :style="{transform:`translateX(${-translateWidth}%)`}">
        <slot></slot>
      </div>
    </div>
    <i v-if="isShowArrow" class="right-arrow arrow" @click="next"></i>
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
  width: 32px;
  height: 48px;
  cursor: pointer;
  transition: 0.3s;
  top: 50%;
  transform: translateY(-50%);
   background-size: 100% 100%;
  position: absolute;
   background-image: url('../img/menu/left-arrow.png');
  left: -40px;
  &.right-arrow {
    left: auto;
    right: 0px;
    background-image: url('../img/menu/right-arrow.png');
    &:hover {
      background-image: url('../img/menu/right-arrow-on.png');
    }
  }
  &:hover {
     background-image: url('../img/menu/left-arrow-on.png');
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