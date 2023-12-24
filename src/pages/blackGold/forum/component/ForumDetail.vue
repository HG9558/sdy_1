<template>
  <div class="detail-container">
    <div class="detail-nav-container">
      <span>当前位置：</span>
      <span class="c-r" @click="$emit('update:isShowDetail', false)">首页></span>
      <span class="orange">社区</span>
    </div>

    <div class="content-detail">
      <div class="content">{{contentDetail.content}}</div>
      <div class="img-container" v-if="contentDetail.picture">
        <img :src="contentDetail.picture" alt="">
      </div>
      <div class="content-desc-container">
        <div class="content-desc_left">
          <span>发布时间：</span>
          <span>{{contentDetail.createTime | getPreviousTime}}</span>
          <span class="ml-30">浏览量：{{contentDetail.readAmount + 1}}</span>
        </div>
        <div class="content-desc_right" @click="goHomePage">
          <div class="start">
            <img class="mr-5" width="12" src="../img/star.png" alt="">
            <span>{{contentDetail.collectAmount}}</span>
          </div>
          <div class="like">
            <img class="mr-5" width="12" src="../img/like.png" alt="">
            <span>{{contentDetail.likeAmount}}</span>
          </div>
          <div class="message">
            <img class="mr-5" width="12" src="../img/callback.png" alt="">
            <span>{{contentDetail.commentAmount}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-container">
      <div class="comment-title">
        热门评论
      </div>
      <template v-if="recommendList.length && !loading">
        <div class="comment-list-container">
          <div class="comment-list" v-for="item in recommendList" :key="item.id">
            <div class="comment-content">
              <img class="avatar" :src="item.logo" alt="">
              <div class="user-profile">
                <div class="profile-title">
                  <span class="user-name">{{item.playerName}}</span>
                  <span class="time">{{item.createTime | getPreviousTime}}</span>
                </div>
                <span class="comment-text">{{item.content}}</span>
              </div>
            </div>
            <div class="callback-message c-r" @click="goHomePage">
              回复
              <img class="ml-5" width="11" src="../img/callback.png" alt="">
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <img class="no-data-img" src="../img/no_data.png" alt="" />
      </template>
    </div>
    <el-pagination v-if="totalCount>10" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="10" layout="prev, pager, next, jumper" :total="totalCount"></el-pagination>

    <div class="download-app">
      <span @click="goHomePage">下载APP</span>
      <span>
        回复...
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumDetail",
  props: {
    isShowDetail: Boolean,
    contentDetail: Object,
    isLogin: Boolean,
  },
  created () {
    this._getRecommendList();
  },
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      recommendList: [],
      totalCount: 0,
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.pageNo = page
      this._getRecommendList();
    },
    goHomePage () {
      this.$emit('goHomePage', true)
      this.$router.push('/')
    },
    //- 获取铁子评论列表
    async _getRecommendList () {
      const res = await this.$http[this.isLogin ? 'listPostComment' : 'listPostCommentGuest']({ pageNo: this.pageNo, pageSize: this.pageSize, postId: this.contentDetail.id })
      if (res.data.code) return
      this.recommendList = res.data.data.list;
      this.totalCount = res.data.data.totalCount;
    }
  },
}
</script>

<style scoped lang="scss">
@import "../css/ForumDetail.scss";
</style>