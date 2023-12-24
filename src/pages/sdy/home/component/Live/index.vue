<template>
  <div class="live-container">
    <div class="live-header">
      <div class="live-tabs">
        <div class="live-tab-item active" @click="tabIndex = index">
          <img class="nav-icon" src="require(../../img/live_active.png)" alt="">
          <span class="nav-text">直播</span>
        </div>
      </div>
      <div class="live-tips">
        <span class="match-text">赛程</span>
      </div>
    </div>

    <HotMatch/>
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
