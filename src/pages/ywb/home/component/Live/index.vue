<template>
<div class="bg">
  <div class="live-container">
    <!-- <img class="right_bg" src="../../img/live/right_bg.png" alt=""> -->
    <div class="live-tabs">
      <div class="live-tab-item">
        <div class="live-tips-two">
          <span class="match-picture-two">
            <img src="../../img/saicheng.png" alt="">
          </span>
          <span class="tab-directSeeding">{{$t('直播')}}</span>
        </div>
      <div class="live-tips-two right">
        <span class="match-picture-two"><img src="../../img/saicheng.png" alt=""></span>
        <span class="tab-directSeeding">{{$t('赛程')}}</span>
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
@import "../../css/live.scss"
</style>
