<template>
  <div class="red-envelope-record-container">
    <div class="record-content">
      <div v-if="redEnvelopeRecordList">
        <div :class="['record-title', globalState.language]">
          <span> {{ $t_c('正点红包雨来袭，名额有限') }}</span>
          <div class="record-f-title">
            {{ $t_c('敬请期待:') }}
            <span class="c_f">
              {{
                +discountState.newRedEnvelopeState.currentHour + 1 >= 24
                  ? '00'
                  : +discountState.newRedEnvelopeState.currentHour + 1
              }}:00
            </span>
            {{ $t_c('红包雨活动') }}
          </div>
          <!-- {{
            (discountState.newRedEnvelopeState.currentHour as number) >= 24
              ? '23'
              : discountState.newRedEnvelopeState.currentHour
          }}:00 {{ $t_c('红包雨已结束') }},{{ $t_c('发出') }}{{ maxCount }}{{ $t_c('封') }}{{ $t_c('，领取')
          }}{{ applyCount }}{{ $t_c('封') }}{{ $t_c('，总金额') }}{{ applyAmount
          }}{{ envState.vite_currency_map.value }} -->
        </div>

        <div class="record-names">{{ $t_c('中奖名单') }}</div>
        <div class="record-list">
          <table :class="['record-table', globalState.language]">
            <tr>
              <th>{{ $t_c('序号') }}</th>
              <th>{{ $t_c('会员账号') }}</th>
              <th>{{ $t_c('金额') }}</th>
            </tr>
            <tr v-for="(item, index) in redEnvelopeRecordList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.loginName }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="no-data" v-else>{{ $t_c('暂无数据') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useCommonImgPath } from '@/hook/usePath';
// import { useDiscountState, useGlobalState } from '@/stores';
import { onMounted, reactive, ref } from 'vue';

const applyCount = ref<number>(0);
const maxCount = ref<number>(0);
const applyAmount = ref<number>(0);
const discountState = useDiscountState();
const redEnvelopeRecordList = reactive<RedEnvelopeEntranceAPI.RedEnvelopeReward[]>([]);
const { messageTip } = useDialog();
const globalState = useGlobalState();
onMounted(() => openRedEnvelopeRecord());

const openRedEnvelopeRecord = async () => {
  const res = await api.redPacketRain.redEnvelopeRecord();
  if (res.code) return messageTip({ message: res.msg || (res.data.msg as string) });
  const recordRes = res.data;
  applyCount.value = recordRes.applyCount;
  maxCount.value = recordRes.maxCount;
  applyAmount.value = recordRes.applyAmount;
  redEnvelopeRecordList.length = 0;
  redEnvelopeRecordList.push(
    ...recordRes.newRedEnvelopeRewardDtoList.map(item => {
      item.loginName = item.loginName.substring(0, item.loginName.length - 4) + '****';
      return item;
    })
  );
};

const recordBg = `url(${useCommonImgPath('red_envelopes/record-bg.jpg')})`;
const listTitleBg = `url(${useCommonImgPath('red_envelopes/record-list-title-bg.png')})`;
</script>

<style lang="scss" scoped>
@import '../../../assets/style/fonts/font.scss';
.red-envelope-record-container {
  overflow: hidden;
  min-height: 1200px;
  background-image: v-bind(recordBg);
  background-position: 50% center !important;
  background-repeat: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
  background-size: cover !important;
  position: relative;
  .record-content {
    width: 738px;
    height: 90vh;
    margin: 75px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: #ffffff;
    font-weight: 500;
    text-align: center;
    .record-title {
      width: 573px;
      height: 101px;
      font-family: hy;
      margin-top: 40px;
      background-image: v-bind(listTitleBg);
      background-size: contain;
      text-indent: 50px;
      padding-top: 15px;
      & > span {
        @include text_clip(linear-gradient(180deg, #fdffa8 0%, #eec799 100%));
        font-size: 32px;
      }
      &:not(.zh, .zh_tw) {
        width: auto;
        font-size: 30px;
        height: auto;
        padding-bottom: 20px;
        & > span,
        .record-f-title {
          font-size: 16px;
        }
      }
    }
    .record-f-title {
      @include text_clip(linear-gradient(180deg, #fdffa8 0%, #eec799 100%));
      margin: 7px 0;
      font-size: 32px;
      .c_f {
        color: #fff;
        -webkit-text-fill-color: #fff;
        font-weight: 500 !important;
      }
    }
    .record-names {
      font-weight: 500;
      font-size: 36px;
      color: #ffffff;
      margin-top: 25px;
      font-family: hy;
      text-shadow: 0px 2px 0px #4a2020, 0px 3px 0px #db5b64;
    }
    .record-list {
      margin-top: 20px;
      .record-table {
        text-align: center;
        width: 325px;
        margin: 0 auto;
        &:not(.zh, .zh_tw) {
          width: auto;
        }
        th {
          width: 33.3%;
          font-size: 20px;
          text-align: center;
          font-family: hy;
          @include text_clip(linear-gradient(180deg, #ffffff 0%, #e8d8d8 100%));
        }
        td {
          height: 40px;
          color: #dfbebe;
          font-size: 20px;
        }
      }
    }
    .no-data {
      font-size: 50px;
      margin-top: 350px;
    }
  }
}
</style>
