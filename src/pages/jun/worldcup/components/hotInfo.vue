<template>
    <div class="hotInfo">
        <div class="list" v-if="list.length">
            <div class="item" v-for="item in list" :key="item.id" @click="goArticle(item)">
                <div class="item-left">
                    <img :src="item.titleImg" alt="">
                </div>
                <div class="item-right">
                    <div class="title"> {{item.title}} </div>
                    <p class="txt"> </p>
                    <div class="item-info">
                        <div class="item-info-left">
                            <img src="../img/avator.png" alt=""> 
                            <span> {{item.author}} </span>
                        </div>
                        <div class="item-info-right">
                            <span> {{item.createTime}} </span>
                            <span class="icon-dis"> {{item.readTotal}} </span>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination :pagination="paginationList" @change="paginationChange" v-show="!!list.length" />

        </div>
        <Loading v-else-if="isLoading" :showLoading="isLoading" />
        <div v-else class="no-data">           
            <img src="../img/no-data.png" alt="">
            <p>暂无数据</p>                 
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Pagination from "commonComponent/Pagination";

export default {
    name: 'hotInfo', 
    data() {
        return {
            list: [],
            isLoading: false,
            currPage: 1,
            pageSize: 10,
            totalCount: 0,
        }
    },
    components: {
        Pagination,
    },
    mounted() {
        this.getNewsList()
    },
    computed: {
        paginationList () {
        return {
            currentPage: this.currPage,
            pageSize: this.pageSize,
            total: this.totalCount,
        };
        },
    },
    methods: {
        ...mapMutations('game', ['set_worldcupNews']),
        getNewsList() {
            this.isLoading = true;
            const params = {
                catId: 0, 
                leagueName: "世界杯", 
                pageNo: this.currPage, 
                pageSize: this.pageSize,
            }
            this.$http.getWorldCupNews(params).then(res=>{
                this.totalCount = res.data.data?.totalCount;
                this.list = res.data.data?.list;
                this.isLoading = false;
            })
        },
        goArticle(item) {
            this.set_worldcupNews(item)
            this.$router.push({path: '/worldcup/news', query: { id: item.id }})
        },
        paginationChange({ current = 1, size = 10 }) {
            this.currPage = current;
            this.pageSize = size;
            this.getNewsList()
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../css/hotInfo.scss'
</style>