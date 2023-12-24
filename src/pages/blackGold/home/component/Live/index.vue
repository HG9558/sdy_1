<template>
  <div class="live-container">
    <div class="live-tabs">
      <div class="live-tab-item active">
        <div class="live-tips-two">
          <span class="tab-directSeeding">{{$t('直播')}}</span>
        </div>
        <div class="live-tips-two right">
          <span class="tab-directSeeding">{{$t('赛程')}}</span>
        </div>
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
