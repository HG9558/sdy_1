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
      return decodeText(this.message)
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
