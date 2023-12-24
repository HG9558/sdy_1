<template>
  <div class="feedback-wrap">
    <div class="feedback-type">问题类型</div>
    <el-form class="bog feedback-form" ref="form" :model="form">
      <el-form-item prop="selectValue">
        <el-select popper-class="bog" v-model="selectValue" placeholder="请选者问题类型">
          <el-option v-for="(item) in form.region" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="feedback-description">
      问题描述:
    </div>
    <el-form class="feedback-form" ref="form" :model="form">
      <el-form-item prop="desc">
        <el-input ref="desc" minlength="20" maxlength="200" class="bog resize-none" type="textarea" v-model="form.desc" placeholder="请输入内容介于20-200字的问题描述"></el-input>
      </el-form-item>
      <span class="count-div">{{ this.count }} / 200</span>
    </el-form>
    <div class="feedback-description">
      问题截图:
    </div>
    <div class="upload-img">
      <div class="upload-inner">
        <el-upload :on-remove="()=>imgData=null" ref="upload" class="upload-demo" drag :limit="1" action="" :show-file-list="true" :auto-upload="false" :on-change="changeHandle" list-type="picture" accept=".jpg,.png,.jpeg">
          <div class="upload-container" v-if="!imgData">
            <img class="upload-icon" src="../img/upload.png" alt="">
            <div class="el-upload__text">请将文件拖到此处，或<em>点击上传</em></div>
            <div style="color:$c-1884;">（文件格式为PNG或JPG，且大小不超过15MB，目前支持上传一张）</div>
          </div>
        </el-upload>
      </div>
    </div>

    <el-button :loading="loading" @click="btnClick()" type="primary" class="btnCommit">提交反馈</el-button>

    <div class="mask-div" v-show="isMask">
      <div class="smile-div">
        <img src="../img/send_success.png" alt="smile" width="18px">
      </div>
      <div class="title">{{maskSuccessWrap[0]}}</div>
      <div>{{maskSuccessWrap[1]}}</div>
    </div>
    <div class="mask-div" v-show="isMaskError">
      <div class="smile-div">
        <img src="../img/error.png" alt="smile">
      </div>
      <div>{{maskErrorWrap[0]}}</div>
      <div>{{maskErrorWrap[1]}}</div>
    </div>
  </div>
</template>

<script>
import { handleBeforeUpload } from '@/plugins/auth.js'
export default {
  name: "feedback",
  data () {
    return {
      selectValue: [],
      form: {
        region: [
          {
            type: 9,
            name: '存款问题'
          },
          {
            type: 1,
            name: '提款问题'
          },
          {
            type: 2,
            name: '游戏问题'
          },
          {
            type: 3,
            name: '优惠问题'
          },
          {
            type: 4,
            name: '修改资料'
          },
          {
            type: 5,
            name: '流水问题'
          },
          {
            type: 6,
            name: '程序错误'
          },
          {
            type: 7,
            name: '产品建议'
          },
          {
            type: 8,
            name: '其他'
          }
        ],
        desc: ''
      },
      imgData: '',
      loading: false,
      count: 0,
      isMask: false,
      maskSuccessWrap: ['提交成功', '感谢您的反馈，已通知工作人员火速处理。'],
      maskErrorWrap: ['提交失败', '请您重新填写'],
      isMaskError: false,
      isDisabled: false
    }
  },
  watch: {
    //- 计算输入地址的字符长度
    form: {
      handler (newValue) {
        this.$nextTick(() => {
          this.count = this.$refs.desc.value.split('').length;
        })
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    changeHandle (file) {
      const textContent = handleBeforeUpload(file)
      if (textContent !== true) {
        this.messageTip({ message: textContent })
        return
      }
      this.imgData = file
    },
    // 提交
    btnClick () {
      if (this.selectValue === '') {
        return this.messageTip({ message: '请描述问题类型' })
      }
      if (this.form.desc === '' && this.imgData === '') {
        return this.messageTip({ message: '描述内容或者图片上传二选一' })
      }
      if (this.form.desc.length < 20 || this.form.desc.length > 200) {
        return this.messageTip({ message: '描述内容字数在20-200之间' })
      }

      let formData = new FormData()
      formData.append('uploadMessageFile', this.imgData.raw)
      formData.append('type', this.selectValue)
      formData.append('textContent', this.form.desc)
      this.loading = true

      this.$http.getMessageSend(formData)
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.isMask = true
              this.imgData = ''
              setTimeout(() => {
                this.isMask = false
              }, 1500)
            } else {
              this.isMaskError = true
              this.imgData = ''
              setTimeout(() => {
                this.isMaskError = false
              }, 1500)
            }
          }
          this.$refs.upload.clearFiles()
          this.selectValue = ''
          this.form.desc = ''
          this.loading = false
        })
        .catch(() => {
          this.$refs.upload.clearFiles()
          this.selectValue = ''
          this.form.desc = ''
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
