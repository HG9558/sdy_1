<template>
    <div class="paybus-tip-dialog">
        <div class="content1">
            您当前有一笔极速提款订单待确认
        </div>
        <div class="check-btn">
            <el-button class="bog" @click="go">前往确认</el-button>
        </div>
        <div class="tips">
            <span class="tips-icon"></span>
            <span>重要提示</span>
        </div>
        <div class="tips-text">
            <p>1.提现到账后，请您在规定时间点击【确认收款】</p>
            <p>2.若未收到款项或到账金额与订单不符，切勿点击【确认收款】</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaybusStep",
    props: {
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
        go() {
            const item = {
                mark:1,
                name:"提款"
            }
            sessionStorage.setItem('transactionItem', JSON.stringify(item))
            this.$router.push('/profile/transaction')
        },
    },
    computed: {

    },
}
</script>

<style lang="scss" scoped>
@import "../css/PaybusTip.scss";
</style>
