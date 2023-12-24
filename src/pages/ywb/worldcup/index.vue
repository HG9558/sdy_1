<template>
    <div class="worldcup_wrap">
        <router-view></router-view>
        <div class="banner"></div>
        <div class="adron">
            <img src="./img/adron-left.png" alt="">
            <img src="./img/adron-right.png" alt="">
        </div>
        <div class="worldcup_container">
            <div class="content">

                <div class="tab">
                    <div :class="['tab-item', {'on': item.cName === curComponent} ]"
                        v-for="item in tabData" :key="item.name"
                        @click="onChangeTab(item.cName)"
                    >
                        {{item.name}}
                    </div>
                </div>

                <component :is='curComponent'></component>

            </div>
        </div>
    </div>
</template>
<script>
import AllTeam from './components/allTeam.vue'
import PointData from './components/pointData.vue'
import HotInfo from './components/hotInfo.vue'
export default {
    name: 'worldcup',
    components: { AllTeam, PointData, HotInfo },
    data() {
        return {
            tabData: [
                { name: this.$t('全部球队'), cName: 'AllTeam'},
                { name: this.$t('积分数据'), cName: 'PointData'},
                { name: this.$t('热点资讯'), cName: 'HotInfo'},
            ],
            curComponent: 'AllTeam'
        }
    },
    created() {
        this.onLoad()
    },
    methods: {
        onChangeTab(name) {
            this.curComponent = name;
        },
        onLoad() {
            let { type } = this.$route.query
            this.curComponent = type ?? 'AllTeam'
        }
    },
}
</script>
<style lang="scss" scoped>
    @import './css/index.scss'
</style>
