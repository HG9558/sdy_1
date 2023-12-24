<template>
	<div class="topicPage-scopeWrapper">
		<div v-for="item in data" :key="item.id" class="topicPage-scopeGroup">
			<p class="topicPage-scopeGroupTitle">{{item.group}}</p>
			<div class="topicPage-scopeGroupDesc">
				<span>场次</span>
				<span>胜</span>
				<span>平</span>
				<span>负</span>
				<span>进球</span>
				<span>失球</span>
				<span>净胜</span>
				<span>积分</span>
			</div>
			<div v-for="team in item.scoreList" :key="team.id" class="topicPage-scopeGroupItem">
				<span>{{team.rank}}</span>
				<div class="topicPage-scopeGroupItemTeamInfo">
					<img :src="team.teamLogo" alt="">
					<span>{{team.teamName}}</span>
				</div>
				<div class="topicPage-scopeGroupItemScopes">
					<span>{{team.totalCount}}</span>
					<span>{{team.win}}</span>
					<span>{{team.draw}}</span>
					<span>{{team.lose}}</span>
					<span>{{team.goalNum}}</span>
					<span>{{team.loseNum}}</span>
					<span>{{team.goalDifference}}</span>
					<span>{{team.integral}}</span>
				</div>
			</div>
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
}
</script>

<style lang="scss" scoped>
  .topicPage-scopeWrapper {
		margin-bottom: 30px;
    padding: 0 10px;
    background: #3D4154;
		box-shadow: 0 8px 24px 0 rgba(0, 14, 20, 0.16);
    border-radius: 5px;
		font-size: 14px;
    color: $c-f;
    .topicPage-scopeGroup {
      padding-top: 15px;
      .topicPage-scopeGroupTitle {
				font-size: 24px;
        text-align: center;
      }
      .topicPage-scopeGroupDesc {
        margin-left: auto;
        display: flex;
        width: 400px;
        color: #3688C0;
        span {
					flex: 1;
					text-align: center;
        }
      }
      .topicPage-scopeGroupItem {
        display: flex;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #5D6172;
        &:last-child {
          border-bottom: 0;
        }
        .topicPage-scopeGroupItemTeamInfo {
          margin-left: 20px;
          display: flex;
          align-items: center;
          img {
						margin-right: 20px;
						width: 30px;
						height: 30px;
						border-radius: 50%;
					}
        }
        .topicPage-scopeGroupItemScopes {
          margin-left: auto;
          width: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            flex: 1;
            text-align: center;
          }
        }
      }
    }
  }
</style>
