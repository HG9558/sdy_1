<template>
  <div class="partner-contact">
    <div class="partner-title">
      <h1>{{$tt('appText')}}{{$t('合营计划')}}</h1>
      <h2>Partnership plan</h2>
      <p>{{$t('冲破一切的束缚，成为自己的传奇！')}}</p>
    </div>

    <div class="contact-box">
      <div :key="index" class="contact-item" v-for="(item, index) in renderCopyList">
        <div class="contact-item-bg">
          <div class="circle-bg">
            <img class="hy-logo" :src="item.url" alt="logo" />
          </div>
          <div>{{ item.title }}</div>
        </div>
        <div class="copy-btn" v-for="(childItem, index) in item.text" :key="childItem + ` ${index}`">
          <span class="copy-btn-text">{{ childItem }}</span>
          <span class="copy-click" v-clipboard:copy="childItem" v-clipboard:success="firstCopySuccess">{{$t('复制')}}</span>
        </div>
      </div>
    </div>

    <div v-if="showAgentBtn" class="agent" @click="goAgt">
      {{$t('登录代理系统')}}
    </div>

    <el-dialog :show-close="false" :visible.sync="isShowCopy" center top="400px" width="182px">
      <div class="dialog-result">
        <span>{{$t('复制成功')}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    props: {
      showAgentBtn: {
        type: Boolean,
        default: true
      },
    },
    computed: {
      ...mapState('global', ['language']),
      ...mapState({
        stationSetting: state => state.global.stationSetting,
      }),
      copyList () {
        if (!this.stationSetting) return []
        let tempList = [
          { name: "configSkype", url: "", text: '', title: '' },
          { name: "configTelegram", url: "", text: '', title: '' },
          { name: "configFlygram", url: "", text: '', title: '' }];
        return tempList.filter(item => this.stationSetting[item.name]);
      },
      renderCopyList () {
        return this.copyList.map(item => {
          if (this.stationSetting) {
            switch (item.name) {
              case "configSkype":
                item.text = this.filterNull(this.stationSetting.configSkype.split(','))
                item.url = this.stationSetting.pcIconSkype;
                item.title = this.stationSetting.titleSkype
                break;
              case "configTelegram":
                item.text = this.filterNull(this.stationSetting.configTelegram.split(','))
                item.url = this.stationSetting.pcIconTelegram;
                item.title = this.stationSetting.titleTelegram
                break;
              case "configFlygram":
                item.text = this.filterNull(this.stationSetting.configFlygram.split(','))
                item.url = this.stationSetting.pcIconFlygram;
                item.title = this.stationSetting.titleFlygram
                break;
            }
          }
          return item;
        })
      },
    },
    data () {
      return {
        isShowCopy: false,
      };
    },
    methods: {
      goAgt () {
        if (this.isLogin) {
          if (process.env.VUE_APP_TOOGLETO_DOMAIN) {
            window.open(`${process.env.VUE_APP_TOOGLETO_DOMAIN}/#/login?username=${this.userInfo.loginName}`)
          }
        } else {
          this.$router.push({ path: '/login' })
        }
      },
      firstCopySuccess () {
        this.isShowCopy = true;
      },
      filterNull (arr) {
        return arr.filter(val => val && val.trim())
      }
    },
  };
</script>

<style lang="scss" scoped>
  .partner-contact {
    margin: 0 auto;
    width: 584px;
    .partner-title {
      position: relative;
      text-align: center;
      white-space: nowrap;
      @include primary-text;
      h1 {
        font-weight: 600;
        font-size: 36px;
        line-height: 50px;
        &::before, &::after {
          position: absolute;
          content: '';
          width: 126px;
          height: 46px;
          background: url("./img/partner-title-img-l.png") no-repeat center center;
          background-size: contain;
        }
        &::before {
          transform: translateX(-110%);
        }
        &::after {
          transform: translateX(10%);
          width: 153px;
          background: url("./img/partner-title-img-r.png") no-repeat center center;
          background-size: contain;
        }
      }
      h2 {
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: 0.68em;
        text-transform: uppercase;
      }
      p {
        margin-top: 10px;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
      }
    }
    .contact-box {
      @include flex();
      margin-top: 45px;
      font-size: 12px;
      font-weight: 400;
      align-items: normal;
      .contact-item {
        width: 162px;
        min-height: 223px;
        background: #27553F;
        color: #FFFFFF;
        background-size: cover;
        border-radius: 15px;
        margin-right: 14px;
        @include flex(none,
          column);
        .contact-item-bg {
          width: 148px;
          height: 148px;
          background-image: url("./img/skype_bg.png");
          background-size: cover;
          margin-top: 7px;
          @include flex(space-between,
            column);
          padding: 25px 0 19px 0;
          box-sizing: border-box;
          color: #ffffff;
          .circle-bg {
            width: 62px;
            height: 62px;
            background-image: url("./img/circle.png");
            background-size: cover;
            @include flex(center);
            .hy-logo {
              width: 44px;
            }
          }
        }
        .copy-btn {
          margin-top: 5px;
          width: 138px;
          // height: 18px;
          line-height: 18px;
          text-align: left;
          .copy-btn-text {
            float: left;
            width: 110px;
            word-break: break-all;
          }
          .copy-click {
            color: #EDB77F;
            cursor: pointer;
            float: right;
          }
        }
      }
    }
    .agent {
      width: 240px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      margin: 30px auto 0;
      background: url("./img/join.png") no-repeat center center;
      background-size: 100% 100%;
      font-weight: 600;
      font-size: 18px;
      color: #0E3E2E;
      text-align: center;
    }

    /deep/ .el-dialog {
      border-radius: 10px;
      background: transparent;
      border: none;
      filter: none;
      box-shadow: none;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        padding: 0;
        height: 0;
      }
      .dialog-result {
        position: relative;
        width: 182px;
        height: 123px;
        background: url("./img/copy_sucess.png") no-repeat center center;
        background-size: 100% 100%;
        span {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
          font-size: 14px;
          color: #27553F;
          white-space: nowrap;
        }
      }
    }
  }
  .multi-language {
    .partner-contact .contact-box .contact-item .copy-btn .copy-btn-text {
      width: 100px;
    }
  }
</style>
