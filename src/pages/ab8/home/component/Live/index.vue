<template>
  <div class="live-container">
    <div class="center-container">
    <div class="live-tabs">
      <div class="live-tab-item">
        <div class="live-tips-two">
          <span class="match-picture-two"><img src="../../img/match.svg" alt=""></span>
          <span class="tab-directSeeding">直播</span>
        </div>
      <div class="live-tips-two right">
        <span class="match-picture-two"><img src="../../img/match.svg" alt=""></span>
        <span class="tab-directSeeding">赛程</span>
      </div>
      </div>
    </div>
      <HotMatch/>
    </div>
  </div>
</template>

<script>
import HotMatch from './HotMatch.vue'

export default {
  name: 'Live',
  components: {
    HotMatch,
  },
}
</script>

<style lang="scss">
@import "../../css/live.scss";
</style>
