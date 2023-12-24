<template>
	<div class="vipinfo">
		<div class="vipinfo-top middle" v-if="isShowVipList">
			<el-carousel type="card" :initial-index="nowInitialIndex" arrow="never" indicator-position="none" :autoplay="false" height="211px">
				<el-carousel-item :class="`v-${index}`" v-for="(item, index) in activityLevelList.slice(1, 11)" :key="index" :style="{
            backgroundImage: 'url(' + getBannerBG(index) + ')',
            backgroundRepeat: 'round',
            borderRadius: '15px',
          }">
					<div class="header-left">
						<div class="header-left-bottom">
							<div>{{ item.depositMin }}</div>
							<div>{{ item.validbetMin }}</div>
							<div>{{ item.downgradeBet }}</div>
						</div>
						<div class="downgrade-day">({{ downgradePromotionDay }}个月)</div>
					</div>
				</el-carousel-item>
			</el-carousel>

			<div class="vipinfo-title">VIP返水比例</div>
			<div class="vipinfo-inner-thead vipinfo-inner">
				<span class="vipinfo-inner-level">VIP等级</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in vipList" :key="index">{{ item }}</span>
			</div>
			<div v-if="showTiyu" class="vipinfo-inner">
				<span class="vipinfo-inner-level">体育返水</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in tiyu" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
			</div>
			<div v-if="showZr" class="vipinfo-inner">
				<span class="vipinfo-inner-level">真人返水</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in zr" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
			</div>
			<div v-if="showQipai" class="vipinfo-inner">
				<span class="vipinfo-inner-level">棋牌返水</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in qipai" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
			</div>
			<div v-if="showDj" class="vipinfo-inner">
				<span class="vipinfo-inner-level">电竞返水</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in dj" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
			</div>
			<div v-if="showDy" class="vipinfo-inner">
				<span class="vipinfo-inner-level">电子返水</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in dy" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
			</div>
			<div v-if="showBuyu" class="vipinfo-inner">
				<span class="vipinfo-inner-level">捕鱼返水</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in buyu" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
			</div>
			<div v-if="showCp" class="vipinfo-inner">
				<span class="vipinfo-inner-level">彩票返水</span>
				<span class="vipinfo-inner-level" v-for="(item, index) in caip" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
			</div>
		</div>
		<div class="vipinfo-top">
			<div class="rule-title">活动的一般条款与规则</div>
			<div class="vipinfo-word">
				1.晋升标准:
				会员的累计存款以及累计流水达到相应级别的要求，即可在次日凌晨02:00后晋级相应的VIP等级。
			</div>
			<div class="vipinfo-word">
				2.晋升顺序: VIP等级达到相应的要求会自动升级，但VIP等级不可越级晋升。
			</div>
			<div class="vipinfo-word">
				3.保级要求:
				会员在达到某VIP等级后，90天内的存款及流水需要完成保级要求。如果在此期间完成晋升，保级要求重新按照晋升后的等级计算。
			</div>
			<div class="vipinfo-word">
				4.降级标准:
				如果会员在一个季度（90天计算）内没有完成相应的保级要求，系统会自动降一个等级，相应的返水及其它优惠也会随之调整至降级后的标准。
			</div>
			<div class="vipinfo-word">
				5.每月红包:
				会员在上个月有过至少1次大于或等于每月红包金额的存款，即可在当月1号获得当前相应VIP等级的每月红包彩金。（每月红包彩金1倍流水即可提款）。
			</div>
			<div class="vipinfo-word">
				6.生日礼金:
				会员在注册三个月内过生日，今年将不能领取生日礼金；注册时间大于三个月的会员需在生日当天的VIP页面进行自助领取，每年可领取一次（生日彩金1倍流水即可提款）。
			</div>
			<div class="vipinfo-word">
				7.豪礼赠送:
				达到相应等级的VIP会员可联系在线客服进行申请，礼品不能折算为现金，每个级别的名贵礼品每位会员仅能获得1次。澳世娱乐城对名贵礼品拥有最终解释权。（名贵礼品领取资格仅开放给VIP6/VIP7/VIP8/VIP9/VIP10的会员）
			</div>
			<div class="vipinfo-word">
				8.专属优惠:
				专属优惠可在VIP页面自助领取，此优惠不与平台其他优惠共享，仅与返水优惠共享；每个等级的VIP专属优惠仅支持指定场馆游戏，若未在指定场馆游戏，将扣除赠送金额及相应返水。
			</div>
			<div class="vipinfo-word">
				9.升级礼金:
				升级礼金在会员达到升级条件后由系统自动派发，每个级别的升级礼金每位会员仅能获得1次。每日凌晨02:00后派发前日参与投注存款升级的会员。（升级礼金1倍流水即可提款）
			</div>
			<div class="vipinfo-word">
				10.每日返水将会在次日下午14:00后发放。
				<br /><br /><br />
				注：澳世娱乐城保留对活动的修改，中止及最终解释权。
			</div>
		</div>

		<div class="un-return-watter-container">
			<div class="watter-title">不返水列表</div>
			<div class="vipinfo-list">
				<div class="table-header">
					<div class="thead">
						游戏平台
					</div>
					<div class="thead">
						游戏
					</div>
				</div>
				<div class="table-body">
					<div class="vipinfo-list-word" v-for="(item, index) in getGameListWithoutRebateList" :key="index">
						<div class="item-title">{{ item.depotName }}</div>
						<div class="item">
              <span v-for="(childList, ind) in item.gameList" :key="ind">
                {{
                  ind !== item.gameList.length - 1
                    ? childList.gameName + ","
                    : childList.gameName
                }}
              </span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "VipInfo",
		watch: {
			SToken: {
				immediate: true,
				handler (val) {
					val && this.init()
				}
			}
		},
		data () {
			return {
				isShowVipList: true,
				vipData: [],
				vipList: [
					"VIP0",
					"VIP1",
					"VIP2",
					"VIP3",
					"VIP4",
					"VIP5",
					"VIP6",
					"VIP7",
					"VIP8",
					"VIP9",
					"VIP10",
				],
				buyu: [],
				tiyu: [],
				zr: [],
				dy: [],
				qipai: [],
				dj: [],
				caip: [],
				activityLevelList: [],
				showBuyu: true,
				showTiyu: true,
				showZr: true,
				showDy: true,
				showQipai: true,
				showDj: true,
				showCp: true,
				getGameListWithoutRebateList: [],
			};
		},
		computed: {
			nowInitialIndex () {
				if (this.userInfo.mbrLevel === 0) {
					return 0;
				}
				return Number(this.userInfo.mbrLevel - 1);
			},
		},
		methods: {
			init () {
				this.$http.getGameListWithoutRebate().then((res) => {
					if (res.data.code === 0) {
						this.getGameListWithoutRebateList = res.data.data;
					}
				});
				this.$http.getVipInfo().then((res) => {
					if (res.data.code === 0) {
						this.vipData = res.data.data;
						const levelData = this.vipData.activityLevelCatDtos;
						this.activityLevelList = this.vipData.activityLevelList;
						this.downgradePromotionDay = (
							this.vipData.downgradePromotionDay / 30
						).toFixed();
						this.tiyu = levelData.filter((item) => {
							return item.catName === "体育";
						});
						this.zr = levelData.filter((item) => {
							return item.catName === "真人";
						});
						this.dy = levelData.filter((item) => {
							return item.catName === "电子";
						});
						this.qipai = levelData.filter((item) => {
							return item.catName === "棋牌";
						});
						this.buyu = levelData.filter((item) => {
							return item.catName === "捕鱼";
						});
						this.dj = levelData.filter((item) => {
							return item.catName === "电竞";
						});
						this.caip = levelData.filter((item) => {
							return item.catName === "彩票";
						});

						this.showBuyu = this.buyu.some((item) => item.donateRatio !== 0);
						this.showTiyu = this.tiyu.some((item) => item.donateRatio !== 0);
						this.showZr = this.zr.some((item) => item.donateRatio !== 0);
						this.showDy = this.dy.some((item) => item.donateRatio !== 0);
						this.showQipai = this.qipai.some((item) => item.donateRatio !== 0);
						this.showDj = this.dj.some((item) => item.donateRatio !== 0);
						this.showCp = this.caip.some((item) => item.donateRatio !== 0);

						if (
							this.buyu.length !== 11 ||
							this.tiyu.length !== 11 ||
							this.zr.length !== 11 ||
							this.dy.length !== 11 ||
							this.qipai.length !== 11 ||
							this.dj.length !== 11 ||
							this.caip.length !== 11
						) {
							this.buyu.length = 11;
							this.tiyu.length = 11;
							this.zr.length = 11;
							this.dy.length = 11;
							this.qipai.length = 11;
							this.dj.length = 11;
							this.caip.length = 11;
						}
					}
				});
			},
			getBannerBG (index) {
				return require(`./img/V${index + 1}.png`);
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import "./css/index.scss";
</style>
