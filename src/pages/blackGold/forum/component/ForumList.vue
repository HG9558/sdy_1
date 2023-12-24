<template>
  <div class="forum-list-container">
    <div class="list-title">
      <div class="title-icon">
      </div>
      <span class="title-text">{{currentTitle}}</span>
    </div>
    <div class="forum-item-wrapper">
      <div class="forum-list-item" v-for="(item,index) in renderList" :key="index">
        <div class="item-title-container">
          <div class="user-profile">
            <img :src="item.logo" class="user-icon" alt="">
            <div class="user-name">{{item.playerName}}</div>
          </div>
          <div class="forum-desc">
            <div class="time">{{item.updateTime | getPreviousTime}}</div>
            <div class="like-num" @click="goHomePage">
              <img src="../img/like.png" class="like-icon" alt="">
              <span>{{item.likeAmount}}</span>
            </div>
            <div class="rating-num" @click="goHomePage">
              <img class="rating-img" src="../img/rating.png" alt="">
              <span>{{item.commentAmount}}</span>
            </div>
          </div>
        </div>
        <div class="item-content-container" @click="$emit('goDetail',item)">
          <div class="content-main">
            <div class="content">
              {{item.title || item.content}}
            </div>
            <div class="classify-tag">
              {{item.type || '暂无' }}
            </div>
          </div>
          <img :src="item.picture" class="user-send-img" alt="">
        </div>
      </div>
      <el-pagination v-if="listTotal>10" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="10" layout="prev, pager, next, jumper" :total="listTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumList.vue",
  props: {
    forumList: Array,
    currentTitle: String,
    classifyList: Array,
    pageNo: Number,
    listTotal: Number
  },
  data () {
    return {
      mapData: {
        pageNo: 1
      }
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.$emit('changePage', page)
    },
    goHomePage () {
      this.$emit('goHomePage', true);
      this.$router.push('/')
    }
  },
  computed: {
    renderList () {
      const tempArr = JSON.parse(JSON.stringify(this.forumList))
      tempArr.sort((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()).forEach(item => {
        this.classifyList.forEach(classifyItem => {
          classifyItem.id === item.circle && (item.type = classifyItem.name)
        })
      })
      return tempArr
    }
  }
}
</script>

<style scoped lang="scss">
@import "../css/ForumList.scss";
</style>