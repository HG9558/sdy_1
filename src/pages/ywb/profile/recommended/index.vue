<template>
  <div class="recommend-wrapper">
    <component :is="componentName" :componentName.sync="componentName" @openDialog="openDialog"></component>
    <!-- 规则说明 -->
    <global-dialog
      class="rule-wrapper"
      :showDialog.sync="ruleShow"
      :title="$t('规则说明')"
      width="500px"
      :hasSelfFooter="true"
    >
      <div class="content">
        <div>1.{{ $t('当天下午2点，统计前一日收益所得。') }}</div>
        <div class="text">2.{{ $t('平台有权更改返利比例，如有疑问，请联系客服。') }}</div>
        <div>3.{{ $t('本平台保留最终解释权。') }}</div>
        <div class="line"></div>
      </div>
      <!-- <div class="footer">
        <button class="btn rule-btn" @click="ruleShow = false">取消</button>
        <button class="btn confirm-btn" @click="ruleShow = false">确定</button>
      </div> -->
    </global-dialog>
    <!-- 比例规则配置 -->
    <global-dialog
      class="rule-wrapper"
      :showDialog.sync="proportionShow"
      :title="$t('比例')"
      width="900px"
      :hasSelfFooter="true"
    >
      <div class="content">
        <!-- <div class="one-line">
          <div class="line-content">
            <div>1.{{ $t('邀请好友，双方有礼') }}</div>
            <table class="table-wrapper">
              <tr class="table-header">
                <th>{{ $t('推荐用户首存') }}</th>
                <th>{{ $t('自身返利') }}</th>
                <th>{{ $t('好友返利') }}</th>
              </tr>
              <tr class="table-content">
                <td>
                  {{ rebateFirstChargeDto.minCharge }}-{{ rebateFirstChargeDto.maxCharge }}{{ $tt('currencySymbol') }}
                </td>
                <td>{{ rebateFirstChargeDto.referrer }}%</td>
                <td>{{ rebateFirstChargeDto.referee }}%</td>
              </tr>
            </table>
          </div>
          <div class="line-content">
            <div>2.{{ $t('好友打流水，奖金拿不停') }}</div>
            <table class="table-wrapper">
              <tr class="table-header">
                <th>{{ $t('游戏类型') }}</th>
                <th v-for="(item, index) in catDtoList" :key="index">
                  {{ item.catName }}
                </th>
              </tr>
              <tr class="table-content">
                <td>{{ $t('奖励比例') }}</td>
                <td v-for="(item, index) in catDtoList" :key="index">{{ item.topRebate }}%</td>
              </tr>
            </table>
          </div>
        </div> -->
        <div class="two-line">
          <div>1.{{ $t('邀请好友，双方有礼') }}</div>
          <table class="table-wrapper">
            <tr class="table-header">
              <th>{{ $t('推荐用户首存') }}</th>
              <th>{{ $t('自身返利') }}</th>
              <th>{{ $t('好友返利') }}</th>
            </tr>
            <tr class="table-content">
              <td>
                {{ rebateFirstChargeDto.minCharge }}-{{ rebateFirstChargeDto.maxCharge }}{{ $tt('currencySymbol') }}
              </td>
              <td>{{ rebateFirstChargeDto.referrer }}%</td>
              <td>{{ rebateFirstChargeDto.referee }}%</td>
            </tr>
          </table>
        </div>
        <div class="two-line">
          <div>2.{{ $t('好友打流水，奖金拿不停') }}</div>
          <table class="table-wrapper">
            <tr class="table-header">
              <th>{{ $t('游戏类型') }}</th>
              <th v-for="(item, index) in catDtoList" :key="index">
                {{ item.catName }}
              </th>
            </tr>
            <tr class="table-content">
              <td>{{ $t('奖励比例') }}</td>
              <td v-for="(item, index) in catDtoList" :key="index">{{ item.topRebate }}%</td>
            </tr>
          </table>
        </div>
        <div class="two-line">
          <div>3.{{ $t('好友邀请三重豪礼') }}</div>
          <table class="table-wrapper">
            <tr class="table-header">
              <th>{{ $t('受邀好友达到VIP等级') }}</th>
              <th v-for="(item, index) in rebateVipDtoList" :key="index">VIP{{ item.level }}</th>
            </tr>
            <tr class="table-content">
              <td>{{ $t('邀请者得到的奖励') }}</td>
              <td v-for="(item, index) in rebateVipDtoList" :key="index">
                {{ item.award }}
              </td>
            </tr>
          </table>
        </div>
        <div class="three-line">
          <div>4.{{ $t('好友充值我领奖') }}</div>
          <table class="table-wrapper">
            <tr class="table-header">
              <th>{{ $t('奖励金额') }}</th>
              <th v-for="(item, index) in rebateChargeDtoList" :key="index">
                {{ $tt('x元礼金x倍流水', { count: item.award, multiple: item.multiple }) }}
              </th>
            </tr>
            <tr class="table-content">
              <td rowspan="4">{{ $t('条件') }}</td>
              <td
                :class="{
                  'no-border': index === rebateChargeDtoList.length - 1,
                }"
                v-for="(item, index) in rebateChargeDtoList"
                :key="index"
              >
                {{ $t('邀请') }} {{ item.num }} {{ $t('好友') }}
              </td>
            </tr>
            <tr class="table-content">
              <td
                v-for="(item, index) in rebateChargeDtoList"
                :key="index"
                :class="{ 'no-border left-border': index === 0 }"
              >
                {{ $t('总额') }}≥{{ item.minCharge }}{{ $t('金额') }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="footer mt-20">
        <button class="btn rule-btn" @click="proportionShow = false">{{ $t('取消') }}</button>
        <button class="btn confirm-btn" @click="proportionShow = false">{{ $t('确定') }}</button>
      </div>
    </global-dialog>

    <!-- 立即推广 -->
    <global-dialog
      class="rule-wrapper"
      :showDialog.sync="promoteShow"
      :title="$t('推广')"
      width="500px"
      :hasSelfFooter="true"
    >
      <div class="content promote-wrapper">
        <div class="promote-title">{{ $t('扫码或复制链接到浏览器注册') }}</div>
        <QrCode class="qr-code-container promote-qr" :codeSize="248" :codeUrl="agentUrl" :isShowLogo="false" />
        <div class="mt-30">{{ $t('微信等扫码如被拦截，可使用其他工具扫码') }}</div>
        <div class="wrap-text">
          {{ $t('或者') }} <span class="copy-url">{{ $t('复制连接到浏览器打开') }}</span>
        </div>
        <div class="friend-url">
          <span>{{ $t('好友注册链接') }}</span>
        </div>
        <div class="url">{{ agentUrl }}</div>
      </div>
      <div class="footer promote-footer">
        <button class="btn rule-btn" v-clipboard:copy="agentUrl" v-clipboard:success="copySuccess">
          {{ $t('复制推广连接') }}
        </button>
        <button class="btn confirm-btn" @click="saveQrCode">{{ $t('保存推广页面') }}</button>
      </div>
    </global-dialog>
  </div>
</template>

<script>
import QrCode from "commonComponent/QrCode";
import { mapState } from "vuex";
export default {
  name: "mainRecommend",
  components: {
    QrCode,
    Recommend: () => import("./component/Recommend"),
    MyFriend: () => import("./component/MyFriend"),
    MyFriendDetail: () => import("./component/MyFriendDetail.vue"),
    GetMore: () => import("./component/GetMore"),
  },
  created() {
    this.init();
  },
  watch: {
    codeId: {
      immediate: true,
      handler(val) {
        this.agentUrl = `${window.location.origin}#/login/register?codeId=${val}`;
      }
    }
  },
  data() {
    return {
      ruleShow: false,
      proportionShow: false,
      promoteShow: false,
      componentName: "Recommend",
      agentUrl: "",
      rebateVipDtoList: [], //- 好友等级返回
      catDtoList: [], //- 好友打流水
      rebateFirstChargeDto: {}, //- 被邀请人
      rebateChargeDtoList: [], //- 好友充值领奖
    };
  },
  methods: {
    init() {
      this._getRemmendRule();
    },
    async _getRemmendRule() {
      try {
        const { VUE_APP_APP_SIGN } = process.env
        const levelNum = VUE_APP_APP_SIGN === 'lua' ? 4 : VUE_APP_APP_SIGN === 'mgm' ? 7 : 10
        const res = await this.$http.getRemmendRule();
        if (res.data.code) return;
        const { msg } = res.data;
        this.rebateVipDtoList = msg.rebateVipDtoList || [];
        this.rebateVipDtoList = this.rebateVipDtoList.filter(item => item.level <= levelNum)
        this.catDtoList = msg.catDtoList;
        this.rebateFirstChargeDto = msg.rebateFirstChargeDto || {};
        this.rebateChargeDtoList = msg.rebateChargeDtoList;
      } catch (error) {
        console.warn(error);
      }
    },
    copySuccess() {
      this.messageTip({ message: this.$t('复制成功'), type: 'success' })
    },
    //- 打开弹窗
    openDialog(type) {
      switch (type) {
        case "rule":
          this.ruleShow = true;
          break;
        case "promote":
          this.promoteShow = true;
          break;
        case "proportion":
          this.proportionShow = true;
          break;
      }
    },
    saveQrCode() {
      let imgSrc = document
        .querySelector(".qr-code-container")
        .getElementsByTagName("img");
      let a = document.createElement("a");
      a.href = imgSrc[0].src;
      a.download = "下载";
      a.click();
    },
  },
  computed: {
    ...mapState({
      codeId: state => state.global.codeId
    }),
  }
};
</script>

<style lang="scss" scoped>
@import './css/index.scss';
</style>
