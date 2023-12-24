<template>
  <div :class="['bankcard-manage', site]">
    <div class="bank-card-list-container">
      <template v-if="tabActive === 'rmb' || isWallet">
        <div
          :key="item.id || 1"
          @click="selectBankCard(item)"
          class="bank-card-list"
          v-for="item in bankcardData['rmb']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">
              {{ item.bankName }}
              <span class="bank-tips" v-if="item.available === 3">{{ $t_c('暂不支持') }}</span>
            </div>
            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" :src="useImgPath('profile/bank_static_rmb.png')" alt="" />
              <img class="bank-logo" :src="item.bankLog" alt="" />
            </div>

            <div class="bank-card-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <el-button
                :class="['bank-unbind', globalState.language]"
                v-if="item.isDraw === 0"
                @click="openDialog(item, 'rmb')">
                {{ $t_c('解绑') }}
              </el-button>
            </div>
          </div>
        </div>
      </template>

      <!-- 虚拟币 -->
      <template v-if="tabActive === 'crypto' || isWallet">
        <div :key="item.id" @click="selectBankCard(item)" class="bank-card-list" v-for="item in bankcardData['crypto']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select" v-if="item.available == 1"></div>
            <div class="bank-label">
              {{ item.walletName }}
              <span class="bank-tips" v-if="item.available === 3">{{ $t_c('暂不支持') }}</span>
            </div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper crypto">
              <img class="static-img virtual-bg" :src="useImgPath('profile/bank_static_crypto.png')" alt="" />
              <img class="bank-logo" :src="item.bankLog" alt="" />
            </div>

            <div class="bank-card-footer">
              <div class="bank-cardNo crypto">
                {{ item.walletAddress }}
                <div v-if="item.currencyProtocol && !isWallet">
                  {{ item.currencyProtocol === 'TRC20' ? $t_c('波场（TRC20）') : $t_c('以太坊（ERC20）') }}
                </div>
              </div>
              <el-button
                v-if="item.isDraw === 0"
                @click="openDialog(item, 'crypto')"
                :class="['bank-unbind', globalState.language]">
                {{ $t_c('解绑') }}
              </el-button>

              <div class="bank-disabled" v-if="item.available == 0 || item.available == 2">
                {{ $t_c('该协议已被禁用') }}
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 支付宝 -->
      <template v-if="tabActive === 'alipay' || isWallet">
        <div :key="item.id" @click="selectBankCard(item)" class="bank-card-list" v-for="item in bankcardData['alipay']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>
            <div class="bank-label">
              {{ item.bankName }}
              <span class="bank-tips" v-if="item.available === 3">{{ $t_c('暂不支持') }}</span>
            </div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" :src="useImgPath('profile/bank_static_alipay.png')" alt="" />
              <img class="bank-logo" :src="item.bankLog" alt="" />
            </div>

            <div class="bank-card-footer alipay-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <el-button
                :class="['bank-unbind', globalState.language]"
                v-if="item.isDraw === 0"
                @click="openDialog(item, 'alipay')">
                {{ $t_c('解绑') }}
              </el-button>
            </div>
          </div>
        </div>
      </template>

      <!-- 其他钱包 -->
      <template v-if="tabActive === 'otherpay' || isWallet">
        <div
          :key="item.id"
          @click="selectBankCard(item)"
          class="bank-card-list"
          v-for="item in bankcardData['otherpay']"
          v-show="
            (item.bankName === 'EBPAY' && userState.ebPayWithdrawEnable) ||
            (item.bankName === 'TOPAY' && userState.toPayWithdrawEnable) ||
            (item.bankName === 'GOPAY' && userState.goPayWithdrawEnable)
          ">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>
            <div class="bank-label">
              {{ item.bankName }}
              <span class="bank-tips" v-if="item.available === 3">{{ $t_c('暂不支持') }}</span>
            </div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" :src="useImgPath('profile/bank_static_otherpay.png')" alt="" />
              <img class="bank-logo" :src="item.bankLog" alt="" />
            </div>

            <div class="bank-card-footer alipay-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <div
                :class="['bank-unbind', globalState.language]"
                v-if="item.isDraw === 0"
                @click="openDialog(item, 'otherpay')">
                {{ $t_c('解绑') }}
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="tabActive === 'ecny' || isWallet">
        <div
          :key="item.id || 1"
          @click="selectBankCard(item)"
          class="bank-card-list"
          v-for="item in bankcardData['ecny']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>
            <div class="bank-label">
              {{ item.bankName }}
              <span class="bank-tips" v-if="item.available === 3">{{ $t_c('暂不支持') }}</span>
            </div>
            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" :src="useImgPath('profile/bank_static_rmb.png')" alt="" />
              <img class="bank-logo" :src="item.bankLog" alt="" />
            </div>

            <div class="bank-card-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <el-button
                :class="['bank-unbind', globalState.language]"
                v-if="item.isDraw === 0"
                @click="openDialog(item, 'ecny')">
                {{ $t_c('解绑') }}
              </el-button>
            </div>
          </div>
        </div>
      </template>

      <template v-if="tabActive === 'ePay' || isWallet">
        <div
          :key="item.id || 1"
          @click="selectBankCard(item)"
          class="bank-card-list"
          v-for="item in userState.bankcardData['ePay']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">
              {{ item.bankName }}
              <span class="bank-tips" v-if="item.available === 3">{{ $t_c('暂不支持') }}</span>
            </div>
            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" :src="useImgPath('profile/bank_static_crypto.png')" alt="" />
              <img class="bank-logo" :src="item.bankLog" alt="" />
            </div>

            <div class="bank-card-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <el-button
                :class="['bank-unbind', globalState.language]"
                v-if="item.isDraw === 0"
                @click="openDialog(item, 'rmb')">
                {{ $t_c('解绑') }}
              </el-button>
            </div>
          </div>
        </div>
      </template>

      <!-- 取款 -->
      <template v-if="!isWallet">
        <div
          @click="addBankCardClick"
          class="bank-card-list add-bank-card"
          v-if="
            (tabActive === 'rmb' && bankcardData[tabActive].length < 5) ||
            ['crypto', 'alipay', 'otherpay', 'ecny', 'ePay'].includes(tabActive)
          ">
          <div class="bank-card-inner">
            <div class="no-card">
              <!-- <img class="static-img" :src="require(`./img/${tabActive === 'rmb'?'static_bank_img':tabActive === 'crypto' ? 'static_virtual':'static_alipay'}.png`)" alt=""> -->
              <img
                class="static-img"
                :src="useImgPath(`profile/bank_static_${tabActive === 'ePay' ? 'crypto' : tabActive}.png`)"
                alt="" />
              <img class="add-bank-card" :src="useImgPath('profile/bank_add_bank.png')" alt="" />
            </div>
            <el-button :class="['add-bank-button', globalState.language]">
              {{
                tabActive === 'otherpay'
                  ? $t_c('添加新的钱包')
                  : tabActive === 'rmb'
                  ? $t_c('添加新的银行卡')
                  : tabActive === 'crypto'
                  ? $t_c('添加新的钱包')
                  : tabActive === 'ecny'
                  ? $t_c('添加新的数字人民币')
                  : tabActive === 'ePay'
                  ? $t_c('添加新的电子钱包')
                  : $t_c('添加新的支付宝')
              }}
            </el-button>
          </div>
        </div>
      </template>

      <!-- 个人钱包 -->
      <template v-else>
        <div
          @click="addBankCardClick"
          class="bank-card-list add-bank-card"
          v-if="bankcardData.rmb.length < 5 || crFlag || alipayEnable">
          <div class="bank-card-inner">
            <div class="no-card">
              <img class="static-img" :src="useImgPath('profile/bank_static_rmb.png')" alt="" />
              <img class="add-bank-card" :src="useImgPath('profile/bank_add_bank.png')" alt="" />
            </div>
            <el-button :class="['add-bank-button', globalState.language]">{{ $t_c('添加新的提现方式') }}</el-button>
          </div>
        </div>
      </template>
    </div>

    <self-dialog
      :dialogTitle="$t_c('新增提现方式')"
      v-model:isShow="showDialog"
      :showCancel="false"
      :showConfirm="false"
      customClass="add_card"
      :width="globalState.language === 'zh' ? 800 : globalState.language === 'ms' ? 1000 : 1000">
      <AddBankCard :tabActive="tabActive" v-model:showDialog="showDialog" />
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useGlobalState, useUserState } from '@/stores';
import { ref, watch } from 'vue';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import AddBankCard from './AddBankCard.vue';
import useProxy from '@/hook/useCurrentInstance';
import { api } from '@/api';
import { lang } from '@/i18n';

const currentId = ref<number>(-1);
const globalState = useGlobalState();
const showDialog = ref<boolean>(false);
const emits = defineEmits(['changeCurrentBank']);
const userState = useUserState();
const { messageTip } = useDialog();
const proxy = useProxy();
const site = useSite();

const props = defineProps<{
  tabActive: string;
  bankcardData: BankAPI.bankcardDataType;
  isWallet: boolean;
  crFlag: boolean;
  alipayEnable: boolean;
}>();

const selectBankCard = (item: BankAPI.BankCard | BankAPI.CryptoCurrency | BankAPI.ailpayAccountListBankCard) => {
  currentId.value = item.id;
  emits('changeCurrentBank', item);
};

const openDialog = (item: BankAPI.BankCard | BankAPI.ECNYListBankCard | BankAPI.CryptoCurrency, cardType: string) => {
  proxy.$_dialog.show({
    isShow: true,
    content: lang('确认要解绑吗？'),
    isBtnLoading: true,
    async clickCallback(): Promise<any> {
      return await _confirmUnbind(item, cardType);
    },
  });
};

//- 解绑银行卡确认事件
const _confirmUnbind = async (
  item: BankAPI.BankCard | BankAPI.ECNYListBankCard | BankAPI.CryptoCurrency,
  cardType: string
) => {
  try {
    const res = await (props.tabActive === 'crypto' || cardType === 'crypto'
      ? api.bank.unbindWalletList({ walletId: item.id })
      : api.bank.unbindCardList({ bankCardId: item.id }));

    if (res.code) return messageTip({ message: res.msg });
    //- 刷新取款卡列表；
    if (props.tabActive === 'crypto' || cardType === 'crypto') {
      userState._getCryptoList();
    } else {
      userState._getBankCardList();
      userState._getAlipayList();
      userState._getEcnyList();
      userState._getOtherPayAccountList();
      userState._getEMoneyList();
    }
    messageTip({ message: lang('解绑成功') });
  } catch (e) {
    Promise.resolve();
  }
};

//- 添加银行卡
const addBankCardClick = () => {
  showDialog.value = true;
};

watch(
  () => props.bankcardData,
  data => {
    if (
      Object.values(data).every(arr => !arr.length) ||
      Object.values(data)
        .flat()
        .findIndex(item => item.id === currentId.value) > -1
    )
      return;
    if (data.rmb.length || data.crypto.length) {
      currentId.value = data.rmb.length ? data.rmb[0].id : data.crypto[0].id;
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.tabActive,
  (currentActive: keyof BankAPI.bankcardDataType & string) => {
    const activeKey = currentActive as keyof BankAPI.bankcardDataType;
    if (!props.bankcardData[activeKey].length) return;
    currentId.value = props.bankcardData[activeKey][0]?.id;
  }
);

const selectIcon = `url(${useImgPath('profile/bank_selected.png')})`;
</script>

<style scoped lang="scss">
.bankcard-manage {
  padding-top: 20px;

  .bank-card-list-container {
    @include flex(flex-start, row, wrap);
    .bank-card-list {
      width: 296px;
      height: 159px;
      background-color: var(--u_w_12);
      box-shadow: var(--u_w_14);
      border-radius: 15px;
      margin-bottom: 15px;
      padding: 7px;
      margin-right: 9px;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      .bank-card-inner {
        border: 1px solid var(--u_w_13);
        border-radius: 10px;
        height: 100%;
        position: relative;
        padding: 10px;
        box-sizing: border-box;
        .bank-select {
          &.on {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 25px;
            height: 25px;
            background-image: v-bind(selectIcon);
            background-size: 100% 100%;
          }
        }
        .bank-label {
          font-weight: 500;
          font-size: 16px;
          color: var(--u_w_15);
        }
        .img-wrapper {
          @include flex();
          margin-top: 5px;
          min-height: 48px;
          &.crypto {
            margin-top: 0;
          }
          .static-img {
            width: 175px;
            &.virtual-bg {
              width: 209px;
            }
          }
          .bank-logo {
            width: 48px;
          }
        }

        .no-card {
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .static-img {
            width: 175px;
          }
          .add-bank-card {
            width: 30px;
          }
        }

        .add-bank-button {
          width: 172px;
          height: 22px;
          position: absolute;
          bottom: 17px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--u_w_16);
          font-weight: 500;
          font-size: 14px;
          color: var(--u_w_17);
          &:not(.zh, .zh_tw) {
            width: auto;
          }
        }

        .bank-card-footer {
          @include flex();
          margin-top: 12px;
          &.alipay-footer {
            margin-top: 5px;
          }
          .bank-cardNo {
            @include flex(flex-start);
            font-size: 14px;
            &.crypto {
              font-size: 12px;
            }
          }
          .bank-unbind {
            width: 50px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            &:not(.zh, .zh_tw) {
              width: auto;
              padding: 0 10px;
              border-radius: 5px;
            }
          }
          .bank-disabled {
            font-size: 12px;
            position: absolute;
            bottom: 2px;
            right: 5px;
            color: var(--u_w_11);
          }
        }
      }
    }
  }
}
//- 002
.bankcard-manage {
  &.template_2_002 {
    .bank-cardNo {
      color: #b1b7ca;
    }
    .add-bank-button {
      border: none !important;
    }
    .bank-unbind {
      background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
      border: none;
      color: #fff;
    }
  }
}
.bankcard-manage {
  &.template_2_003 {
    .bank-unbind {
      background: #132743;
      box-shadow: 0px 4px 18px rgba(207, 212, 225, 0.54);
      color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
