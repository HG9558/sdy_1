<template>
  <el-dialog :title="title" :visible.sync="showDialog" :center="center" :width="width" :close-on-click-modal="false" :custom-class="`bog ${className}`" :close-on-press-escape="false" :before-close="handleClose" :modal="isNeedModal" :append-to-body="appendToBody">
    <slot></slot>
    <div v-if="!hasSelfFooter" slot="footer">
      <el-button v-if="showCancel" :type="btnCancelType" @click="handleClose">{{cancelText}}</el-button>
      <el-button v-if="showConfirm" :type="btnConfirmType" @click="confirmHandle">{{confirmText}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { lang } from "@/i18n";

export default {
name: "GlobalDialog",
props: {
  title: String,
  showDialog: Boolean,
  width: {
    type: String,
    default: '500px'
  },
  isNeedModal: {
    type: Boolean,
    default: true
  },
  center: {
    type: Boolean,
    default: true
  },
  hasSelfFooter: {
    type: Boolean,
    default: false
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: lang('取消')
  },
  confirmText: {
    type: String,
    default: lang('确定')
  },
  isShowFooter: {
    type: Boolean,
    default: true
  },
  dialogClassName: String,
  className: {
    type: String,
    default: ""
  },
  btnCancelType: {
    type: String,
    default: 'default'
  },
  btnConfirmType: {
    type: String,
    default: 'primary'
  },
  appendToBody: {
    type: Boolean,
    default: false,
  }
},
methods: {
  handleClose () {
    this.$emit('update:showDialog', false)
  },
  confirmHandle () {
    this.$emit('confirmHandle')
  }

},
}
</script>
