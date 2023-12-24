<template>
  <div class="icon-container" :class="{ 'inGamePage': inGamePage }">
    <div v-if="isTry === 1 && availableWh === 1 && !isLogin"  class="status try">
      <i></i>
      <span>{{$t('可试玩')}}</span>
    </div>
    <div v-if="availableWh === 2" class="status maintenance">
      <i></i>
      <span>{{$t('维护中')}}</span>
    </div>
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
		inGamePage: {
			type: Boolean,
			default () {
				return false
			},
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
  bottom: 0;
  .status {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-width: 54px;
    height: 20px;
    line-height: normal;
    padding: 6px;
    border: 0.6px solid #F8F9FD;
    border-radius: 13px 2px;
		&:last-child{
			transform: translateX(60%);
		}
		&:first-child{
			transform: translateX(-50%);
		}
		&.maintenance {
			i {
				background: url("./images/maintenance.png") no-repeat center center;
				background-size: 100% 100%;
			}
		}
		i {
			margin-right: 3px;
			width: 12px;
			height: 12px;
			background: url("./images/try.png") no-repeat center center;
			background-size: 100% 100%;
		}
		span {
			display: block;
			font-weight: 500;
			font-size: 10px;
			color: #F8F9FD;
			white-space: nowrap;
		}
  }
	&.inGamePage .status{
		position: unset;
		transform: unset;
		border-color: #505679;
		&:first-child {
			margin-bottom: 5px;
		}
		span {
			color: #505679;
		}
		i {
			background: url("./images/try-2.png") no-repeat center center;
			background-size: 100% 100%;
		}
		&.maintenance {
			i {
				background: url("./images/maintenance-2.png") no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
}
</style>
