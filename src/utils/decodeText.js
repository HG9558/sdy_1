import { emojiMap, emojiUrl } from './emojiMap'
import crypto from './crypto'
import { lang } from '@/i18n'

function translateCustomMessage(payload) {
  if (payload.description === 'encrypt') {
    return crypto.Decrypt(payload.data)
  }
  if (payload.text) {
    return payload.text
  }
  return '[自定义消息]'
}

export function decodeText(message) {
  const { TIM } = window
  const renderDom = []
  let temp
  if (message.type === TIM.TYPES.MSG_CUSTOM) {
    temp = translateCustomMessage(message.payload)
  } else {
    // 文本消息
    temp = message.payload.text
  }
  let left = -1
  let right = -1
  while (temp !== '') {
    left = temp.indexOf('[')
    right = temp.indexOf(']')
    switch (left) {
      case 0:
        if (right === -1) {
          renderDom.push({
            name: 'text',
            text: temp,
          })
          temp = ''
        } else {
          let myEmoji = temp.slice(0, right + 1)
          try {
            // safari 不兼容正则断言匹配
            // myEmoji = myEmoji.replace(/(?<=\[)(.+?)(?=])/g, (str) => {
            myEmoji = myEmoji.replace(/\[(.+?)\]/g, (str) => {
              // 转换为当前语言环境的表情文本以匹配图片
              return lang(str)
            })
            // eslint-disable-next-line no-empty
          } catch (e) {}

          if (emojiMap[myEmoji]) {
            renderDom.push({
              name: 'img',
              src: emojiUrl + emojiMap[myEmoji],
            })
            temp = temp.substring(right + 1)
          } else {
            renderDom.push({
              name: 'text',
              text: '[',
            })
            temp = temp.slice(1)
          }
        }
        break
      case -1:
        renderDom.push({
          name: 'text',
          text: temp,
        })
        temp = ''
        break
      default:
        renderDom.push({
          name: 'text',
          text: temp.slice(0, left),
        })
        temp = temp.substring(left)
        break
    }
  }
  return renderDom
}
