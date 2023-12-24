<template>
  <div class="sponsor">
    <div class="sponsor-box1">
      <div class="sponsor-box1-inner">
        <img class="sponsor-box1-inner-left" :src="siteImgMap.logo" alt="">
        <div class="sponsor-box1-inner-right">
          <img src="./images/box1-inner-logo.png" alt="">
          <div v-if="isEnLanguage" style="text-align: center; font-size: 18px">
            <p>Official Partner of</p>
            <p>Paris Saint-Germain Football Club</p>
          </div>
          <span v-else>{{$t('巴黎圣日耳门足球俱乐部官方合作伙伴')}}</span>
        </div>
      </div>
    </div>
    <div class="sponsor-box2">
      <h1>{{$t('巴黎圣日耳门足球俱乐部')}}</h1>
      <div class="sponsor-box2-inner">
        <div class="sponsor-box2-inner-title">
          <span>{{$t('亚洲区独家合作伙伴')}}</span>
        </div>
        <div class="sponsor-box2-video-title">{{$t('精彩赛事')}}</div>
      </div>
      <div class="sponsor-box2-desc">
        {{$t('巴黎圣日耳曼足球俱乐部（Paris Saint-Germain F.C.，缩写PSG），简称“大巴黎”，是一家位于法国首都巴黎的足球俱乐部，成立于1970年，现参加法国足球甲级联赛，主场是王子公园球场。巴黎圣日耳曼足球俱乐部于1970年由一群当地的商人成立，起初球队的名字叫做巴黎足球俱乐部。1970/71赛季，球队在第一个赛季就成功进入法国的顶级联赛。尽管连续两个赛季待在顶级联赛，但球队却开始产生分裂。巴黎圣日耳曼从巴黎足球俱乐部中分裂出来，巴黎队继续征战顶级联赛，而巴黎圣日耳曼却进入了法国第三级别联赛。但巴黎圣日耳曼在两年的时间里完成二连跳，成功回到顶级联赛的舞台')}}
      </div>
    </div>
    <div class="sponsor-box3">
      <div class="sponsor-box3-logo">
        <img :src="siteImgMap.logo" alt="">
      </div>
      <div class="sponsor-box3-inner">
        <div class="sponsor-box3-inner-text">
          <p>{{$tt('2020年，xxx正式签约赞助巴黎圣日耳曼足球俱乐部， 成为巴黎圣日耳曼足球俱乐部亚洲区独家合作伙伴。')}}</p>
          <p>{{$t('此次战略合作的成功达成，是双方追逐梦想，进军国际市场具有历史意义重要的一步。')}}</p>
          <p>{{$tt('致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，正如这个从硝烟中不断过关斩将的蓝黑军团，xxx势必破茧成竹，成为全球范围内引领顾客体验新风潮的坚石。')}}</p>
        </div>
      </div>
    </div>
    <div class="sponsor-box4">
      <h1>{{$tt('xxx权威认证')}}</h1>
      <div class="sponsor-box4-inner">
        <div class="sponsor-box4-inner-title">CERTIFICATION AUTHORITY</div>
        <div class="sponsor-box4-inner-box">
          <div v-for="item in logoList" :key="item.name" class="sponsor-box4-inner-box-item">
            <img :src="item.img" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import siteImgMap from '@/configs/siteImgMap'
import { mapGetters } from "vuex";

export default {
  name: "sponsor",
  data() {
    return {
      siteImgMap,
      logoList: [
        {
          img: require("./images/logo-1.png"),
          name: this.$t('英国GC监督委员会'),
        },
        {
          img: require("./images/logo-2.png"),
          name: this.$t('马耳他牌照(MGA)认证'),
        },
        {
          img: require("./images/logo-3.png"),
          name: this.$t('英属维尔京群岛(BVI)认证'),
        },
        {
          img: require("./images/logo-4.png"),
          name: this.$t('菲律宾(PAGCOR)认证'),
        },
      ],
    };
  },
  computed:{
    ...mapGetters('global', ['isEnLanguage']),
  },
};
</script>

<style lang="scss" scoped>
  .sponsor {
    padding-top: 132px;
    padding-bottom: 132px;
    background: #0E1014;
    color: #ADB3D1;
    text-align: center;
    overflow: hidden;
  }
  .sponsor-box1 {
    position: relative;
    height: 950px;
    background: url("./images/1.png") no-repeat center center;
    background-size: 1920px auto;
    .sponsor-box1-inner {
      position: absolute;
      top: 710px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 70px;
      width: 894px;
      height: 120px;
      .sponsor-box1-inner-left {
        margin-right: 100px;
        width: 270px;
      }
      .sponsor-box1-inner-right {
        position: relative;
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 28px;
        color: #C9CCDD;
        text-align: left;
        &::before {
          position: absolute;
          left: -50px;
          content: '';
          width: 1px;
          height: 42px;
          background: #4C4F64;
        }
        img {
          margin-right: 10px;
          width: 84px;
          height: 84px;
        }
      }
    }
  }
  .sponsor-box2 {
    h1 {
      line-height: 126px;
      font-weight: 700;
      font-size: 72px;
      background: linear-gradient(180deg, #F5E1AB 0%, #D0B28E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .sponsor-box2-inner {
      position: relative;
      height: 667px;
      background: url("./images/2.png") no-repeat center center;
      background-size: 1920px auto;
    }
    .sponsor-box2-inner-title {
      position: absolute;
      top: -2.5px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      font-size: 28px;
      line-height: 40px;
      letter-spacing: 0.04em;
      color: #FFFFFF;
      span {
        position: relative;
        &::before, &::after {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          width: 82px;
          height: 9px;
          background: url("./images/h2-img.png") no-repeat center center;
        }
        &::before {
          left: -120px;
        }
        &::after {
          right: -120px;
          transform: translateY(-50%) rotate(-180deg);
        }
      }
    }
    .sponsor-box2-video-title {
      margin-left: -8px;
      position: absolute;
      top: 46px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      font-size: 20px;
      line-height: 40px;
      letter-spacing: 0.05em;
      color: #FFFFFF;
    }
    .sponsor-box2-desc {
      margin: 0 auto;
      padding: 20px 0;
      width: 1200px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      letter-spacing: 0.05em;
    }
  }
  .sponsor-box3 {
    .sponsor-box3-logo {
      position: relative;
      margin: 30px auto;
      width: 270px;
      img {
        width: 100%;
      }
      &::before, &::after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        content: '';
        width: 82px;
        height: 9px;
        background: url("./images/h2-img.png") no-repeat center center;
      }
      &::before {
        left: -120px;
      }
      &::after {
        right: -120px;
        transform: translateY(-50%) rotate(-180deg);
      }
    }
    .sponsor-box3-inner {
      overflow: auto;
      position: relative;
      height: 825px;
      background: url("./images/3.png") no-repeat center center;
      background-size: 1920px auto;
      .sponsor-box3-inner-text {
        margin: 70px auto 0;
        padding: 98px 28px;
        box-sizing: border-box;
        width: 1035px;
        height: 560px;
        font-weight: 400;
        font-size: 30px;
        line-height: 48px;
        color: #FFFFFF;
        text-align: left;
      }
    }
  }
  .sponsor-box4 {
    h1 {
      font-weight: 700;
      font-size: 72px;
      line-height: 126px;
      background: linear-gradient(180deg, #F5E1AB 0%, #D0B28E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .sponsor-box4-inner {
      overflow: auto;
      position: relative;
      height: 688px;
      background: url("./images/4.png") no-repeat center center;
      background-size: 1920px auto;
      .sponsor-box4-inner-title {
        font-size: 24px;
        font-weight: 400;
        line-height: 40px;
        text-align: center;
        letter-spacing: 0.03em;
        color: #FFFFFF;
      }
      .sponsor-box4-inner-box {
        display: flex;
        justify-content: space-between;
        padding: 100px 110px;
        margin: 100px auto 0 auto;
        box-sizing: border-box;
        width: 1118px;
        height: 433px;
        background: url("./images/4-inner.png") no-repeat center center;
        background-size: cover;
        .sponsor-box4-inner-box-item {
          width: 154px;
          height: 154px;
          text-align: center;
          img {
            margin: 0 auto 18px auto;
            display: block;
            width: 154px;
            height: 154px;
          }
          span {
            font-size: 22px;
            line-height: 40px;
            text-align: center;
            color: #A4ACD6;
          }
        }
      }
    }
  }

  .multi-language {
    .sponsor-box3 .sponsor-box3-inner .sponsor-box3-inner-text {
      padding-top: 90px;
      font-size: 24px;
    }
  }
  .language-ms {
    .sponsor-box3 .sponsor-box3-inner .sponsor-box3-inner-text {
      padding-top: 65px;
    }
  }
</style>
