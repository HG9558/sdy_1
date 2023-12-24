<template>
  <div>
    <span v-for="(item, index) in contentList" :key="index">
      <pre :key="index" v-if="item.name === 'text'">{{ item.text }}</pre>
      <img class="message-emoji" v-else-if="item.name === 'img'" :src="item.src" alt=""/>
    </span>
  </div>
</template>

<script>
import { decodeText } from '@/utils/decodeText'

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    contentList() {
      const msg = decodeText(this.message)
      const zeroMsg = msg[0]
      if (zeroMsg.text && zeroMsg.text.indexOf('giftDynamicUrl') >= 0) {
        const { giftDynamicUrl, msgContent } = JSON.parse(zeroMsg.text)
        this.$emit('sendGift', giftDynamicUrl)
        zeroMsg.text = msgContent
      }
      return msg
    },
  },
}
</script>

<style lang="scss" scoped>
.message-emoji {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
pre {
  display: inline;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
