<template>
  <div class="topicPage">
    <div class="topicPage-nav">
      <div class="topicPage-Tabs">
        <div @click="handleChangeTab(67)" class="topicPage-Tab" :class="{'topicPage-Tab__active': topicPageActiveTab === 67}">2021欧洲杯</div>
        <div @click="handleChangeTab(224)" class="topicPage-Tab" :class="{'topicPage-Tab__active': topicPageActiveTab === 224}">2021美洲杯</div>
      </div>

      <div class="topicPage-innerTabs">
        <div @click="handleChangeInnerTab(0)" class="topicPage-innerTab" :class="{'topicPage-innerTab__active': topicPageActiveInnerTab === 0}">积分</div>
        <div @click="handleChangeInnerTab(1)" class="topicPage-innerTab" :class="{'topicPage-innerTab__active': topicPageActiveInnerTab === 1}">赛程</div>
      </div>
    </div>

    <div class="topicPage-content">
      <scope v-show="topicPageActiveInnerTab === 0" :data="scopeData" />
      <course v-show="topicPageActiveInnerTab === 1" :data="courseData" />
    </div>
  </div>
</template>

<script>
import Scope from './Scope'
import Course from './Course'
import { mapState } from "vuex";

export default {
  components: {
    Scope,
    Course,
  },
  data () {
    return {
      scopeData: [],
      courseData: [],
      gameData: null,
    }
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.getData({ type: this.topicPageActiveTab })
      }
    }
  },
  methods: {
    getData (params) {
      this.$http.getCupScore(params).then(res => {
        this.scopeData = res.data.data || []
      })
      this.$http.getCupSchedule({ params }).then(res => {
        res = res.data.data || [];
        this.courseData = res.map(item => ({ ...item, showDetails: true }))
      })
    },
    handleChangeTab (value) {
      this.$store.commit('setTopicPageActiveTab', value)
      this.getData({ type: this.topicPageActiveTab })
    },
    handleChangeInnerTab (value) {
      this.$store.commit('setTopicPageActiveInnerTab', value)
    },
  },
  computed: {
    ...mapState({
      topicPageActiveTab: state => state.home.topicPageActiveTab,
      topicPageActiveInnerTab: state => state.home.topicPageActiveInnerTab,
    })
  },
}
</script>

<style lang="scss" scoped>
.topicPage {
  min-height: 100vh;
  background: url("./images/bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  .topicPage-nav {
    padding-top: 80px;
    width: 1200px;
    margin: 0 auto;
    .topicPage-Tabs {
      margin: 24px 0;
      display: flex;
      align-items: center;
      .topicPage-Tab {
        cursor: pointer;
        width: 220px;
        height: 54px;
        line-height: 54px;
        border-radius: 24px;
        font-size: 30px;
        color: $c-f;
        text-align: center;
        &:first-child {
          margin-right: 10px;
        }
        &.topicPage-Tab__active {
          background: linear-gradient(90deg, #fba002 0%, #ff4840 100%);
        }
      }
    }
    .topicPage-innerTabs {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 50px auto 30px auto;
      width: 400px;
      height: 36px;
      line-height: 36px;
      .topicPage-innerTab {
        flex: 1;
        background: #3d4154;
        font-size: 14px;
        color: $c-f;
        text-align: center;
        &:first-child {
          border-radius: 10px 0 0 10px;
        }
        &:last-child {
          border-radius: 0 10px 10px 0;
        }
        &.topicPage-innerTab__active {
          background: #fba002;
        }
      }
    }
  }
  .topicPage-content {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
