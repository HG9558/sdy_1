<template>
  <div class="sponsor-wrap">
    <div class="top">
      <img class="logo" src="./img/top-logo.png" alt="" />
    </div>
    <div class="middle"> 
      <div class="video-content">
        <el-carousel arrow="never" height="613px">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <img :src="item.picPcPath" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="about">
        <h2>关于场边广告</h2>
        <p>
          1、VINBET(浩博)从西甲第四轮开始赞助皇马、巴萨客场比赛广告牌以及意甲的所有比赛广告牌。届时，所有中文玩家都可以在电视直播中看到VINBET(浩博)的中文广告；
          <br/>
          2、在500万、中国竞彩网、竞彩乐，及国内多家巨头彩票网同时收录VINBET(浩博)赔率；
        </p>
      </div>      
    </div>    

    <div class="bottom">
      <div class="intro">
        <h2>公司介绍</h2>
        <p>
          “浩博” 主要经营旅游娱乐和网上博彩业务，是目前亚洲市场上最具公信力及最受玩家欢迎的大型博彩网站之一! <br/>
          从2009年开始提供网上娱乐服务，"浩博"一直孜孜不倦地追求技术创新，截止到2010年第四季度, “浩博”对现场游戏社区的建设投资超过七亿港元。时至今日，我们通过强大的游戏运营能力、周到细致的客户服务品质、完善的技术保障和支持 、安全高效的支付平台，创建了一个面向用户的综合性互动平台，在各方面均树立了良好的口碑，得到了业界和用户的一致认可；
        </p>
      </div>

      <img class="partner" src="./img/partner.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: "sponsor",
  data() {
    return {
      bannerList: [
        { picPcPath: require('./img/banner-1.jpg') },
        { picPcPath: require('./img/banner-2.jpg') },
        { picPcPath: require('./img/banner-3.jpg') },
      ]
    };
  },
  mounted() {},
  computed: {},
  methods: { 

  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>