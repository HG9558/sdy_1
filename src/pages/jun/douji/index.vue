<template>
  <special-layout
      v-if="renderList.length"
      type="sport"
      :renderList="renderList"
      :currentSelectIndex.sync="currentSelectIndex"
      @enterGame="_enterGame($event)">
    <img
        class="sport-main-pic"
        :src="require(`./img/${renderList[currentSelectIndex].depotCode.toLowerCase()}.png`)"
        alt="" />
  </special-layout>
</template>

<script>
import SpecialLayout from 'commonComponent/SpecialLayout/SpecialLayout.vue';
import { mapState } from 'vuex';
import playGameMixin from '../../../common/mixin/playGameMixin';
export default {
  name: 'physical',
  mixins: [playGameMixin],
  components: {
    SpecialLayout,
  },
  watch: {
    sport: {
      immediate: true,
      handler(val) {
        if (!val.length) {
          this.$router.replace('/');
        }
      },
    },
  },
  data() {
    return {
      sloginsData: {
        DSCF: 'ds88 game',
        SAB: 'sabong game',
      },
      currentSelectIndex: 0,
    };
  },
  computed: {
    ...mapState({
      sport: state => state.game.douji,
    }),
    renderList() {
      if (!this.sport.length) {
        return [];
      }
      return JSON.parse(JSON.stringify(this.sport)).map(item => {
        item.sloginsData = this.sloginsData[item.depotCode];
        return item;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.sport-main-pic {
  width: 590px;
  position: relative;
  top: 65px;
}
</style>

