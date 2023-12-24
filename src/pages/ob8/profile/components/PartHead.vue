<template>
  <div class="content-title" :style={...styleData}>
    <div @click="$emit('changeUrl')" class="title" v-if="title">
      <slot></slot>
      {{title}}
      <slot name="bank"></slot>
    </div>
    <img class="en-title" src="../img/profile/title_en.png" alt="">
  </div>
</template>

<script>
export default {
  name: "PartHead",
  props: {
    title: String,
    styleData: {
      type: String,
      default: '72px'
    },
  }
}
</script>

<style scoped lang="scss">
.content-title {
  margin-bottom: 20px;
  border-bottom: 1.2px solid $bg-926;
  box-shadow: 0px 1px 0px $c-f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  .title {
    font-size: 16px;
    color: $c-84;
    font-weight: 500;
    cursor: pointer;
  }
  .en-title {
    width: 445px;
  }
}
</style>