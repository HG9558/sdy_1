<template>
  <div class="coupons">
    <div class="top-div">
      <div class="coupons-inner">
        <div @click="selectClick(item)" :class="{ 'active-bg': selectActive === item.buttonShow }" v-for="item in titleArr" :key="item.buttonShow">
          {{ item.name }}
          <div class="dot"></div>
        </div>
      </div>
      <div class="coupons-wrap" v-for="(item, index) in dataList" :key="index" :class="{
          'coupons-bg': item.buttonShow === 0 || item.buttonShow === 3,
          'is-to-top': isToTop && index === 0
        }">
        <div class="coupons-wrap-border">
          <div class="coupons-wrap-first">
            <div class="first-div" :class="{
              'first-div-bg': item.buttonShow === 0 || item.buttonShow === 3,
            }">
              {{ item.activityName }}
            </div>
            <div class="scoend-div" :class="{'received-color':item.buttonShow === 3 || item.buttonShow === null}" v-if="!isMixingRule(item)">{{ item.amountMax }}元</div>
          </div>
          <div class="coupons-wrap-second" v-if="!isMixingRule(item)">
            领取要求：{{ tmplCode(item).label }}≥{{ tmplCode(item).value }}元
          </div>
          <div class="coupons-wrap-three">
            <button @click="openClick(index)" class="first-btn" :class="{ 'mixing-detail': isMixingRule(item) }">
              <span class="service-manual">{{ isMixingRule(item) ? '领取详情' : '使用细则' }}</span>
              <i class="el-icon-arrow-down" style="color: #4D618D" v-show="selectDiv === null || selectDiv !== index"></i>
              <i class="el-icon-arrow-up" style="color: #4D618D" v-show="selectDiv === index"></i>
            </button>
            <button @click="nowBtnClick(item)" v-show="item.buttonShow !== null && !isMixingRule(item) &&item.tmplCode !=='AQ0000025'" :class="{
              'sconed-btn-bg': item.buttonShow === 0 || item.buttonShow === 3,
              'received-bg':item.buttonShow === 3 || item.buttonShow === null
            }" :disabled="item.buttonShow === 0 || item.buttonShow === 3 || item.buttonShow == null" class="sconed-btn">
              {{ buttonShow(item) }}
            </button>
          </div>
          <div class="coupons-wrap-last" :class="{ 'is-show': selectDiv === index }">
            <template v-if="isMixingRule(item)">
              <div v-for="(_item, _i) in mixingDetail" :key="_i" class="mixing-detailitem">
                <div class="mixing-topbox">
                  <span class="white-color">领取要求：{{_item.activityName}}——{{ tmplCode(_item).label }}≥{{ tmplCode(_item).value }}元</span>
                  <span>
                    <span class="scoend-div mixing-title">{{_item.activityName}}</span>
                    <span class="scoend-div mixing-title">{{_item.amountMax}}元</span>
                    <button @click="openMixingClick(_i)" class="first-btn">
                      <span class="service-manual">使用细则</span>
                      <i class="el-icon-arrow-down" style="color:#BCA997" v-show="selectMixingDiv === null || selectMixingDiv !== _i"></i>
                      <i class="el-icon-arrow-up" style="color:#BCA997" v-show="selectMixingDiv === _i"></i>
                    </button>
                    <button @click="nowBtnClick(_item, true)" :class="{
                      'sconed-btn-bg': _item.buttonShow === 0 || _item.buttonShow === 3 || selectActive === 3 || _item.useState === 2,
                    }" :disabled="_item.buttonShow === 0 || _item.buttonShow === 3 || _item.buttonShow === 2 || selectActive === 3  || _item.useState === 2" class="sconed-btn">
                      {{ buttonShow(_item, true) }}
                    </button>
                  </span>
                </div>
                <div class="coupons-wrap-last" :class="{ 'is-show': selectMixingDiv === _i }">
                  <div class="first-last">
                    取款流水倍数：{{
                    _item.multipleWater ? _item.multipleWater : 0
                  }}倍
                  </div>
                  <div class="last-last">
                    使用范围：
                    <div v-for="(_categories, _index) in getCouponUseRange({ ..._item, depotCatDtoList: item.depotCatDtoList })" :key="_index">
                      <span v-show="_categories.depots.length">
                        <span>{{ _categories.catName }}:</span>
                        <span v-for="(_depot, _indexx) in _categories.depots" :key="_indexx">
                          {{ _depot.depotName }}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div @click="jumpDiscountOpen(_item,item.catId)" class="check-html">
                    查看优惠详情>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="first-last">
                取款流水倍数：{{
                item.multipleWater ? item.multipleWater : 0
              }}倍
              </div>
              <div class="last-last">
                使用范围：
                <div v-for="(categories, index) in getCouponUseRange(item)" :key="index">
                  <span v-show="categories.depots.length">
                    <span>{{ categories.catName }}:</span>
                    <span v-for="(depot, indexx) in categories.depots" :key="indexx">
                      {{ depot.depotName }}
                    </span>
                  </span>
                </div>
              </div>
              <div @click="jumpDiscountOpen(item)" class="check-html">
                查看优惠详情>
              </div>
            </template>
          </div>
        </div>
        <img class="coupons-received" v-show="item.buttonShow === 3 || item.buttonShow == null" src="../img/received.png" alt="">
      </div>
      <div v-show="shwoNodata && !dataList.length" class="no-data">
        <img src="../img/no_data.png" alt="" />
        <span class="text">暂无优惠记录</span>
      </div>
      <div class="no-data-gif" v-show="showLoding">
        <img style="width: 450px;" src="../img/load.gif" alt="" />
      </div>
    </div>

    <global-dialog title="领取提示" :showDialog.sync="isShowDialog" class="unbing-wrap" :hasSelfFooter="true">
      <div class="d-div">
        {{ activeInfo.activityName }}
      </div>
      <div class="d-div">
        取款流水倍数：{{
          activeInfo.multipleWater ? activeInfo.multipleWater : 1
        }}倍
      </div>
      <div class="d-div">请确认您已完整了解活动详情，领取后不可撤销</div>

      <div class="d-btn-div">
        <div @click="isShowDialog = false" class="cancel-button">取消</div>
        <div class="sure" @click="getApply">立即领取</div>
      </div>
    </global-dialog>

  </div>
</template>

<script>
export default {
  name: "Coupons",
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.getData();
      }
    },
  },
  data () {
    return {
      titleArr: [
        {
          name: "全部",
          buttonShow: -1,
        },
        {
          name: "已领取",
          buttonShow: 3,
        },
        {
          name: "已失效",
          buttonShow: 0,
        },
      ],
      selectActive: -1,
      dataList: [],
      selectDiv: null,
      selectMixingDiv: null,
      showLoding: false,
      shwoNodata: false,
      isShowDialog: false,
      activeInfo: {
        activityName: "",
        multipleWater: 1,
        id: ''
      },
      mixingDetail: [],
      isToTop: false,
      lastMixinId: null,
    };
  },
  methods: {
    isMixingRule ({ tmplCode }) {
      return tmplCode === 'AQ0000024'
    },
    // 查看详情跳转优惠，并打开详情弹窗
    jumpDiscountOpen (item, catID) {
      this.$store.commit('normal/set_link_data', {
        bannerLink: true,
        id: catID || item.catId,
        activityId: item.id
      })
       this.$router.push('/discount')
    },
    // 立即领取
    nowBtnClick (item, isMixing) {
      this.activeInfo.activityName = item.activityName;
      this.activeInfo.multipleWater = item.multipleWater;
      this.activeInfo.id = item.id
      if (isMixing) {
        this.activeInfo.subRuleTmplCode = item.tmplCode
      }
      this.isShowDialog = true;
    },
    getApply () {
      this.isShowDialog = false;
      const { id, subRuleTmplCode } = this.activeInfo
      const data = {
        activityId: id
      }
      if (subRuleTmplCode) {
        data.subRuleTmplCode = subRuleTmplCode
      }
      this.$http.getActApply(data).then((res) => {
        if (res.data.code === 0) {
          this.messageTip({ message: "成功领取优惠" });
        } else {
          this.messageTip({ message: res.data.msg });
        }
      });
    },
    openMixingClick (index) {
      this.selectMixingDiv = this.selectMixingDiv === index ? null : index
    },
    openClick (index) {
      if (this.selectDiv === index) {
        this.selectDiv = null;
      } else {
        this.selectDiv = index;
        const currentObj = this.dataList[index]
        if (this.isMixingRule(currentObj)) {
          this.getMixingDetail(currentObj)
        }
      }
    },
    getMixingDetail ({ id }) {
      const params = {
        activityId: id
      }
      if (this.lastMixinId !== id) {
        this.mixingDetail = []
      } else {
        return
      }
      this.lastMixinId = id
      const dealFn = res => {
        const { data: { code, data } } = res
        if (code === 0) {
          this.mixingDetail = data
        }
      }
      if (this.selectActive === 3) {
        this.$http.getDoneMixing(params).then(res => dealFn(res))
      } else {
        this.$http.getMixing(params).then(res => dealFn(res))
      }
    },
    buttonShow (item, isMixin) {
      if (isMixin && item.useState === 2) {
        return '已失效'
      }
      if (item.buttonShow === 0) {
        return "已失效";
      } else if (item.buttonShow === 1) {
        return "立即领取";
      } else if (item.buttonShow === 2) {
        return "立即存款";
      } else if (item.buttonShow === 3) {
        return "已领取";
      } else {
        return "已领取";
      }
    },
    tmplCode (item) {
      if (item.tmplCode === "AQ0000004") {
        return {
          label: "负盈利",
          value: item.validBet,
        };
      } else if (item.tmplCode === "AQ0000012") {
        return {
          label: "投注金额",
          value: item.validBet,
        };
      } else {
        return {
          label: "存款金额",
          value: item.amountMin,
        };
      }
    },
    getCouponUseRange (activeCoupon) {
      const { depotCatDtoList } = activeCoupon;
      try {
        const { auditCats } = JSON.parse(activeCoupon.rule);
        return (
          auditCats &&
          auditCats.map(({ catId, depots }) => {
            const { catName } = depotCatDtoList.find(
              (item) => item.catId === catId
            );
            return {
              catId,
              catName,
              depots: depots
                .map(({ depotId }) =>
                  depotCatDtoList.find(
                    (item) => item.catId === catId && item.depotId === depotId
                  )
                )
                .filter((item) => !!item),
            };
          })
        );
      } catch (error) {
        return [];
      }
    },
    getData () {
      this.showLoding = true;
      this.shwoNodata = false;
      const data = {
        discount: 1,
        pageSize: 100,
        pageNo: 1,
        buttonShow: this.selectActive,
      };
      this.$http.getActivityList(data).then((res) => {
        this.showLoding = false;
        if (res.data.code === 0) {
          this.dataList = res.data.page.list;
          if (this.dataList.length === 0) this.shwoNodata = true;
          if (this.$route.query.id) {
            this.dataList.find((item, index) => {
              if (item.id == this.$route.query.id && index !== 0) {
                // if (index === 6) {
                this.dataList.unshift(this.dataList[index])
                this.dataList.splice(index + 1, 1)
                this.isToTop = true
              }
            })
          }
        }

      });
    },
    selectClick (item) {
      this.selectActive = item.buttonShow;
      this.shwoNodata = false;
      this.showLoding = true;
      this.isToTop = false
      this.dataList = [];
      if (item.buttonShow === 3) {
        const data = {
          discount: 1,
          pageSize: 20,
          pageNo: 1,
          buttonShow: this.selectActive,
        };
        this.$http.getActivityListTwo(data).then((res) => {
          this.showLoding = false;
          if (res.data.code === 0) {
            this.dataList = res.data.data.list;
            if (this.dataList.length === 0) this.shwoNodata = true;
          }
        });
      } else {
        this.getData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>