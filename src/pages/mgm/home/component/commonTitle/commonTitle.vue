<template>
  <div class="download-title">
    <div class="title-left-container">
      <img class="topic" src="../../img/topic_icon.png" alt="">
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
    enTxt: String
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
    display: flex;
    align-items: center;
    .topic {
      width: 18px;
    }
    .text-desc {
      display: flex;
      align-items: flex-end;
      margin-left: 21px;
      .big-txt {
        font-weight: 600;
        font-size: 30px;
        line-height: 42px;
        color: $c-81;
      }
      .small-txt {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        margin: 0 0 7px 10px;
        color: $c-81;
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