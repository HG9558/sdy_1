<template>
	<div class="header-top-bar">
		<div class="header-top-bar-container">
			<div class="header-top-bar-left">
				<div class="header-top-bar-left-select">
					<el-select
						v-model="activeLanguage" size="small"
						:popper-append-to-body="false"
						@change="handleChangeLanguage"
					>
						<img slot="prefix" :src="getFlagImg(activeLanguage)" alt="">
						<el-option
							v-for="item in languageOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						>
							<img style="float: left" :src="getFlagImg(item.value)" alt="">
							<span style="float: right">{{ item.label }}</span>
						</el-option>
					</el-select>
				</div>

				<template v-if="isLogin">
					<router-link class="header-top-bar-link" to="/profile/deposit">{{$t('存款')}}</router-link>
					<router-link class="header-top-bar-link" to="/profile/withdrawal">{{$t('取款')}}</router-link>
					<router-link class="header-top-bar-link" to="/profile/bettingRecord">{{$t('注单')}}</router-link>
				</template>
			</div>

			<div class="header-top-bar-right">
				<template v-if="isLogin">
					<div class="header-top-bar-balance">
						<span>{{ (centerBalanceMoney > 0 && centerBalanceMoney.toFixed(2)) || "0.00"}}</span>
						<i @click.stop="updateBalance" :class="`el-icon-${isRefresh ? 'loading': 'refresh'} refresh`"></i>
					</div>
					<div @mouseleave="isShowUserDropMeun = false" class="header-top-bar-link user-name">
						<span @click="$router.push('/profile')" @mouseenter="isShowUserDropMeun = true">{{userInfo.loginName || "" }}</span>

						<div :class="`user-drop-menu ${isShowUserDropMeun? 'on':''}`">
							<div class="user-drop-menu_head">
								<div @click="$router.push(item.path)" class="deposit-cls" v-for="(item, index) in selectList" :key="index" @mouseenter="currentSelectIndex=index" @mouseleave="currentSelectIndex=-1">
									<img class="deposit-cls_icon" :src="require( `../img/userOpteration/${currentSelectIndex===index ? item.on_icon:item.icon }`) " />
									<span :class="`${currentSelectIndex===index ? 'font-active' : ''}`">{{ item.val }}</span>
								</div>
							</div>
							<div class="user-drop-menu_content">
								<div @click="$router.push(item.path)" :class="`information-item ${currentContentIndex===index ? 'active' : ''}`" v-for="(item, index) in informationList" :key="index" @mouseenter="currentContentIndex =index" @mouseleave="currentContentIndex=-1">
									<img class="information-item_img" :src=" require(`../img/userOpteration/${currentContentIndex===index ? item.on_icon : item.icon}.png`)" alt="" @mouseleave="currentContentIndex=-1" />
									<span>{{ item.val }}</span>
									<div v-if="item.type=='message' && unMessageCount" class="message-count">
										<span class="message-count_font"> {{unMessageCount}}</span>
									</div>
								</div>
							</div>
							<div @click="_signout" class="user-drop-menu_footer">{{$t('退出登录')}}</div>
						</div>

					</div>
					<div @click="_signout" >{{$t('登出')}}</div>
				</template>
				<template v-else>
					<router-link class="header-top-bar-link" to="/login">{{$t('登录')}}</router-link>
					<router-link class="header-top-bar-link" to="/login/register">{{$t('注册')}}</router-link>
				</template>
				<div class="notice-c" @click="onGoMessageCenter">
          <i class="el-icon-message-solid"></i>
          <span v-show="isLogin && unMessageCount" class="num">{{ unMessageCount }}</span>
          <div v-show="noticeVisible" class="notice-pop">
            <div v-for="(message, index) in messageList" :key="index" v-html="message.textContent" class="pop-item"></div>
          </div>
        </div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import { selectList, informationList } from 'static_data/header_data'
import { languageOptions } from '@/i18n/constants'

export default {
	data() {
		return {
			activeLanguage: '',
			selectList,
			informationList,
			currentSelectIndex: -1,
			currentContentIndex: -1,
			isShowUserDropMeun: false,
			noticeVisible: false,
      noticeTimer: null,
      messageList: [],
		}
	},
	computed: {
		...mapState({
			isLogin: state => state.user.token,
			isRefresh: state => state.user.isRefresh,
			unMessageCount: state => state.user.unMessageCount,
			mailBoxMsg: state => state.user.mailBoxMsg,
		}),
		...mapState('global', ['language']),
		...mapGetters('global', ['isZhLanguage']),
		languageOptions() {
			return languageOptions.map( v => {
				return { ...v,  disabled: false }
			})
		},
	},
	methods: {
		...mapMutations('user', ['clear_user_info', 'set_un_read_message_count']),
		...mapMutations('global', ['change_language']),
		getFlagImg(lang) {
			try {
				const { VUE_APP_APP_SIGN } = process.env
				if (VUE_APP_APP_SIGN === 'ynd') {
					// ynd站点马来语用印尼国旗
					return require(`../img/flag-${ lang === 'ms' ? 'id' : lang }.png`)
				}
				return require(`../img/flag-${lang}.png`)
			} catch (e) {
				return null
			}
		},
		handleChangeLanguage(val) {
			this.change_language(val)
			this.activeLanguage = val
		},
		onGoMessageCenter() {
      this.$router.push({ name: 'message' })
    },
    async _getMessageUnreadCount() {
      const res = await this.$http.getMessageUnread({ msgType: 0 });
      if (res.data.code) return;
      this.set_un_read_message_count(res.data.count);
      const { data } = await this.$http.getMessageInfoList({
        msgType: 0,
        pageNo: 1,
        pageSize: 3,
        isRead: 1,
        mbrIsRead: 1,
      });
      const noticeArr = data.data.list;
      // const message = noticeArr.find(item => item.isRead === 0);
      const messageList = noticeArr.filter(item => item.isRead === 0);
      if (!messageList.length) return
      messageList.forEach(message => {
        if (message && message.textContent) {
          const regExp = /<img.*?\/>/g;
          let result = message.textContent.replace(regExp, '');
          if (result === '<p></p>') { // 截取之后只有空标签  说明只包含图片
            result = '您有新消息！';
          }
          message.textContent = result;
        }
      });
      this.messageList = messageList
      this.noticeVisible = true
      setTimeout(() => {
        this.noticeVisible = false
      }, 10000)
    },
		//- 刷新用户余额
		updateBalance () {
			this._getCenterMoney();
		},
		//- 用户退出
		async _signout () {
			try {
				const res = await this.$http.getLoginOut({ token: this.isLogin, SToken: this.SToken })
				if (res.data.code !== 0) return
				this.clear_user_info();
				(this.$route.name !== "Home") && this.$router.replace("/")
			} catch (e) { console.log() }
		},
	},
	watch: {
		isLogin: {
			immediate: true,
			handler (newToken) {
				if (newToken) {
					const timer = setInterval(() => {
						if (this.SToken) {
							clearInterval(timer);
							this._getCenterMoney()
						}
					}, 300)
					this._getMessageUnreadCount();
					this.noticeTimer = setInterval(() => {
						this._getMessageUnreadCount()
					}, 40000)
				} else {
          window.clearInterval(this.noticeTimer)
        }
			}
		}
	},
	mounted() {
		this.activeLanguage = this.language
		const { VUE_APP_APP_TITLE, VUE_APP_APP_EN_TITLE } = process.env
		if (!this.isZhLanguage) {
			document.title = VUE_APP_APP_EN_TITLE || VUE_APP_APP_TITLE
		}
	},
}
</script>
<style scoped lang="scss">
	.header-top-bar {
		height: 44px;
		line-height: 44px;
		font-size: 16px;
		background: rgba(40, 41, 47, 0.8);
		color: #ceced3;
		.header-top-bar-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 1200px;
			margin: 0 auto;
			position: relative;
			.header-top-bar-left {
				display: flex;
				align-items: center;
				.header-top-bar-left-select {
					display: flex;
					align-items: center;
					position: relative;
					padding: 0 15px;
					cursor: pointer;
					/deep/ {
						.el-select {
							width: 180px;
							img {
								width: 30px;
								height: 30px;
							}
							.el-input__prefix {
								display: flex;
								align-items: center;
							}
							.el-input {
								.el-input__inner {
									padding-left: 50px;
									border: none;
									background: transparent;
									color: #ceced3;
								}
								.el-input__suffix {
									height: 32px;
									.el-select__caret {
										color: #ceced3;
									}
								}
							}
							.el-select-dropdown__item {
								img {
									margin-right: 20px;
								}
							}
						}
					}
					&::before {
						content: '';
						position: absolute;
						top: 50%;
						right: 0;
						transform: translateY(-50%) scaleX(0.5);
						height: 15px;
						width: 2px;
						background: #ceced3;
					}
					&:last-child::before {
						display: none;
					}
					&:first-child {
						padding-left: 0;
					}
				}
			}
			.header-top-bar-right {
				display: flex;
				align-items: center;
				> div {
					position: relative;
					padding: 0 15px;
					cursor: pointer;
					&::before {
						content: '';
						position: absolute;
						top: 50%;
						right: 0;
						transform: translateY(-50%) scaleX(0.5);
						height: 15px;
						width: 2px;
						background: #ceced3;
					}
					&:last-child {
						padding-right: 0;
						&::before {
							display: none;
						}
					}
					&:first-child {
						padding-left: 0;
					}
				}
				.header-top-bar-balance {
					font-weight: 900;
					font-size: 16px;
					i {
						margin-left: 5px;
					}
				}
				.user-name {
					position: relative;
				}
			}
		}
		.header-top-bar-link {
			position: relative;
			padding: 0 15px;
			cursor: pointer;
			color: #ceced3;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%) scaleX(0.5);
				height: 15px;
				width: 2px;
				background: #ceced3;
			}
			&:last-child::before {
				display: none;
			}
			&:first-child {
				padding-left: 0;
			}
		}
		//- 用户下拉菜单
		.user-drop-menu {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 50px;
			opacity: 0;
			width: 172px;
			height: auto;
			background: $c-54;
			color: $ft-f6;
			border-radius: 0 0 16px 16px;
			box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
			display: none;
			z-index: -1;
			&:before {
				content: "";
				width: 0;
				height: 0;
				position: absolute;
				top: -13px;
				left: 72px;
				border-left: 14px solid transparent;
				border-right: 14px solid transparent;
				border-bottom: 14px solid $c-54;
			}
			&.on {
				opacity: 1;
				z-index: 999;
				display: block;
			}
			.user-drop-menu_head {
				height: 83px;
				font-size: 14px;
				line-height: normal;
				color: $c-f;
				padding: 0 10px;
				@include flex();
				.deposit-cls {
					@include flex(center,
						column);
					text-align: center;
					span {
						white-space: nowrap;
					}
					.deposit-cls_icon {
						margin-bottom: 5px;
						width: 30px;
					}
					.font-active {
						color: $c-f;
					}
				}
			}
			.user-drop-menu_content {
				&:before,
				&:after {
					content: "";
					left: 0;
					width: 100%;
					height: 1px;
					background: rgba(255, 255, 255, .2);
					margin: 17px auto;
				}
				&:before {
					margin-top: 0px;
				}
				@include flex(center,
					column);
				font-size: 14px;
				.information-item {
					height: 35px;
					width: 100%;
					padding: 0 17px;
					box-sizing: border-box;
					position: relative;
					@include flex(space-between,
						row,
						center);
					justify-content: flex-start;
					.information-item_img {
						width: 18px;
						margin-right: 8px;
					}
					&.active {
						background: linear-gradient(135.44deg, #E7D7A6 0.76%, #DCBF80 97%);
						color: $c-39;
					}
					&:hover {
						.message-count {
							background-color: red;
							.message-count_font {
								color: $c-f;
							}
						}
					}
					.message-count {
						width: 15px;
						height: 15px;
						border-radius: 50%;
						background: linear-gradient(135.44deg, #E7D7A6 0.76%, #DCBF80 97%);
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: 5px;
						@include flex(center);
						.message-count_font {
							font-size: 12px;
							transform: scale(0.75);
							line-height: 15px;
							color: $c-39;
						}
					}
				}
			}
			.user-drop-menu_footer {
				text-align: center;
				margin-bottom: 11px;
				font-size: 16px;
				line-height: normal;
				font-weight: 600;
				color: $ft-f6;
				background: $c-54;
				&:hover {
					color: $c-f;
				}
			}
		}
	}

	.multi-language {
		.header-top-bar .user-drop-menu {
			width: auto;
			&:before {
				left: 90px;
			}
			.user-drop-menu_head {
				font-size: 12px;
				padding: 0 10px;
				.deposit-cls {
					margin-right: 20px;
					&:last-child {
						margin-right: 0;
					}
				}
			}
			.user-drop-menu_content .information-item {
				padding: 0 20px;
				@include flex(flex-start, row, center);
				.information-item_img {
					margin-right: 12px;
				}
			}
		}
	}
	.notice-c {
				padding: 0 !important;
				margin-left: 15px;
        position: relative;
				margin-top: 5px;
        color: #ceced3;
        .el-icon-message-solid {
            font-size: 25px;
        }
        .num {
            position: absolute;
            right: -6px;
            top: -6px;
            display: block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            color: #fff;
            background-color: red;
            border-radius: 50%;
        }
        .notice-pop {
            position: absolute;
            min-width: 300px;
            // min-height: 100px;
            left: 50%;
            top: 45px;
            z-index: 9999;
            transform: translateX(-50%);
						background: #545666;
						box-shadow: 4px 10px 10px rgba(15, 15, 15, 0.2);
            border-radius: 10px;
            .pop-item {
								padding: 14px;
								color: #fff;
								font-size: 14px;
								line-height: 24px;
								border-bottom: 1px solid #464756;
						}
            &::before {
                content: "";
                display: block;
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: 0px;
                height: 0px;
                border: 11px solid;
                border-color: transparent transparent #545666 transparent;
            }
        }
    }
</style>
