<template>
  <div class="cockfighting-guide">
    <div class="cockfighting-guide-content">
      <div class="guide-header">
        <img @click="$router.go(-1)" :src="useCommonImgPath(`specialGamePage/wgb/guide/icon-back_${globalState.language}.png`)" class="guide-header-back" />
        <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-tit_${globalState.language}.png`)" class="guide-header-title" />
      </div>

      <div class="guide-content">
        <div v-show="activeIndex === 1" class="guide-section guide-section-1">
          <div class="section-title">{{ $t_c('游戏规则-数值介绍') }}</div>
          <div class="guide-section-1-content">
            <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-1.png`)" alt="" class="guide-section-1-img" />
            <div class="guide-section-1-desc">
              <div class="guide-section-1-item">
                <span>{{ $t_c('1.比赛时间：') }}</span>{{ $t_c('60秒倒计时') }}
              </div>
              <div class="guide-section-1-item">
                <span>{{ $t_c('2.数值介绍') }}</span>
                <ul>
                  <li>
                    <span>HITS：</span>{{ $t_c('有效攻击次数') }}
                  </li>
                  <li>
                    <span>FORCE：</span>{{ $t_c('最近一次的攻击使用的牛顿力') }}
                  </li>
                  <li>
                    <span>MAX FORCE：</span>{{ $t_c('最强大的一次攻击的牛顿力') }}
                  </li>
                  <li>
                    <span>TOTAL FORCE：</span>{{ $t_c('本场比赛产生的总牛顿力') }}
                  </li>
                  <li>
                    <span>{{ $t_c('牛顿力：') }}</span>{{ $t_c('斗鸡攻击对方所产生的力量') }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeIndex === 2" class="guide-section guide-section-1">
          <div class="section-title">{{ $t_c('游戏规则-下注') }}</div>
          <div class="guide-section-2-content">
            <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-2.png`)" alt="" class="guide-section-2-img">
            <div class="guide-section-2-desc">
              <div class="guide-section-2-item">
                <p>{{ $t_c('玩家有以下选择：') }}</p>
                {{ $t_c('1.白方：白方总力量值高于红方；2.红方：红方总力量值高于白方；3.平局：红白双方在60秒内未产生任何有效攻击') }}
              </div>

              <div class="guide-section-2-item">
                <p>{{ $t_c('赔率算法：') }}</p>
                {{ $t_c('92%=1.92倍 假设玩家下注100红方，并且红方胜，红方将会获得：100*192%=192') }}
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeIndex === 3" class="guide-section guide-section-3">
          <div class="section-title">{{ $t_c('如何确保牛顿力的计算准确？') }}</div>
          <div class="guide-section-3-content">
            <div class="guide-section-3-item">
              <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-3_1.png`)" alt="" class="guide-section-item-img">
              <div class="guide-section-3-item_mask"></div>
              <p>{{ $t_c('连接到黑匣子的无线牛顿力传感器可准确评分') }}</p>
            </div>

            <div class="guide-section-3-item">
              <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-3_2.png`)" alt="" class="guide-section-item-img">
              <div class="guide-section-3-item_mask"></div>
              <p>{{ $t_c('特殊形状的特殊射频可保护数据并消除误击') }}</p>
            </div>

            <div class="guide-section-3-item">
              <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-3_3.png`)" alt="" class="guide-section-item-img">
              <div class="guide-section-3-item_mask"></div>
              <p>{{ $t_c('数码手套的合法政府专利') }}</p>
            </div>

            <div class="guide-section-3-item">
              <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-3_4.png`)" alt="" class="guide-section-item-img">
              <div class="guide-section-3-item_mask"></div>
              <p>{{ $t_c('数字手套点击按钮的设计是不会碰到地板') }}</p>
            </div>

          </div>
        </div>

        <div v-show="activeIndex === 4" class="guide-section guide-section-4">
          <div class="section-title">{{ $t_c('如何确保比赛的稳定性？') }}</div>
          <div :class="[ 'guide-section-4-content', globalState.language ]">
            <div class="guide-section-4-tag">{{ $t_c('拥有8家斗鸡养殖基地') }}</div>
            <div class="guide-section-4-tag">{{ $t_c('配备专业的兽医团队') }}</div>
            <div class="guide-section-4-tag">{{ $t_c('60秒快速战斗减少斗鸡死亡') }}</div>
            <div class="guide-section-4-tag">{{ $t_c('无任何刀片装备  保证比赛绿色') }}</div>

            <div>
              <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-4_1.png`)" alt="" class="guide-section-item-img">
              <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-4_2.png`)" alt="" class="guide-section-item-img">
              <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-4_3.png`)" alt="" class="guide-section-item-img">
            </div>
          </div>
        </div>

        <div v-show="activeIndex === 5" class="guide-section guide-section-5">
          <div class="section-title">{{ $t_c('斗鸡的起源与发展') }}</div>
          <div class="guide-section-5-content">
            <img :src="useCommonImgPath(`specialGamePage/wgb/guide/guide-section-5.png`)" alt="" class="guide-section-5-img">
            <div class="guide-section-5-desc">
              <p>{{ $t_c('斗鸡游戏起源于亚洲，流行于东南亚，并传播到世界各地，特别是在宗教和神话中，它与多种信仰和宗教祭祀系统密切相关。根据历史研究，它在中国有2800多年的历史。几乎全世界都有斗鸡娱乐的传统。鸡还被用作东方文化的吉祥物，是十二生肖之一和六畜之一。中国也是世界上驯化斗鸡的古老国家之一。') }}</p>

              <p>{{ $t_c('在印度尼西亚的巴厘岛上，有些男人一天只做三件事：崇拜、发呆和斗鸡。在柬埔寨的吴哥窟，你可以看到斗鸡的石雕......舞动的爪子，飞向空中，剔除，铁蹄如利刃，十步一流血。在菲律宾斗鸡界还有一个古老而经典的问题--"房子着火了，应该先救谁？"菲律宾斗鸡爱好者们也给出了答案。"先救公鸡，再救妻子。') }}</p>

              <p>{{ $t_c('在越南，Ayam Boxing（斗鸡拳）或Hong Chicken Boxing，这种武术模仿斗鸡的姿势。在圣安德烈斯岛以及古巴、墨西哥、秘鲁和巴西等其他拉美地区，斗鸡是一种非常受欢迎的消遣方式。') }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="guide-page">
        <img v-show="activeIndex > 1" @click="handleChangePageIndex('prev')" :src="useCommonImgPath(`specialGamePage/wgb/guide/prev_${globalState.language}.png`)" />
        <img class="next" v-show="activeIndex < 5" @click="handleChangePageIndex('next')" :src="useCommonImgPath(`specialGamePage/wgb/guide/next_${globalState.language}.png`)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useCommonImgPath } from '@/hook/usePath'

  const globalState = useGlobalState()

  const activeIndex = ref(1)
  const handleChangePageIndex = (t: string) => {
    if (t === 'next') {
      activeIndex.value += 1
    } else {
      activeIndex.value -= 1
    }
  }

  const guideBg = `url(${useCommonImgPath('specialGamePage/wgb/guide/guide-bg.png')})`

</script>

<style lang="scss" scoped>
.cockfighting-guide {
  color: #fff;
  background: v-bind(guideBg) no-repeat center center;
  background-size: 100% 100%;
  .cockfighting-guide-content {
    position: relative;
    margin: 0 auto;
    width: 1200px;
    min-height: 658px;
    padding-bottom: 85px;
    .guide-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .guide-header-back {
        width: 184px;
        height: 40px;
        cursor: pointer;
      }
      .guide-header-title {
        margin-left: 166px;
        width: 500px;
        height: 86.21px;
      }
    }
    .guide-content {
      .guide-section {
        .section-title {
          margin-bottom: 5px;
          font-size: 26px;
          line-height: 36px;
        }
      }
      .guide-section-1-content {
        @include flex();
        .guide-section-1-img {
          width: 759.38px;
          height: 427.5px;
        }
        .guide-section-1-desc {
          padding: 37px 0 37px 18px;
          width: 421.88px;
          height: 427.5px;
          background: rgba(92, 92, 103, 0.3);
          border: 4px solid #302F37;
          border-radius: 5px;
          line-height: 50px;
          overflow-y: auto;
          .guide-section-1-item {
            &:first-child {
              margin-bottom: 10px;
            }
            font-size: 26px;
            line-height: 47px;
            li {
              font-size: 20px;
              line-height: 47px;
              color: #9A9A9A;
              span {
                color: #FFFFFF;
              }
            }
          }
        }
      }
      .guide-section-2-content {
        .guide-section-2-img {
          margin-bottom: 5px;
          width: 100%;
          height: 267px;
        }
        .guide-section-2-desc {
          padding: 8px 28px;
          background: #1F1F21;
          .guide-section-2-item {
            margin-bottom: 15px;
            font-size: 16px;
            color: #C1C2C4;
            p {
              margin-bottom: 10px;
              font-size: 18px;
              color: #FFFFFF;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .guide-section-3-content {
        display: flex;
        flex-wrap: wrap;
        .guide-section-3-item {
          position: relative;
          margin-right: 32px;
          width: 584px;
          height: 194px;
          border: 3px solid #EBDFCB;
          border-radius: 5px;
          &:nth-child(1), &:nth-child(2) {
            margin-bottom: 22px;
          }
          &:nth-child(2), &:nth-child(4) {
            margin-right: 0;
          }
          .guide-section-3-item_mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 22.53%, #000000 100%);
          }
          img {
            width: 100%;
            height: 100%;
          }
          p {
            position: absolute;
            bottom: 20px;
            width: 100%;
            font-size: 24px;
            text-align: center;
          }
        }
      }
      .guide-section-4-content {
        .guide-section-item-img {
          margin-right: 50px;
          width: 366px;
          height: 290px;
          &:last-child {
            margin-right: 0;
          }
        }
        &:has(.zh, .zh_tw) {
          .guide-section-4-tag {
            min-width: 292px;
          }
        }
        .guide-section-4-tag {
          margin-bottom: 30px;
          margin-right: 10px;
          display: inline-block;
          padding: 0 10px;
          height: 40px;
          line-height: 35px;
          border-radius: 10px;
          border: 3px solid #EDE0CD;
          font-weight: 600;
          font-size: 19px;
          text-align: center;
          color: #F2DCB1;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .guide-section-5-content {
        position: relative;
        display: flex;
        .guide-section-5-img {
          position: absolute;
          top: -85px;
          right: 0;
          width: 524px;
          height: 524px;
        }
        .guide-section-5-desc {
          position: relative;
          z-index: 1;
          padding: 20px 25px;
          width: 730px;
          height: 380px;
          overflow-y: auto;
          background: rgba(92, 92, 103, 0.3);
          border: 4px solid #302F37;
          border-radius: 5px;
          font-weight: 400;
          font-size: 15px;
          line-height: 30px;
          color: #E3F1F1;
          P {
            margin-bottom: 15px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .guide-page {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: space-between;
      bottom: 40px;
      right: 0;
      img {
        margin-right: 20px;
        width: 112px;
        height: 30px;
        cursor: pointer;
        &.next {
          margin-left: auto;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  ::-webkit-scrollbar-track-piece {
    -webkit-border-radius: 0
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #555555;
    -webkit-border-radius: 6px;
    outline-offset: -2px;
    filter: alpha(opacity = 50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5
  }
}
</style>
