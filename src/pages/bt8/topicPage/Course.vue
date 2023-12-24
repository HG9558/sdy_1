<template>
	<div class="topicPage-courseWrapper">
		<div v-for="item in data" :key="item.id" class="topicPage-courseGroup">
			<div class="topicPage-courseGroupTitle">
				{{item.round}}
			</div>

			<el-row v-if="item.matchList.length" :gutter="15">
				<el-col v-for="team in item.matchList" :key="team.id" :span="8">
					<div class="topicPage-courseGroupItem" :class="{ 'topicPage-courseGroupItem__disabled': team.matchState === '4' }">
						<div class="topicPage-courseGroupLeft">
							<div class="topicPage-courseGroupItemTeam">
								<img :src="team.homeLogo" alt="">
								<span>{{team.home}}</span>
							</div>
							<div class="topicPage-courseGroupItemTeam">
								<img :src="team.awayLogo" alt="">
								<span>{{team.away}}</span>
							</div>
						</div>

						<!--  0未开始，2 正在直播 4 结束      -->
						<div v-if="team.matchState !== '0'" class="topicPage-courseGroupCenter">
							<div class="topicPage-courseGroupScope">{{team.homeScore}}：{{team.awayScore}}</div>
							<div v-if="team.matchState === '2'" @click="handleToMatch(team)" class="topicPage-courseGroupPlayer">
								<i></i>
								直播中
							</div>
							<div v-if="team.matchState === '4'">已结束</div>
						</div>

						<div class="topicPage-courseGroupDate">
							<div>{{getMatchTime(team.matchTime, 0)}}</div>
							<div>{{getMatchTime(team.matchTime, 1)}}</div>
						</div>
					</div>
				</el-col>
			</el-row>
      <div v-else class="topicPage-courseGroupEmpty"></div>

		</div>
	</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      activeId: 0,
    }
  },
  methods: {
    getMatchTime(matchTime, type) {
      const temp = matchTime.split(' ')
      if (type === 0) {
        return temp[0].slice(5)
      }
      return temp[1].slice(0, -3)
    },
		handleToMatch(data) {
			if (data.eventInfo) {
				this.$router.push('/').then(() => {
					this.$root.$emit('change-match', data.eventInfo)
				})
			} else {
				this.$message.error(`直播数据获取出错！`)
			}
    }
  },
}
</script>

<style lang="scss" scoped>
  .topicPage-courseWrapper {
    font-size: 14px;
    color: $c-f;
    .topicPage-courseGroup {
      .topicPage-courseGroupTitle {
				margin-top: 40px;
				margin-bottom: 20px;
				font-size: 24px;
        text-align: center;
      }
			.el-col  {
				margin-bottom: 20px;
			}
      .topicPage-courseGroupItem {
				padding: 20px 10px;
        position: relative;
        display: flex;
        align-items: center;
        background: #3D4154;
        box-shadow: 0 4px 5px 0 rgba(0, 14, 20, 0.4);
        border-radius: 5px;
        color: $bg-bc;
        &:last-child {
          margin-bottom: 0;
        }
        &.topicPage-courseGroupItem__disabled {
          background: #646464;
        }
        .topicPage-courseGroupLeft {
					width: 120px;
        }
        .topicPage-courseGroupItemTeam {
          display: flex;
          align-items: center;
          color: $c-f;
					img {
						display: block;
						margin-right: 10px;
						width: 40px;
						height: 40px;
						border-radius: 50%;
					}
          &:first-child {
            margin-bottom: 20px;
          }
        }
        .topicPage-courseGroupCenter {
          margin-left: 20px;
          text-align: center;
					color: $bg-bc;
          .topicPage-courseGroupScope {
						margin-bottom: 10px;
						font-size: 30px;
            font-weight: 600;
						color: $c-f;
					}
          .topicPage-courseGroupPlayer {
						cursor: pointer;
            margin: 0 auto;
						width: 80px;
						height: 26px;
						background: #34A0E4;
						border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
						color: $c-f;
            i {
              margin-right: 5px;
							width: 16px;
							height: 15px;
              background: url("./images/player.png") no-repeat center center;
              background-size: contain;
            }
          }
        }
        .topicPage-courseGroupDate {
					padding-right: 30px;
          margin-left: auto;
          text-align: center;
					line-height: 24px;
					color: $bg-bc;
          &::before {
            position: absolute;
            top: 50%;
            right: 120px;
            transform: translateY(-50%);
            content: '';
            width: 1px;
            height: 50px;
            background: #c8c8c8;
          }
        }
      }
      .topicPage-courseGroupEmpty {
        margin-bottom: 20px;
        height: 140px;
        background: url("./images/empty.jpg") no-repeat center center;
        background-size: cover;
        border-radius: 5px;
        box-shadow: 0 4px 5px 0 rgba(0, 14, 20, 0.4);
      }
    }
  }
</style>
