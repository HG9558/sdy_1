<template>
  <div v-show="visible" class="topicPageEntry">
    <p class="closeBtn" @click="visible = false"></p>
    <p @click="handleToPage" class="topicPageEntry-title">{{$t('热门赛事')}}</p>
    <img @click="handleToPage" class="baoImg" :src="imgs.entryPcimg" />
  </div>
</template>

<script>
import { mapState } from "vuex";

const entryPcimg = require('./images/entryPc.png')
export default {
  data () {
    return {
      visible: true,
      imgs: {
        entryPcimg,
      },
    }
  },
  computed: {
    ...mapState({ token:state=>state.user.token})
  },
  methods: {
    handleToPage () {
      if (!this.isLogin) {
        this.$router.push('/login')
      } else {
        this.$router.push('/topicPage')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.topicPageEntry {
  width: 100px;
  border-radius: 25px;
  position: fixed;
  z-index: 9;
  right: 10px;
  bottom: 50px;
  cursor: pointer;
  .topicPageEntry-title {
    margin-bottom: 5px;
    font-size: 16px;
    text-align: center;
    color: #fba002;
  }
  .baoImg {
    width: 100px;
  }
  .closeBtn {
    background: url("./images/closeIcon.png") no-repeat center;
    background-size: cover;
    display: flex;
    width: 15px;
    height: 15px;
    position: absolute;
    right: 10px;
    top: -20px;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
}
</style>
