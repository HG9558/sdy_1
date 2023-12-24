<template>
  <div class="specialEnterGame-wrap">
		<div class="specialEnterGame-box">
			<div class="specialEnterGame-header">
				<i @click="$router.go(-1)"></i>
				<span @click="$router.go(-1)">{{ gameData.depotName }}</span>
			</div>

			<Loading v-if="showLoading" :showLoading="showLoading" />
			<div v-else class="specialEnterGame-content">
				<div class="specialEnterGame-desc">
					<p>{{ $t('游戏登录说明：') }}</p>
					<p>{{ $t('尊敬的玩家，如果您想玩这款游戏，请先下载指定游戏APP端，安装完成后扫码登录游戏！') }}</p>
					<p>{{ $t('注：进入页面时系统已自动把余额转入该游戏钱包，离开该页面前请点击下方全部转出或前往个人中心进行转出余额操作。') }}</p>
				</div>
				<div class="specialEnterGame-actions">
					<div v-if="showNoData" class="specialEnterGame-noData">{{ $t('加载游戏数据失败!') }}</div>
					<div v-else class="actions-left">
						<div style="display: flex">
							<div class="actions-code-box">
								<div class="actions-label">{{ $t('扫描二维码下载：') }}</div>
								<QrCode class="actions-code" :codeUrl="gameInfo.download" :codeSize="300" :logoSrc="null" />
							</div>
							<div class="actions-code-box">
								<div class="actions-label">{{ $t('扫码登录游戏：') }}</div>
								<QrCode class="actions-code" :codeUrl="transferPageUrl" :codeSize="600" :logoSrc="null" />
							</div>
						</div>
						<div class="actions-transfer">
							<div class="actions-label">{{ $t('快速转账通道') }}：</div>
							<el-button @click="handleRecover" :loading="loadingButton" plain class="transfer-button">{{ $t('全部转出') }}</el-button>
						</div>
					</div>
					<div class="actions-right">
						<div class="actions-label">{{ $t('安装说明：') }}</div>
						<i v-if="carouselIndex > 0" @click="handleChangeCarousel('reduce')" class="carousel-arrow left"></i>
						<i v-if="carouselIndex !== 7" @click="handleChangeCarousel('add')" class="carousel-arrow right"></i>
						<el-carousel ref="carousel" :initial-index="carouselIndex" arrow="never" :autoplay="false" :loop="false" indicator-position="none" class="actions-slide">
							<el-carousel-item v-for="item in 8" :key="item">
								<img :src="getImg(item)" alt="" />
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	import QrCode from 'commonComponent/QrCode'
	import { mapActions, mapState } from "vuex"
	import siteImgMap from '@/configs/siteImgMap'

	export default {
		components: {
			QrCode,
		},
		data() {
			return {
				siteImgMap,
				gameInfo: {},
				transferPageUrl: '',
				loadingButton: false,
				showLoading: true,
				showNoData: false,
				carouselIndex: 0,
			}
		},
		computed: {
			...mapState({
				token: state => state.user.token,
				language: state => state.global.language,
			}),
			gameData() {
				return this.$route.query
			},
		},
		methods: {
			...mapActions('user', ['_getCenterMoney']),
			handleChangeCarousel(type) {
				if (type === 'add') {
					if (this.carouselIndex === 7) return
					this.carouselIndex += 1
					this.$refs.carousel.setActiveItem(this.carouselIndex)
				} else {
					if (this.carouselIndex === 0) return
					this.carouselIndex -= 1
					this.$refs.carousel.setActiveItem(this.carouselIndex)
				}
			},
			getImg(i) {
				try {
					if (this.language === 'zh') {
						return require(`./images/slide/${i}.png`)
					}
					return require(`./images/slide/${i}_en.png`)
				} catch (e) {
					return null
				}
			},
			//- 进入游戏后检测
			async checkError (tryPlayFlag, code, errMsg, msg) {
				return new Promise((resolve, reject) => {
					switch (true) {
						case code !== 0:
							reject();
							break;
						case !this.token && !tryPlayFlag:
							this.messageTip({ message: errMsg });
							reject();
							break;
						default:
							resolve();
					}
				})
			},
			async transitGame() {
				try {
					console.log('this.gameData===', this.gameData)
					const { id } = this.gameData
					if (!id) {
						this.showLoading = false
						this.showNoData = true
						return
					}
					const { data: { code, tryPlayFlag, errMsg, msg } } = await (this.token ? this.$http.getTransitList({ gameId: id }) : this.$http.getTryAddress({ gameId: id }))
					await this.checkError(tryPlayFlag, code, errMsg, msg)
					this.token && this._getCenterMoney()
					this.gameInfo = JSON.parse(msg) || {}

					const { depotCode } = this.gameData

					const { bindUrl, url, androidUrl, iosUrl } = this.gameInfo

					if (depotCode === 'ME') {
						this.transferPageUrl = url
					} else {
						// const newGameInfo = { androidUrl, iosUrl }
						const appGameUrlStr = JSON.stringify(this.gameInfo)
						console.log('appGameUrlStr===', appGameUrlStr)
	
						const encodeUrlStr = encodeURIComponent(`info=${appGameUrlStr}`)
						console.log('encodeStr===', encodeUrlStr)
	
						this.transferPageUrl = `${bindUrl}?${encodeUrlStr}`
						console.log('this.transferPageUrl===', this.transferPageUrl)
					}

					this.showLoading = false
				} catch (e) {
					this.showLoading = false
					this.showNoData = true
				}
			},
			async handleRecover() {
				this.loadingButton = true
				try {
					await this.$http.getRecover();
					this._getCenterMoney()
					this.loadingButton = false
				} catch (e) {
					this.loadingButton = false
				}
			},
		},
		mounted() {
			this.transitGame()
		},
	}
</script>

<style lang="scss" scoped>
	.specialEnterGame-wrap {
		padding-top: 132px;
		height: 800px;
		background-image: url('./images/main-bg.png');
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #C1C2C4;
		.specialEnterGame-box {
			background: rgba(40, 41, 47, 0.8);
			backdrop-filter: blur(2px);
			border-radius: 10px;
			height: 690px;
			width: 940px;
			padding: 0 30px;
			box-sizing: border-box;
			.specialEnterGame-header {
				display: flex;
				align-items: center;
				height: 70px;
				font-weight: 400;
				font-size: 18px;
				color: #D3C294;
				border-bottom: 1.2px solid #393A42;
				i {
					width: 30px;
					height: 21px;
					background: url("./images/back_icon.png") no-repeat center center;
					background-size: 100% 100%;
					cursor: pointer;
				}
				span {
					padding-left: 20px;
					cursor: pointer;
				}
			}
			.specialEnterGame-content {
				padding: 30px 105px 0;
				.specialEnterGame-desc {
					line-height: 20px;
					p {
						&:first-child {
							margin-bottom: 20px;
							color: #D3C294;
						}
						&:last-child {
							margin-top: 5px;
							color: #F44949;
						}
					}
				}
				.specialEnterGame-actions {
					margin-top: 30px;
					display: flex;
					justify-content: space-between;
					.actions-label {
						margin-bottom: 30px;
						color: #D3C294;
					}
					.actions-left {
						.actions-code-box {
							margin-right: 50px;
							.actions-code {
								margin-left: 45px;
								// width: 130px;
								// height: 130px;
								background: #ffffff;
								border-radius: 10px;
								/deep/ .code-main {
									background: none;
								}
								/deep/ img {
									width: 150px;
									height: 150px;
								}
							}
						}
						.actions-transfer {
							margin-top: 30px;
							.transfer-button {
								display: inline-block;
								margin-left: 100px;
								padding: 0 32px;
								height: 30px;
								line-height: 30px;
								border-radius: 6px;
								border: 1px solid #C1C2C4;
								background: transparent;
								color: #C1C2C4;
							}
						}
					}
					.actions-right {
						position: relative;
						.carousel-arrow {
							position: absolute;
							width: 14px;
							height: 20px;
							cursor: pointer;
							background: url("./images/arrow.png") no-repeat center center;
							background-size: 100% 100%;
							&.left {
								left: 0;
								top: 50%;
								transform: translateY(-50%) rotate(-180deg);
							}
							&.right {
								right: -60px;
								top: 50%;
								transform: translateY(-50%);
							}
						}
						.actions-slide {
							margin-left: 60px;
							width: 180px;
							border-radius: 10px;
							/deep/ .el-carousel__arrow {
								background-color: rgba(31,45,61,.2);
								&:hover {
									background-color: rgba(31,45,61,.5);
								}
								i {
									color: #D3C294;
									font-weight: bold;
								}
							}
							img {
								width: 180px;
								height: 300px;
							}
						}
					}
				}
			}
			.specialEnterGame-noData {
				padding-left: 50px;
				padding-top: 100px;
				font-size: 18px;
				text-align: center;
			}
		}
	}
</style>
