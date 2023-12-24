<template>
  <div>
    <div class="top">
      <img src="./assets/top-logo.png" alt="" />
    </div>
    <div class="middle">
      <div class="title-one">国际米兰足球俱乐部</div>
      <div class="title-two">
        <img src="./assets/left.png" alt="" />
        <div>亚洲区独家合作伙伴</div>
        <img src="./assets/right.png" alt="" />
      </div>
      <div 
        class="video-box"
      >
        <img v-show="videoChangeIndex === 1" class="video-top" src="./assets/video-top.png" alt="" />
        <!-- <video class="video" id="myPlay" controls autoplay loop muted>
          <source
            :src="videosrc"
            type="video/mp4"
          />
        </video> -->
      </div>
      <!-- <div class="video-btn">
        <div :class="{ 'btn-1': true, active: videoChangeIndex === 0 }"
          @click="changeVideo(0)"
        >
          球星拜年
        </div>
        <div :class="{ 'btn-2': true, active: videoChangeIndex === 1 }"
          @click="changeVideo(1)"
        >
          精彩视频
        </div>
      </div> -->
      <div class="word">
        <p>
          国际米兰足球俱乐部（Inter
          Milan，简称国米），是一家位于意大利伦巴第大区米兰市的足球俱乐部，成立于1908年3月9日。球队主场为梅阿查
          体育场，现征战于意大利足球甲级联赛。
        </p>
        <p>
          国际米兰是由来自“米兰板球与足球俱乐部”（即AC米兰俱乐部）的一部分会员分流出来后组建的足球俱乐部。球衣由蓝色和黑色两种主要颜色组成。
          因为俱乐部成立之初即向全世界所有球员敞开大门，所以称之为“国际”俱乐部。
        </p>
        <p>
          国际米兰曾为“意甲七姐妹”之一，也与AC米兰和尤文图斯两支球队并称为北方三强。与AC米兰这支同样来自米兰的俱乐部之间的碰撞被称为“米兰
          德比”，和来自都灵的尤文图斯之间的对决则称为“意大利国家德比”。国际米兰是唯一一支拿过五冠王（欧冠、意甲、意大利杯、意大利超级杯和世界俱乐
          部杯）的意大利联赛球队。
        </p>
      </div>
    </div>
    <div class="map-earth">
      <img class="logo-two" src="./assets/logo-two.png" alt="" />
      <p>
        2020年，{{appTitle}}正式签约赞助国际米兰足球俱乐部，成为国际米兰足球俱乐部亚洲区独家合作伙伴。
      </p>
      <p>
        此次战略合作的成功达成，是双方追逐梦想，进军国际市场具有历史意义重要的一步。
      </p>
      <p>致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，</p>
      <p>正如这个从硝烟中不断过关斩将的蓝黑军团，{{appTitle}}势必破茧成竹，</p>
      <p>成为全球范围内引领顾客体验新风潮的坚石。</p>
      <img class="sj" src="./assets/sj.png" alt="" />
      <img class="left-man" src="./assets/left-man.png" alt="" />
      <img class="right-man" src="./assets/right-man.png" alt="" />
    </div>
    <div class="bottom">
      <div class="title-one">{{appTitle}}权威认证</div>
      <div class="title-two">CERTIFICATIONAUTHORITY</div>
      <div class="logo-box">
        <div class="logo-item" v-for="(item, index) in logoList" :key="index">
          <img :src="item.img" alt="" />
          <div style="margin-top: 30px">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapState } from "vuex";
const { VUE_APP_APP_TITLE} = process.env;
export default {
  name: "sponsor",
  data() {
    return {
      logoList: [
        {
          img: require("./assets/logo-1.png"),
          name: "英国CC",
        },
        {
          img: require("./assets/logo-2.png"),
          name: "马耳他博彩牌照",
        },
        {
          img: require("./assets/logo-3.png"),
          name: "英属维尔京群岛",
        },
        {
          img: require("./assets/logo-4.png"),
          name: "菲律宾(PAGCOR)",
        },
      ],
      videoChangeIndex: 0,
      videosrc: 'https://video.51renqijie.com/video/SDY-CNY-8ver4.mp4',
      appTitle: VUE_APP_APP_TITLE,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    changeVideo(index) {
      var myVideo = document.getElementById('myPlay')
      if (this.videoChangeIndex === index)  return
      this.videoChangeIndex = index
      if (index === 0) {
        this.videosrc = 'https://video.51renqijie.com/video/SDY-CNY-8ver4.mp4' 
      } else {
        this.videosrc = 'https://video.51renqijie.com/video/SDY-Video-v1.mp4'
      }
      myVideo.src = this.videosrc
      myVideo.play()
    }
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 950px;
  background: url("./assets/top-bg.jpg") no-repeat center/cover;
  position: relative;
  img {
    position: absolute;
    width: 585px;
    top: 136px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.middle {
  width: 100%;
  height: 950px;
  background: url("./assets/middle-bg.jpg") no-repeat center center;
  padding-top: 8px;
  .title-one {
    font-size: 70px;
    font-weight: bold;
    color: $c-f;
    text-align: center;
  }
  .title-two {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    color: $c-f;
    div {
      margin: 0 12px;
    }
  }
  .video-box {
    width: 890px;
    height: 520px;
    margin: 0 auto;
    background: url("./assets/video-bg.png") no-repeat center/cover;
    background-size: cover;
    margin-top: 24px;
    position: relative;
    .video-top {
      position: absolute;
      top: -7px;
      left: 50%;
      transform: translateX(-50%);
    }
    .video {
      width: 823px;
      margin-top: 29px;
      margin-left: 33px;
      border: 0;
    }
  }
  .start {
    width: 890px;
    height: 520px;
    background: url("./assets/new-year.png") no-repeat center center;
    background-size: cover;
    .video {
      width: 754px;
      margin-top: 66px;
      margin-left: 68px;
      border: 0;
    }
  }
  .video-btn {
    display: flex;
    width: 188px;
    height: 28px;
    background: linear-gradient(0deg, #383c54, #4c537b, #383c54);
    border: 7px solid rgba(89, 96, 140, 0.26);
    border-radius: 24px;
    cursor: pointer;
    margin: 0 auto;
    .btn-1,
    .btn-2 {
      flex: 1;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 14px;
      color: $c-f;
      border-radius: 14px;
      box-shadow: 0;
    }
    .active {
      background: linear-gradient(0deg, #fb9402, #ffb83d);
      box-shadow: 0px 2px 0px 0px #cf6404, 0px 2px 6px 0px #2b2c30;
    }
  }
  .word {
    width: 1200px;
    height: 230px;
    margin: 0 auto;
    margin-top: 15px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    border-radius: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: $c-f;
    padding: 38px 13px;
    box-sizing: border-box;
    text-indent: 2rem;
  }
}
.map-earth {
  width: 100%;
  height: 586px;
  background: url("./assets/map-bg.jpg") no-repeat center center;
  background-size: cover;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: $c-f;
  position: relative;
  .sj {
    position: absolute;
    top: -100px;
    left: 0;
    width: 426px;
    height: 1425px;
  }
  .left-man {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .right-man {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .logo-two {
    width: 476px;
    // height: 116px;
    margin-top: 95px;
    margin-bottom: 44px;
  }
  p {
    line-height: 30px;
  }
}
.bottom {
  width: 100%;
  height: 814px;
  background: url("./assets/bottom-bg.jpg") no-repeat center center;
  background-size: cover;
  color: $c-f;
  text-align: center;
  .title-one {
    width: 395px;
    height: 76px;
    font-size: 48px;
    font-weight: 600;
    margin: 0 auto;
    padding-top: 56px;
    border-bottom: 3px solid $c-f;
  }
  .title-two {
    font-size: 28px;
    font-weight: 400;
    margin-top: 14px;
  }
  .logo-box {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    font-size: 28px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: $c-f;
    .logo-item {
      margin-right: 80px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>