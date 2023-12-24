<template>
  <div class="download-title">
    <div class="title-left-container">
      <img class="topic" :src="require(`../../img/commonTitle/${module}-bg.png`)"  alt="">
      <div class="text-desc">
        <img class="big-txt" :src="require(`../../img/commonTitle/${module}-text.png`)" alt="">
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
    module: String,
  }
}
</script>

<style scoped lang="scss">
.download-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $c-81;
  margin-bottom: 10px;
  .title-left-container {
    width: 100%;
    @include flex(center,column);
    .topic {
      width: 387px;
    }
    .text-desc {
      @include flex(center,column);
      .big-txt {
        margin-top: -24px;
        width: 143px;
        line-height: 42px;
      }
      .small-txt {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        margin: 4px 0 7px 0;
        color: #6F6F87;
      }
    }
  }
  .title-right-container {
    font-size: 12px;
    line-height: 17px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 35px;
      height: 2px;
      right: 0px;
      background-color: $c-81;
      top: -6px;
    }
  }
}
</style>