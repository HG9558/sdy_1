<template>
    <div class="paybus-step-dialog">
        <!--1、2、3、4步骤-->
        <div class="paybust-steps">
            <div class="paybust-steps-value active">1</div>
            <div class="paybus-steps-line active"></div>
            <div class="paybust-steps-value" :class="step >=2 ? 'active' : ''">2</div>
            <div class="paybus-steps-line" :class="step >=2 ? 'active' : ''"></div>
            <div class="paybust-steps-value" :class="step >=3 ? 'active' : ''">3</div>
            <div class="paybus-steps-line" :class="step >=3 ? 'active' : ''"></div>
            <div class="paybust-steps-value" :class="step >=4 ? 'active' : ''">4</div>
        </div>
        <div class="paybust-steps-content">
            <div class="active">申请已提交</div>
            <div :class="step >=2 ? 'active' : ''">等待付款</div>
            <div :class="step >=3 ? 'active' : ''">待确认到账</div>
            <div :class="step >=4 ? 'active' : ''">提现完成</div>
        </div>
        <!--订单信息-->
        <div class="paybus-main-wrapper" v-if="step <= 3">
            <div class="paybus-steps-form-row">
                <div class="paybus-steps-form-title">订单号:</div>
                <el-input class="paybus-steps-form-value-xx" disabled="" v-model="paybusData.dingdan"></el-input>
            </div>
            <div class="paybus-steps-form-row">
                <div class="paybus-steps-form-title">提款方式:</div>
                <el-input class="paybus-steps-form-value-xx" disabled="" v-model="paybusData.tkfs"></el-input>
            </div>
            <div class="paybus-steps-form-row">
                <div class="paybus-steps-form-title">提款卡号:</div>
                <el-input class="paybus-steps-form-value-xx" disabled="" v-model="paybusData.tkkh"></el-input>
            </div>
            <div class="paybus-steps-form-row">
                <div class="paybus-steps-form-title">提款金额:</div>
                <el-input class="paybus-steps-form-value-xx" disabled="" v-model="paybusData.tkje"></el-input>
            </div>
            <div class="paybus-steps-form-row">
                <div class="paybus-steps-form-title">提款时间:</div>
                <el-input class="paybus-steps-form-value-xx" disabled="" v-model="paybusData.tksj"></el-input>
            </div>
        </div>
        <div class="step-ok-content" v-if="step === 4">
            <div class="paybus-ok-icon"></div>
            <div class="paybus-ok-title">提现完成</div>
            <div class="paybus-ok-dd">订单号:{{paybusData.dingdan}}</div>
            <div class="paybus-ok-je">取款金额:{{paybusData.tkje}}</div>
        </div>
        <!--知道了，返回首页按钮-->
        <el-button class="bog paybus-steps-ok-btn" v-if="step <= 2" @click="close()">知道了,返回首页</el-button>
        <!--确认收款-->
        <el-button class="bog paybus-steps-ok-btn" v-if="step === 3" @click="qrsk()">确认收款</el-button>
        <!--返回-->
        <el-button class="bog paybus-steps-ok-btn"  v-if="step === 4" @click="backAndFresh()">返回</el-button>
        <div class="qr_tips" v-if="step >= 3" @click="gotoUrl">
            <span class="warn_txt">对此订单有疑问,</span>咨询客服>>
        </div>
        <!--提示-->
        <div class="paybus-main-wrapper" v-if="step <= 3">
            <div class="tips">
                <span class="tips-icon"></span>
                重要提示
            </div>
            <div class="txt">1.提现到账后,请您在规定时间内点击【确认收款】</div>
            <div class="txt">2.若未收到款项或到账金额与订单金不符,切勿点击【确认收款】</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
    name: "PaybusStep",
    props: {
        step: Number,
        paybusData: Object,
    },
    components: {
    },
    watch: {
    },
    data () {
        return {
        }
    },
    methods: {
        async qrsk() {
            const res = await this.$http.getWithdrawalConfirm({orderId: this.paybusData.id});
            if (res && res.data && res.data.code === 0) {
                this.$emit('update:step', 4)
            } else {
                this.messageTip({message:(res && res.data && res.data.msg) || '确认失败，请稍后尝试'})
            }
        },
        // 前往客服
        gotoUrl () {
            window.open(this.serUrl);
        },
        close () {
            this.$emit('update:showDialog', false)
        },
        backAndFresh () {
            this.close()
            this.$emit('getDataList')
        },
    },
    computed: {
        ...mapState({ serUrl: state => state.user.serUrl }),
    },
}
</script>

<style lang="scss" scoped>
@import "../css/PaybusStep.scss";
</style>
