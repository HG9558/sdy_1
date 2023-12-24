<template>
  <div class="exclusive-vip">
    <div class="data-box">
      <div class="header">
        <div class="header-left">
          <div v-if="!birthday.isBirthday" class="normal-show-container">
            <div class="level-bg">
              <span class="level-num">{{vipData.accountLevel}}</span>
            </div>
            <span class="level-txt">当前等级：{{ vipData.tierName }}</span>
          </div>
          <img v-else @click="openBirthday" src="./img/birthday-case.png" />
        </div>
        <div class="header-center">
          <div class="header-line">
            <div class="line-row" v-show="depositMinShow">
              <div class="row-left dark-bg">当前存款</div>
              <div class="row-center">
                <g-progress :percentage="depositMinValue"></g-progress>
              </div>
              <div class="row-right dark-bg">
                <span>￥{{parseInt(vipData.depositAmount)}}
                  <template v-if="vipData.activityLevelList && vipData.accountLevel !== vipData.activityLevelList[vipData.activityLevelList.length - 1].accountLevel">
                    /{{ getValidbet('top') }}
                  </template>
                </span>
              </div>
            </div>
            <div class="line-row" v-show="validbetMinShow">
              <div class="row-left dark-bg">当前流水</div>
              <div class="row-center">
                <g-progress :percentage="validbetMinValue"></g-progress>
              </div>
              <div class="row-right dark-bg">
                <span>￥{{
                    parseInt(vipData.validbet)
                  }}
                  <template v-if="vipData.activityLevelList && vipData.accountLevel !== vipData.activityLevelList[vipData.activityLevelList.length - 1].accountLevel">
                    /{{ getValidbet('bottom') }}
                  </template>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vip-progress">
        <div class="vip-select">
          <div :key="index" class="vip-bar-text" :class="{ 'vip-bar-text-color': vipBarTxtColorIndex === index }" v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" @click="getLevel(item, index)">
            V{{ item }}
          </div>
        </div>
        <div class="progress">
          <g-progress :percentage="nowLevelPercentage" :stroke-width="18"></g-progress>
        </div>
      </div>
    </div>
    <div v-if="
        vipData &&
        vipData.birthdayBonusList &&
        vipData.upgradeBonusLevelDtos &&
        vipData.monthlyBonus
      " class="data-box">
      <div class="box-title">
        <span class="bold">VIP{{ nowVipLevel === 0 ? 1 : nowVipLevel }}</span>尊享
      </div>
      <div class="row text-center">
        <div v-if="vipData.activityLevelList[nowVipLevel === 0 ? 1 : nowVipLevel].feeAvailable === 1" class="col px-0">
          <div class="font-weight-bolder">
            <span>{{vipData.activityLevelList[nowVipLevel === 0 ? 1 : nowVipLevel].withDrawalTimes}}</span>
          </div>
          <div class="ccbcb fs-0-7">
            每日提款次数
          </div>
        </div>
        <div v-if="vipData.activityLevelList[nowVipLevel === 0 ? 1 : nowVipLevel].feeAvailable === 1" class="col px-0">
          <div class="font-weight-bolder">
            <span>{{vipData.activityLevelList[nowVipLevel === 0 ? 1 : nowVipLevel].withDrawalQuota}}</span>
          </div>
          <div class="ccbcb fs-0-7">
            每日提款额度
          </div>
        </div>
        <div class="col px-0">
          <div class="font-weight-bolder ">
            <span>{{
              vipData.upgradeBonusLevelDtos && vipData.upgradeBonusLevelDtos[nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1].donateAmount
            }}</span>
          </div>
          <div class="ccbcb fs-0-7">升级礼金（晋级自动发放）</div>
        </div>
        <div class="col px-0">
          <div class="font-weight-bolder ">
           <span v-if="nowVipLevel===0">0</span>
            <span v-else>{{
              nowVipLevel != 0 && vipData.birthdayBonusList[nowVipLevel - 1].donateAmount
                ? vipData.birthdayBonusList[nowVipLevel - 1].donateAmount ? vipData.birthdayBonusList[nowVipLevel - 1].donateAmount : 0
                : vipData.birthdayBonusList[nowVipLevel ].donateAmount
            }}</span>
          </div>
          <div class="ccbcb fs-0-7">生日礼金</div>
        </div>
        <div class="col px-0">
          <div class="font-weight-bolder ">
            <span>{{
              vipData.monthlyBonus.ruleScopeDtoList[nowVipLevel === 0 ? nowVipLevel: nowVipLevel - 1].donateAmount
            }}</span>
          </div>
          <div class="ccbcb fs-0-7">每月红包（月初自动发放）</div>
        </div>
      </div>
    </div>
    <div class="data-box" v-show="
        vipData.birthdayBonusList !== null &&
        vipData.upgradeBonusLevelDtos !== null &&
        vipData.monthlyBonus !== null
      ">
      <div class="box-title">
        <span class="bold">VIP{{ nowVipLevel === 0 ? 1 : nowVipLevel }}</span>专属优惠
      </div>
      <div class="row text-center border-one" v-if="ruleScopeDtos">
        <div class="col px-0">
          <div class="vip-promote">
            {{
              ruleScopeDtos && ruleScopeDtos[nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1]
                .activityRuleDtos[0].amountMin
            }}
          </div>
          <div class="vip-promote-label">
            <span>最低余额</span>
          </div>
        </div>
        <div class="col px-0">
          <div class="vip-promote ">
            {{
              ruleScopeDtos[nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1]
                .activityRuleDtos[0].donateType === 0
                ? ruleScopeDtos[
                    nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1
                  ].activityRuleDtos[0].donateAmount
                : ruleScopeDtos[nowVipLevel].activityRuleDtos[0].donateAmount
            }}%
          </div>
          <div class="vip-promote-label">
            <span>红利比例</span>
          </div>
        </div>
        <div class="col px-0">
          <div class="vip-promote ">
            {{
              ruleScopeDtos[nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1]
                .activityRuleDtos[0].donateAmountMax
            }}
          </div>
          <div class="vip-promote-label">
            <span>最高奖金</span>
          </div>
        </div>
        <div class="col px-0">
          <div class="vip-promote ">
            {{
              ruleScopeDtos[nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1]
                .activityRuleDtos[0].multipleWater
            }}
          </div>
          <div class="vip-promote-label">
            <span>流水倍数</span>
          </div>
        </div>
        <div class="col px-0">
          <div class="vip-promote ">
            {{
              ruleScopeDtos[nowVipLevel === 0 ? nowVipLevel : nowVipLevel - 1]
                .drawNumber
            }}
          </div>
          <div class="vip-promote-label">
            <span>次数限制</span>
          </div>
        </div>
        <div class="col px-0">
          <div class="vip-promote orange">
            指定场馆
          </div>
          <div class="vip-promote-label">
            <span>游戏场馆</span>
          </div>
        </div>
      </div>
      <div class="row bottom-btn-group">
        <div class="">
          <el-select popper-class="bog" v-model="venueName" placeholder="查看指定场馆">
            <el-option v-for="(item, index) in dataArray" :key="index + '_index'" :label="item.catName" :value="item.catId">
            </el-option>
          </el-select>
        </div>
        <div class="venue">
          <el-button :disabled="buttonShow === 3" v-show="buttonShow === 3" class="bog venue-btn" type="primary">已领取</el-button>
          <el-button :disabled="buttonShow === 0" v-show="buttonShow === 0" class="bog venue-btn" type="primary">已失效</el-button>
          <!-- 4 优惠稽核未通过 灰化的立即领取 -->
          <el-button v-show="buttonShow === 1 || buttonShow === 4" class="bog venue-btn" :type="buttonShow === 1 ? 'primary' : 'info'" :disabled="buttonShow === 4" @click="btnClick">立即领取</el-button>
          <el-button v-show="buttonShow === 2" class="bog venue-btn" type="primary" @click="btnClick">立即存款</el-button>
          <el-button v-show="buttonShow === 9" :disabled="true" class="bog venue-btn" type="primary">等级不符</el-button>
        </div>
      </div>
    </div>
    <div class="data-box" v-show="
        vipData.birthdayBonusList === null &&
        vipData.upgradeBonusLevelDtos === null &&
        vipData.monthlyBonus === null
      ">
      <div class="box-title">
        <span class="bold">VIP{{ nowVipLevel }}</span>晋级优惠
      </div>
      <div class="box-no-data">当前等级没有晋级优惠</div>
      <div class="box-no-data-div">
        <span @click="$router.push('/discount')">更多VIP特权</span>
      </div>
    </div>

    <div v-show="birthdayFlog" class="birthday-mask">
      <img class="birthday-bg" src="./img/birthday-bg.png" alt="" />

      <div class="birthday-inner-box">
        <i @click="birthdayFlog = false" class="close-dialog-btn el-icon-circle-close"></i>
        <div class="birthday-inner">
          <div class="div-color">
            尊敬的 <span class="gold-text">{{ vipData.accountLevel ? vipData.accountLevel : 0 }}级VIP</span> 会员
          </div>
          <div class="div-while">{{ userInfo.loginName }}</div>
          <div class="div-color bless  gold-text">生日快乐！</div>
          <div class="div-while">特为您奉上生日礼金</div>
          <div class="div-color bless">{{ birthday.donateAmount }}元</div>
          <div class="div-while">
            -{{ birthday.multipleWater }}倍流水即可提现-
          </div>
          <div class="div-while">祝您：</div>
          <div class="div-color bless">顺心顺意，一本万利！</div>
          <div @click="birthdayBtn" class="div-btn">
            立即领取
          </div>
        </div>
      </div>

    </div>

    <div class="mask-div" v-show="isMask">
      <div class="smile-div">
        <img src="../img/send_success.png" alt="smile" />
      </div>
      <div>{{ maskSuccessWrap[0] }}</div>
      <div>{{ maskSuccessWrap[1] }}</div>
    </div>

    <div class="mask-div" v-show="isMaskError">
      <div class="smile-div">
        <img src="../img/error.png" alt="smile" />
      </div>
      <div>{{ maskErrorWrap[0] }}</div>
      <div>{{ maskErrorWrap[1] }}</div>
    </div>

  </div>
</template>

<script>
import gProgress from "../components/widgets/gProgress.vue";

export default {
  name: "Vip",
  components: {
    gProgress,
  },
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
      vipData: "",
      nowVipLevel: 1,
      nextVipLevel: 1,
      couponsData: "",
      ruleScopeDtos: "",
      cryptoVisible: false,
      buttonShow: 0,
      birthday: "",
      birthdayFlog: false,
      isMaskError: false,
      isMask: false,
      maskSuccessWrap: [
        "生日礼金领取成功！",
        "可在交易记录中查询领取进度，或联系客服查询。",
      ],
      maskErrorWrap: ["生日礼金领取失败", "请联系客服查询。"],
      vipBarTxtColorIndex: 0,
      venueName: "",
      depositMinShow: false,
      validbetMinShow: false,
    };
  },
  computed: {
    getVipLvlImg () {
      if (this.vipData.accountLevel) {
        return require(`./img/icon-${this.vipData.accountLevel}.png`);
      } else {
        return require(`./img/icon-0.png`);
      }
    },
    nowLevelPercentage () {
      if (this.vipData !== "") {
        return this.vipData.accountLevel * 10;
      }
      return 100;
    },
    validbetMinValue () {
      if (this.vipData !== "") {
        if (this.vipData.accountLevel === 10) {
          return 100;
        }
        if (
          this.vipData.validbet >
          this.vipData.activityLevelList[this.vipData.accountLevel + 1]
            .validbetMin
        ) {
          return 100;
        } else {
          return (
            (this.vipData.validbet /
              this.vipData.activityLevelList[this.vipData.accountLevel + 1]
                .validbetMin) *
            100
          );
        }
      }
      return 100;
    },
    depositMinValue () {
      if (this.vipData !== "") {
        if (this.vipData.accountLevel === 10 || this.vipData.depositAmount > this.vipData.activityLevelList[this.vipData.accountLevel + 1].depositMin) {
          return 100;
        } else {
          return (
            (this.vipData.depositAmount /
              this.vipData.activityLevelList[this.vipData.accountLevel + 1]
                .depositMin) *
            100
          );
        }
      }
      return 100;
    },
    dataArray () {
      return this.getCouponUseRange(this.couponsData);
    },
  },
  methods: {
    init () {
      this.$http.getVipInfo().then((res) => {
        if (res.data.code === 0) {
          const { activityLevelList } = res.data.data
          this.vipData = res.data.data;
          this.nowVipLevel = res.data.data.accountLevel;
          this.vipBarTxtColorIndex = this.nowVipLevel;
          this.nextVipLevel = this.nowVipLevel + 1;
          this.vipBarTxtColorIndex = this.vipData.accountLevel;
          this.setValidMin(activityLevelList)
        }
      });
      this.$http.getVipPrivileges().then((res) => {
        if (res.data.code === 0) {
          this.couponsData = res.data.data;
          this.buttonShow = res.data.data.buttonShow;
          this.getCouponUseRange(this.couponsData);
        }
      });
      this._getBirthday();
    },
    //- 获取是否显示生日图标
    async _getBirthday () {
      const res = await this.$http.getBirthday();
      if (res.data.code) return
      this.birthday = res.data.data;
    },
    birthdayBtn () {
      this.$http.getActApply({ activityId: this.birthday.activityId }).then((res) => {
        if (res.data.code === 0) {
          this.birthdayFlog = false;
          this.isMask = true;
          setTimeout(() => {
            this.isMask = false;
          }, 1500);
          //- 领取成功之后重新进行是否显示判断
          this._getBirthday();
        } else {
          this.isMaskError = true;
          setTimeout(() => {
            this.isMaskError = false;
          }, 1500);
        }
      });
    },
    openBirthday () {
      this.birthdayFlog = true;
    },
    btnClick () {
      this.$http.getActApply({
        activityId: this.couponsData.id,
        catId: this.venueName,
      }).then((res) => {
        if (res.data.code === 0) {
          this.$http.getVipPrivileges().then((res) => {
            if (res.data.code === 0) {
              this.couponsData = res.data.data;
              this.buttonShow = res.data.data.buttonShow;
              this.getCouponUseRange(this.couponsData);
            }
          });
          this.messageTip({ message: "领取成功" });
        } else {
          this.messageTip({ message: res.data.msg });
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCouponUseRange (activeCoupon) {
			if (activeCoupon && activeCoupon.rule) {
				const { ruleScopeDtos } = JSON.parse(activeCoupon.rule);
				this.ruleScopeDtos = ruleScopeDtos;
				let auditCatsItem = this.ruleScopeDtos.filter(
					(item) => item.accountLevel === this.nowVipLevel
				);
				const { depotCatDtoList } = activeCoupon;
				return (
					auditCatsItem[0] &&
					auditCatsItem[0].auditCats.map(({ catId, depots }) => {
						const { catName } = depotCatDtoList.find(
							(item) => item.catId === catId
						);
						return {
							catId,
							catName,
							depots:
								depots &&
								depots
									.map(({ depotId }) =>
										depotCatDtoList.find(
											(item) => item.catId === catId && item.depotId === depotId
										)
									)
									.filter((item) => !!item),
						};
					})
				);
			}
    },
    getLevel (item, index) {
      this.vipBarTxtColorIndex = index;
      this.venueName = "";
      if (this.vipData.activityLevelList.length === item + 1) {
        this.nextVipLevel = this.vipData.activityLevelList.length - 1;
        this.nowVipLevel = item;
      } else if (item !== 0) {
        this.nowVipLevel = item;
        this.nextVipLevel = this.nowVipLevel + 1;
      } else {
        this.nowVipLevel = 0;
      }
      if (this.vipData.accountLevel === item) {
        this.buttonShow = this.couponsData.buttonShow;
      } else {
        this.buttonShow = 9;
      }
    },
    setValidMin (arr) {
      if (arr.length) {
        const maxIndex = this.userInfo.mbrLevel + 1 > arr.length - 1 ? arr.length - 1 : this.userInfo.mbrLevel + 1
        // promoteSign 0 累计投注 1 累计充值 2全部
        const { depositMin, validbetMin, promoteSign } = arr[maxIndex]
        this.depositMinShow = (depositMin || depositMin === 0) && [1, 2].includes(promoteSign);
        this.validbetMinShow = (validbetMin || validbetMin === 0) && [0, 2].includes(promoteSign);
      }
    },
    getValidbet (type, fromRate = false) {
      if (this.vipData) {
        let filterVal = null
        if (this.vipData.accountLevel === this.vipData.activityLevelList.length - 1) {
          // 最高级
          filterVal = this.vipData.activityLevelList[this.vipData.activityLevelList.length - 1]
        } else {
          // 非最高级
          [filterVal] = this.vipData.activityLevelList.filter((item) => {
            if (item.accountLevel === this.vipData.accountLevel + 1) {
              return item
            }
            return null
          })
        }

        if (type === 'top') {
          return filterVal.depositMin
        }
        if (fromRate) {
          // 百分率
          return Math.min(this.vipData.validbet / filterVal.validbetMin, 1)
        }
        return filterVal.validbetMin
      }
      return null
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
