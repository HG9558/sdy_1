<template>
  <div v-show="showBox" :class="mode=='pop'?'verify-mask':''">
    <div :class="mode=='pop'?'verifybox':''" :style="{'max-width':parseInt(imgSize.width)+10+'px'}">
      <div v-if="mode=='pop'" class="verifybox-top">
        请完成安全验证
        <i class="verifybox-close el-icon-close" @click="closeBox"></i>
      </div>
      <div class="verifybox-bottom">
        <!-- 验证码容器 -->
        <component :is="componentType" v-if="componentType" ref="instance" :captcha-type="captchaType" :type="verifyType" :figure="figure" :arith="arith" :mode="mode" :v-space="vSpace" :explain="explain" :img-size="imgSize" :block-size="blockSize" :bar-size="barSize" :default-img="require('./img/default.png')" />
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
/**
 * Verify 验证码组件
 * @description 分发验证码使用
 * */
import VerifySlide from './components/VerifySlide.vue'
import VerifyPoints from './components/VerifyPoints'

/* eslint-disable */
export default {
  name: "Vue2Verify",
  components: {
    VerifySlide,
    VerifyPoints,
  },
  props: {
    captchaType: {
      type: String,
      required: true,
    },
    figure: {
      type: Number,
    },
    arith: {
      type: Number,
    },
    mode: {
      type: String,
      default: "pop",
    },
    vSpace: {
      type: Number,
    },
    explain: {
      type: String,
    },
    imgSize: {
      type: Object,
      default () {
        return {
          width: "370px",
          height: "200px"
        };
      },
    },
    blockSize: {
      type: Object,
    },
    barSize: {
      type: Object,
    },
  },
  data () {
    return {
      // showBox:true,
      clickShow: false,
      // 内部类型
      verifyType: undefined,
      // 所用组件类型
      componentType: undefined,
    }
  },
  computed: {
    instance () {
      return this.$refs.instance || {}
    },
    showBox () {
      if (this.mode == "pop") {
        return this.clickShow
      } else {
        return true
      }
    },
  },
  watch: {
    captchaType: {
      immediate: true,
      handler (captchaType) {
        switch (captchaType.toString()) {
          case "blockPuzzle":
            this.verifyType = "2";
            this.componentType = "VerifySlide";
            break;
          case "clickWord":
            this.verifyType = "";
            this.componentType = "VerifyPoints";
            break;
        }
      }
    }
  },
  mounted () {
    this.uuid();
  },
  methods: {
    // 生成 uuid
    uuid () {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var slider = "slider" + "-" + s.join("");
      var point = "point" + "-" + s.join("");
      // 判断下是否存在 slider
      if (!localStorage.getItem("slider")) {
        localStorage.setItem("slider", slider);
      }
      if (!localStorage.getItem("point")) {
        localStorage.setItem("point", point);
      }
    },
    /**
     * refresh
     * @description 刷新
     * */
    refresh () {
      if (this.instance.refresh) {
        this.instance.refresh();
      }
    },
    closeBox () {
      this.clickShow = false;
      this.refresh();
    },
    show () {
      if (this.mode == "pop") {
        this.clickShow = true;
      }
    }
  }
};
</script>
<style  scoped>
@import "./css/index.css";
</style>