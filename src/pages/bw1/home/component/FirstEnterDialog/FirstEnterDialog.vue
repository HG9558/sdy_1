<template>
  <global-dialog title="消息栏" :showDialog.sync="showDialog" :hasSelfFooter="true" class="unbing-dialog" :width="'684px'">
    <div class="notList">
      <el-tabs tab-position="left"> 

        <el-tab-pane :label="item.title" v-for="item in popUpList" :key="item.title">
          <div class="notice-wrapper"> 
            <img v-if="item.picPcPath" class="notice-img" :src="item.picPcPath" alt="" > 
            <div class="btn-group">
              <el-button v-if="item.outStation || item.activityId" @click="goTargetLink(item)" class="yszjl btn-detail" type="default">查看详情</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="item.noticeTitle" v-for="(item,index) in newNoticeList" :key="index">
          <div class="notice-wrapper">
            <img v-if="item.pcPath" class="notice-img-other" :src="item.pcPath" alt=""> 
            <div class="notice-content" v-html="item.noticeContent"></div>
          </div>
        </el-tab-pane>
        
      </el-tabs> 
    </div>
  </global-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "FirstEnterDialog",
  props: {
    noticeList: Array,
    popUpList: Array
  },
  data () {
    return { 
    }
  },
  computed: {
    showDialog: {
      get () {
        return !!this.newNoticeList.length && this.$store.state.home.firstOpen || !!this.popUpList.length && this.$store.state.home.firstOpen
      },
      set () {
        this.$store.commit('home/set_first_open', false)
      }
    },
    newNoticeList () {
      let tempArr = JSON.parse(JSON.stringify(this.noticeList));
      tempArr.map(item => item.noticeContent && (item.noticeContent = item.noticeContent.replace(/\n/g, "<br/>")))
      tempArr = tempArr.filter(item => item.showType != 0);
      return tempArr;
    }
  },
  methods: {
    ...mapMutations('normal', ['set_link_data']), 
    goTargetLink (item) {
      if (item.activityId) {
        this.set_link_data({ bannerLink: true, id: item.actId, activityId: item.activityId })
        this.$router.push('/discount');
      } else {
        window.open(item.outStation.startsWith('http') ? item.outStation : '//' + item.outStation)
      }
    }
  }
}
</script>

<style lang="scss" >
@import "./FirstEnterDialog.scss";
</style>