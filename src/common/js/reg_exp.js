import { lang, _lang } from "@/i18n"

export function ValidNicknameRegEXP (nickname) {
  const REXEail = /^[\u4e00-\u9fa5a-zA-Z0-9]{4,10}$/
  return REXEail.test(nickname)
}
// 邮箱校验
export function getEail (email) {
  const REXEail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return REXEail.test(email)
}

export function QQRegEXP (QQ) {
  const QQreg = /[1-9][0-9]{0,14}/
  return QQreg.test(QQ)
}

// 中文银行
export function bankNameChina (bankName) {
  const name = /[\u4e00-\u9fa5]{2,20}/
  return name.test(bankName)
}

export function TestNameRegEXP (username) {
  // const namereg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)* | [a-zA-Z]{2,20} $/
  const namereg = /^[A-Za-z\u4E00-\u9FA5\uF900-\uFA2D\u00B7\u0020]{2,30}$/
  return namereg.test(username)
}

export function phoneCodeRegEXP (username) {
  const namereg = /[0-9]{5}$/
  return namereg.test(username)
}


// 手机校验
export function TestPhoneRegEXP (userPhone, area) {
  if (area === 2) {
    const account = /^09[0-9]\d{7}$/
    return account.test(userPhone)
  } else {
    const account = /^1[1-9]\d{9}$/
    return account.test(userPhone)
  }
}

// 台湾手机号
export function TestPhoneRegEXPTW (userPhone) {
  const account = /^09[1-9]\d{9}$/
  return account.test(userPhone)
}

// 图形验证码校验
export function captcharegEXP (userPhone) {
  const account = /[0-9]/
  return account.test(userPhone)
}

// 转换银行卡
export function getXing (bankNum) {
  return bankNum.replace(/(\w)/g, function (a, b, c) { return (c > 3 && c < (bankNum.length - 4)) ? '*' : a })
}

// 选择排序方法,选取最大值
export function selectSort (arr, word) {
  let len = arr.length
  let minIndex = 0
  let temp = 0
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (Number(arr[j][word]) > Number(arr[minIndex][word])) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

//- 用户名校验
export function TestAccountRegEXP (userAccount) {
  const account = /[a-zA-Z0-9]{6,16}/
  return account.test(userAccount)
}

// 注册用户名校验
export function reAccountRegEXP (userAccount) {
  const account = /[a-zA-Z0-9]{6,10}/
  return account.test(userAccount)
}

// 简单密码强度
export function FeeblePassword2 (userPassword) {
  const password = /^[a-zA-Z]{6,18}$/g
  return password.test(userPassword)
}
// 中等密码强度
export function mediumPassword (userPassword) {
  const password = /^[0-9a-zA-Z]{6,18}$/g
  return password.test(userPassword)
}
// 高等密码强度
export function HeightPassword (userPassword) {
  const password = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,18}$/g
  return password.test(userPassword)
}
// 判断是否是设备uuid的格式
export function isUuid (uuid) {
  const password = /'[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}'/
  return password.test(uuid)
}
// 验证码倒数
export function btnCodeMethods ($refs, wait, htmlText, time) {// $refs 获取节点 wait 等待时长 htmlText 文本
  let btn = $refs
  time = setInterval(() => {
    if (wait === 0) {
      btn.innerText = htmlText
      btn.removeAttribute('disabled')
      wait = 60
      return false
    } else {
			btn.innerText = _lang('countTime', { msg: wait })
			btn.disabled = 'disbaled'
      wait--
      return true
    }
  }, 1000)
  setTimeout(() => {
    btn.innerText = lang('重新获取')
    btn.removeAttribute('disabled')
    clearInterval(time)
    return false
  }, wait * 1000)
}

