<template>
    <div class="pointData">
        <div class="head">
            2022世界杯
            <p>2022 World Cup</p>
        </div>
        <div class="list" v-if="list.length">
            <div class="list-group" v-for="items in list" :key="items.group">
                <div class="list-group-head">
                    <span> {{items.group}} </span>
                    <span>赛</span>
                    <span>胜</span>
                    <span>负</span>
                    <span>平</span>
                    <span>进/失</span>                    
                    <span>积分</span>                    
                </div>
                <div class="list-group-item" v-for="(item, index) in items.scoreList" :key="item.matchId">
                    <span>
                        {{index + 1}} 
                        <img class="team-logo" :src="item.teamLogo" alt="logo"> 
                        {{item.teamName}}
                    </span>
                    <span> {{item.totalCount}} </span>
                    <span> {{item.winCount}} </span>
                    <span> {{item.loseCount}} </span>
                    <span> {{item.drawCount}} </span>
                    <span> {{item.getScore}} / {{item.loseScore}}</span>
                    <span> {{item.integral}} </span>
                </div>
            </div>
        </div>

        <Loading v-else-if="isLoading" :showLoading="isLoading" />

        <div v-else class="no-data">           
            <img src="../img/no-data.png" alt="">
            <p>暂无数据</p>                 
        </div>
    </div>
</template>
<script> 

export default {
    name: 'pointData', 
    data() {
        return {
            list: {},
            isLoading: false,
        }
    },
    mounted() {
        this.getData()
    },
    methods: { 
        getData() { 
            this.isLoading = true;
            this.$http.getWorldCupScore().then(res=>{
                this.list = res.data?.data;
                this.isLoading = false;
            })

        }
    }
}
</script>
<style lang="scss" scoped>
 @import '../css/pointData.scss';
</style>