<template>
    <div class="wolrdcup-news">
        <div class="container">
            <div class="news-head">
                <p class="location">
                    {{this.$t('当前位置：')}}
                    <router-link to='/'>{{this.$t('首页')}}</router-link> >
                    <router-link to='/worldcup'>{{this.$t('世界杯')}}</router-link> >
                    <router-link to='/worldcup?type=HotInfo'>{{this.$t('热点资讯')}}</router-link> >
                    <span class="txt-gold"> {{worldcupNews.title}} </span>
                </p>
                <p class="new-info">
                    <span>{{this.$t('作者：')}}{{worldcupNews.author}}</span>
                    <span>{{this.$t('发布时间：')}}{{worldcupNews.createTime}}</span>
                    <span>{{this.$t('阅读次数：')}}{{worldcupNews.readTotal}}</span>
                </p>
            </div>

            <div class="news-content" v-if="content">
                <div class="article" v-html="content"></div>

                <!-- <div class="sublings">
                    <div class="prev" v-if="prevData">
                        上一篇
                        <p> {{prevData.title}} </p>
                    </div>
                    <div class="next" v-if="nextData">
                        下一篇
                        <p> {{nextData.title}} </p>
                    </div>
                </div> -->

                <div class="relate-news">
                    <div class="relate-title">{{this.$t('相关文章')}}</div>
                    <div class="relate-list">
                        <div class="item" v-for="item in relateList" :key="item.id" @click="goArticle(item)">
                            <div class="item-left">
                                <img :src="item.titleImg" alt="">
                            </div>
                            <div class="item-right">
                                <div class="title"> {{item.title}} </div>
                                <p class="txt"> </p>
                                <div class="item-info">
                                    <div class="item-info-left">
                                        <img src="./img/avator.png" alt="">
                                        <span>
                                            {{item.author}}
                                        </span>
                                    </div>
                                    <div class="item-info-right">
                                        <span> {{item.createTime}} </span>
                                        <span class="icon-dis"> {{item.readTotal}} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Loading v-else-if="isLoading" :showLoading="isLoading" />

        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'news',
    data() {
        return {
            content: '',
            newList: [],
            id: null,
            // prevData: {},   // 上一篇
            curData: {},    // 当前
            // nextData: {},    // 下一篇
            relateList: [],
            isLoading: false,
        }
    },
    mounted() {
        this.initData()
    },
    computed: {
        ...mapState('game', ['worldcupNews']),
    },
    methods: {
        ...mapMutations('game', ['set_worldcupNews']),
        initData(id) {
            this.id = id ?? this.$route.query?.id ?? this.worldcupNews.id
            this.getDetail();
            this.getRelateNews()
        },
        getDetail() {
            this.isLoading = true
            this.$http.getWorldCupNewsDetail({id: this.id}).then(res=>{
                this.content = res.data?.data
                this.isLoading = false
            })
        },
        getRelateNews() {
            const params = {
                catId: 0,
                id: this.id,
                leagueName: this.$t('世界杯'),
                pageNo: 1,
                pageSize: 10
            }
            this.$http.getWorldCupNewsRelate(params).then(res=>{
                this.relateList = res.data.data?.list;
            })
        },
        goArticle(item) {
            this.set_worldcupNews(item)
            this.$router.push({path: '/worldcup/news', query: { id: item.id }})
            this.initData(item.id)
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './css/news.scss';
</style>
