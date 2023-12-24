<template>
  <div class="special-wrapper">
    <div class="special-container">
      <div class="special-content">
        <div class="special-txt">
          <img class="title-img" :src="require(`./img/title_${renderData.depotCode.toLowerCase()}.png`)" alt="">
          <!-- <div class="special-txt_title">{{ renderData.title || renderData.depotName || renderData.gameTag }}</div>
          <div class="special-txt_en">{{renderData.enTxt}}</div> -->
          <div class="special-txt_sentence">{{renderData.sloginsData}}</div>
        </div>

        <div class="spacer-container">
          <slot name="spacer"></slot>
        </div>

        <div class="special-entry" @click="enterGame"></div>
        <div class="special-btns">
          <div class="special-btns-item" v-for="(item,index) in renderList" :key="item.id" @click="changeSelectIndex(index)">
            <img class="icon" :src="require(`./img/icon_${currentSelectIndex === index ? item.depotCode.toLowerCase() + '_active': item.depotCode.toLowerCase()  }.png`)" alt="">
            <div class="title">{{item.title}}</div>
            <GameStatausIcon :isTry="item.isTry" :availableWh="item.availableWh"></GameStatausIcon>
          </div>
        </div>
      </div>
      <template>
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<script>

import GameStatausIcon from '../GameStatusIcon/GameStatausIcon.vue';
export default {
  name: "SpecialLayout",
  components: {
    GameStatausIcon,
  },
  props: {
    currentSelectIndex: Number,
    renderList: Array
  },
  methods: {
    changeSelectIndex (index) {
      this.$emit('update:currentSelectIndex', index);
    },
    //- 点击按钮进入游戏
    enterGame () {
      this.$emit('enterGame', this.renderData)
    }
  },
  computed: {
    renderData () {
      return this.renderList[this.currentSelectIndex];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "SpecialLayout.scss";
</style>