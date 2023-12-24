<template>
	<div class="red-envelope-record-container">
		<div class="record-content">
			<div v-if="redEnvelopeRecordList">
				<div class="record-title">
					<!-- {{ currentHour}}:00 红包雨已结束，发出{{
						maxCount
					}}封，领取{{ applyCount }}封，总金额{{ applyAmount }}元 -->
					<div class="record-title-one text-gradient">{{ $t('正点红包雨来袭，名额有限') }}</div>
					<div class="record-title-two text-gradient">
						{{ $t('敬请期待:') }}<span>{{ currentHour == 23 ? '00' : currentHour + 1 }}:00</span>
						{{ $t('红包雨活动') }}
					</div>
				</div>
				<!-- <div class="record-f-title">
					敬请期待：{{ currentHour == 23 ? '00' : currentHour + 1 }}:00
					红包雨活动
				</div> -->
				<div class="record-names">{{ $t('中奖名单') }}</div>
				<div class="record-list">
					<table class="record-table">
						<tr>
							<th>{{ $t('序号') }}</th>
							<th>{{ $t('会员账号') }}</th>
							<th>{{ $t('金额') }}</th>
						</tr>
						<tr v-for="(item, index) in redEnvelopeRecordList" :key="index">
							<td>{{ index + 1 }}</td>
							<td>{{ item.loginName }}</td>
							<td>{{ item.amount }}</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="no-data" v-else>{{ $t('暂无数据') }}</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'redEnvelopeRecord',
		data() {
			return {
				redEnvelopeRecordList: null,
				applyCount: 0,
				maxCount: 0,
				applyAmount: 0,
				currentHour:1
			};
		},
		computed: {
			...mapState({
				newRedEnvelopeState: state => state.discount.newRedEnvelopeState,
			}),
		},
		watch: {
			SToken: {
				immediate: true,
				handler(val) {
					if(val) {
						this._getRedEnvelopeActivityTimeInfo();
						this.openRedEnvelopeRecord()
					}
				},
			},
		},
		methods: {
			async openRedEnvelopeRecord() {
				let res = await this.$http.redEnvelopeRecord();
				if (res.data.code) {
					this.messageTip({ message: res.msg || res.data.msg });
					return;
				}

				const recordRes = res.data.data;
				this.applyCount = recordRes.applyCount;
				this.maxCount = recordRes.maxCount;
				this.applyAmount = recordRes.applyAmount;
				this.redEnvelopeRecordList = recordRes.newRedEnvelopeRewardDtoList.map(item => {
					item.loginName = item.loginName.substring(0, item.loginName.length - 4);
					item.loginName += '****';
					return item;
				});
			},
			async _getRedEnvelopeActivityTimeInfo() {
				const { data } = await this.$http.getRedEnvelopeActivityTimeInfo();
				if (data.code) return;
				const {timestamp} = data.data;
				this.currentHour = new Date(timestamp*1000).getHours();
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import './css/redEnvelopeRecord.scss';
</style>
