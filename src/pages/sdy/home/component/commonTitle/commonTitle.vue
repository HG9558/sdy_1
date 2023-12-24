<template>
  <div class="common-title">
    <div class="title-left-container">
      <img v-if="isHot" class="icon-hot" src="../../img/live/hot2.png" alt="">
      <div class="text-desc">
        <div class="big-txt">{{titleTxt}}</div>
        <div class="small-txt">{{subTxt}}</div>
      </div>
    </div>
    <div class="title-right-container">{{enTxt}}</div>
  </div>
</template>

<script>
export default {
  name: "commonTitle",
  props: {
    titleTxt: String,
    subTxt: String,
    enTxt: String,
    isHot: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped lang="scss">
.common-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 80px;
  padding: 0 10px;
  .title-left-container {
    display: flex;
    align-items: center;
    .icon-hot {
      width: 34px;
      margin-right: 15px;
    }
    .text-desc {
      display: flex;
      align-items: flex-end;
      .big-txt {
        font-size: 30px;
        line-height: 38px;
        color: $c-f;
      }
      .small-txt {
        font-size: 14px;
        line-height: 22px;
        margin: 0 0 0 10px;
        color: $c-a;
      }
    }
  }
  .title-right-container {
    line-height: 17px; 
    color: $c-a;  
  }
}
</style>