<template>
  <div class="contact-us-box">
    <div class="contact-us-content">
      <div class="contact-us-content-inner">
        <div class="contact-us-content-inner_title">联系我们</div>
        <div class="contact-us-content-inner_title_two">CONTACT US</div>
        <div class="contact-us-content-inner_box">
          <div :key="index" class="contact-item" v-for="(item, index) in renderCopyList">
            <div class="top-container">
              <div class="img-container">
                <img class="contact-item_logo" :src="item.url" alt="logo" />
              </div>
              <div class="contact-item_logo_title">{{ item.title }}</div>
              <!-- <div class="contact-item_logo_des">{{ item.text }}</div> -->
            </div>
            <div class="copy-btn" v-for="(childItem, index) in item.text" :key="childItem + ` ${index}`">
              <span class="copy-btn-text">{{ childItem }}</span>
              <span class="copy-click" v-clipboard:copy="childItem" v-clipboard:success="firstCopySuccess">复制</span>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-us-input-box">
        <el-form :model="from" :rules="validateRule" ref="from">
          <el-form-item prop="name">
            <el-input class="user-input" v-model="from.name" :maxlength="20" clearable placeholder="名字"></el-input>
          </el-form-item>
          <el-form-item prop="number">
            <el-input class="user-input" v-model="from.number" :maxlength="11" clearable placeholder="联络号码"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input class="user-input" v-model="from.email" :maxlength="20" clearable placeholder="邮件地址"></el-input>
          </el-form-item>
          <el-form-item prop="description">
            <el-input ref="description" :maxlength="200" class="resize-none" type="textarea" v-model="from.description"
              placeholder="说明"></el-input>
          </el-form-item>
          <el-form-item class="btn-class">
            <el-button class="btn-pubilc" @click="dataFormSubmitHandle('from')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :show-close="false" :visible.sync="isShowCopy" center top="400px" width="140px">
      <div class="dialog-result">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import debounce from "lodash/debounce";
import { TestPhoneRegEXP, getEail } from "@/plugins/auth";

export default {
  name: "contactUs",
  data () {
    return {
      from: {
        name: "",
        email: "",
        number: "",
        description: "",
      },
      isShowCopy: false,
    };
  },
  computed: {
    ...mapState({
      stationSetting: state => state.global.stationSetting
    }),
    copyList () {
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
    // 规则校验
    validateRule () {
      const validatePhone = (rule, value, callback) => {
        // 手机
        if (!value) {
          callback(new Error("请输入手机号"));
        } else if (!TestPhoneRegEXP(value)) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      const validateEmailis = (rule, value, callback) => {
        // 邮箱
        if (!value) {
          callback(new Error("请输入邮箱"));
        } else if (!getEail(value)) {
          callback(new Error("请输入正确的邮箱"));
        } else {
          callback();
        }
      };

      return {
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        number: [
          { required: true, message: "联系号码不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮件地址不能为空", trigger: "blur" },
          { validator: validateEmailis, trigger: "blur" },
        ],
        description: [
          { required: true, message: "说明不能为空", trigger: "blur" },
        ],
      };
    },
  },
  methods: {
    // 表单提交
    dataFormSubmitHandle: debounce(
      function (data) {
        this.$refs[data].validate(async (valid) => {
          if (!valid) {
            return false;
          }
          let formData = new FormData();
          formData.append("type", 8);
          formData.append(
            "textContent",
            `【名字】${this.from.name}【联络号码】${this.from.number}【邮件地址】${this.from.email}【说明】${this.from.description}`
          );

          const res = await this.$http.getMessageSend(formData)
          if (res.data.code === 0) {
            this.messageTip({
              type: 'success',
              message: "提交成功",
              customClass: "bog",
            })
          }
          this.$refs.from.resetFields();
        });
      },
      1000,
      { leading: true, trailing: false }
    ),
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
@import "./css/index.scss";
</style>
