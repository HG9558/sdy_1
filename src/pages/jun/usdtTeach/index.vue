<template>
    <div class="usdt-teach">
        <div class="contaienr">
            <h1>{{$t('USDT充值教程')}} <span class="close el-icon-close" @click="$router.go(-1)"></span> </h1>
            <template v-if="isVvi">
							<div class="step-one"></div>
							<div class="step-two"></div>
							<div class="step-three"></div>
							<div class="step-four"></div>
						</template>
						<template v-else>
							<div class="step step1"></div>
							<div class="step step2"></div>
							<div class="step step3"></div>
							<div class="step step4"></div>
							<div class="step step5"></div>
							<div class="step step6"></div>
							<div class="step step7"></div>
						</template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'USDT-Tutorial',
		computed: {
			isVvi () {
				const { VUE_APP_APP_SIGN } = process.env
				return VUE_APP_APP_SIGN === 'vvi'
			},
		},
}
</script>
<style lang="scss" scoped>
    @import "./index.scss"
</style>
