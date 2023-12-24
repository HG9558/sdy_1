<template>
  <div class="icon-container">
    <img class="status" v-if="isTry === 1 && availableWh === 1 && !isLogin" src="../Header/img/menu/sw.png" alt="" />
    <img class="status" v-if="availableWh === 2" src="../Header/img/menu/wh.png" alt="">
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
    }
  },
  computed: {
    ...mapState({ isLogin: state => state.user.token }),
  }
}
</script>

<style lang="scss" scoped>
.icon-container {
  position: absolute;
  right: 34px;
  bottom: 0px;
  .status {
    width: 54px;
  }
}

.sports_saba,
.sports_m8bet {
  .icon-container {
    left: 100px;
    right: auto;
  }
}
</style>