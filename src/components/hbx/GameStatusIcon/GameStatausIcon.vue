<template>
  <div class="icon-container">
    <img :class="['status', {'big' : hasIcon}]" v-if="isTry === 1 && availableWh === 1 && !isLogin" :src="require(`../Header/img/menu/sw${hasIcon===true?'_big':''}.png`)" alt="" />
    <img :class="['status', {'big' : hasIcon}]" v-if="availableWh === 2" :src="require(`../Header/img/menu/wh${hasIcon===true?'_big':''}.png`)" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "GameStatausIcon",
  props: {
    isTry: {
      type: Number,
      default: -1,
    },
    availableWh: {
      type: Number,
      default: -1,
    },
    hasIcon: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    ...mapState({ isLogin: state => state.user.token }),
  }
}
</script>

<style lang="scss" scoped>
.icon-container {
  margin-top: 10px;
  img {
    width: 54px;
    height: 20px;
  }
}
</style>