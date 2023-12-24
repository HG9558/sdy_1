// 昵称校验
export function ValidNicknameRegEXP(nickname: string) {
  const REXEail = /^[\u4e00-\u9fa5a-zA-Z0-9]{4,10}$/
  return REXEail.test(nickname)
}
// 邮箱校验
export function getEail(email: string) {
  const REXEail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return REXEail.test(email)
}

export function QQRegEXP(QQ: string) {
  const QQreg = /[1-9][0-9]{0,14}/
  return QQreg.test(QQ)
}

// 中文银行
export function bankNameChina(bankName: string) {
  const name = /[\u4e00-\u9fa5]{2,20}/
  return name.test(bankName)
}

export function TestNameRegEXP(username: string) {
  // const namereg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)* | [a-zA-Z]{2,20} $/
  const namereg = /^[A-Za-z\u4E00-\u9FA5\uF900-\uFA2D\u00B7\u0020]{2,30}$/
  return namereg.test(username)
}

export function phoneCodeRegEXP(username: string) {
  const namereg = /[0-9]{5}$/
  return namereg.test(username)
}


// 手机校验
export function TestPhoneRegEXP(userPhone: string, area: number) {
  if (area === 2) {
    const account = /^09[0-9]\d{7}$/
    return account.test(userPhone)
  } else {
    const account = /^1[1-9]\d{9}$/
    return account.test(userPhone)
  }
}

// 台湾手机号
export function TestPhoneRegEXPTW(userPhone: string) {
  const account = /^09[1-9]\d{9}$/
  return account.test(userPhone)
}

// 图形验证码校验
export function captcharegEXP(userPhone: string) {
  const account = /[0-9]/
  return account.test(userPhone)
}

// 转换银行卡
export function getXing(bankNum: string) {
  return bankNum.replace(/(\w)/g, function (a, _b, c) { return (c > 3 && c < (bankNum.length - 4)) ? '*' : a })
}

// 用户名校验
export function TestAccountRegEXP(userAccount: string) {
  const account = /[a-zA-Z0-9]{6,16}/
  return account.test(userAccount)
}

// 注册用户名校验
export function reAccountRegEXP(userAccount: string) {
  const account = /[a-zA-Z0-9]{6,10}/
  return account.test(userAccount)
}

// 简单密码强度
export function FeeblePassword2(userPassword: string) {
  const password = /^[a-zA-Z]{6,18}$/g
  return password.test(userPassword)
}
// 中等密码强度
export function mediumPassword(userPassword: string) {
  const password = /^[0-9a-zA-Z]{6,18}$/g
  return password.test(userPassword)
}
// 高等密码强度
export function HeightPassword(userPassword: string) {
  const password = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,18}$/g
  return password.test(userPassword)
}
// 判断是否是设备uuid的格式
export function isUuid(uuid: string) {
  const password = /'[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}'/
  return password.test(uuid)
}

// 验证码倒数
export function btnCodeMethods($refs: HTMLElement | any, wait: number, htmlText: string, time: any) {// $refs 获取节点 wait 等待时长 htmlText 文本
  let btn = $refs
  time = setInterval(() => {
    if (wait === 0) {
      btn.value.innerText = htmlText
      btn.value.removeAttribute('disabled')
      wait = 60
      return false
    } else {
      btn.value.innerText = wait + '秒后重新发送'
      btn.value.disabled = 'disbaled'
      wait--
      return true
    }
  }, 1000)
  setTimeout(() => {
    btn.value.innerText = '重新获取'
    btn.value.removeAttribute('disabled')
    clearInterval(time)
    return false
  }, wait * 1000)
}

function add0(str: string) { // 加0
  const s = str.indexOf('-') >= 0
  let arr = s ? str.split('-') : str.split('/')
  let newArr = []
  newArr = arr.map((val) => {
    if (val.length < 2) {
      return '0' + val
    } else {
      return val
    }
  })
  return newArr.join(s ? '-' : '/')
}
export function getTime(val: string) { // 获取今天、昨天、本周、上周、本月、上月的开始及结束时间
  let Nowdate = new Date()
  let getDay = Nowdate.getDay() || 7
  let yesterday = new Date(Nowdate.getTime() - 86400000) // 昨天
  let tomorrow = new Date(Nowdate.getTime() + 86400000) // 明天
  let afterTomorrow = new Date(Nowdate.getTime() + 86400000 * 2) // 后天
  let threeday = new Date(Nowdate.getTime() - 86400000 * 2) // 三天内
  let sevenDaysAgo = new Date(Nowdate.getTime() - 86400000 * 6) // 7天前
  let thirtyDaysAgo = new Date(Nowdate.getTime() - 86400000 * 29) // 30天前
  let fortyFiveDaysAgo = new Date(Nowdate.getTime() - 86400000 * 44) // 45天前
  let WeekFirstDay = new Date(Nowdate.getTime() - (getDay - 1) * 86400000) // 本周第一天
  let WeekLastDay = new Date((WeekFirstDay.getTime() / 1000 + 6 * 86400) * 1000) // 本周最后一天
  let preWeekFirstDay = new Date((WeekFirstDay.getTime() / 1000 - 7 * 86400) * 1000) // 上周第一天
  let preWeekLastDay = new Date((WeekFirstDay.getTime() / 1000 - 86400) * 1000) // 上周最后一天
  let MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1) // 本月第一天
  let preMonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() - 1, 1) // 上个月的第一天
  let MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1) // 下个月的第一天
  let MonthLastDay = new Date(MonthNextFirstDay.getTime() - 86400000) // 本月最后一天
  let preMonthLastDay = new Date(MonthFirstDay.getTime() - 86400000) // 上个月最后一天
  let M1, M2, d1, d2
  switch (val) {
    case '今天':
      M1 = Number(Nowdate.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = Nowdate.getFullYear() + '-' + M1 + '-' + Nowdate.getDate()
      d2 = Nowdate.getFullYear() + '-' + M2 + '-' + Nowdate.getDate()
      break
    case 'today': {// 首页-赛程
      M1 = Number(Nowdate.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = Nowdate.getFullYear() + '/' + M1 + '/' + Nowdate.getDate()
      d2 = Nowdate.getFullYear() + '/' + M2 + '/' + Nowdate.getDate()
      break
    }
    case 'tomorrow':// 首页-赛程
      M1 = Number(Nowdate.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = Nowdate.getFullYear() + '/' + M1 + '/' + tomorrow.getDate()
      d2 = Nowdate.getFullYear() + '/' + M2 + '/' + tomorrow.getDate()
      break
    case 'afterTomorrow':// 首页-赛程
      M1 = Number(Nowdate.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = Nowdate.getFullYear() + '/' + M1 + '/' + afterTomorrow.getDate()
      d2 = Nowdate.getFullYear() + '/' + M2 + '/' + afterTomorrow.getDate()
      break
    case '昨天':
      M1 = Number(yesterday.getMonth()) + 1
      M2 = Number(yesterday.getMonth()) + 1
      d1 = yesterday.getFullYear() + '-' + M1 + '-' + yesterday.getDate()
      d2 = yesterday.getFullYear() + '-' + M2 + '-' + yesterday.getDate()
      break
    case '三天内':
      M1 = Number(threeday.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = threeday.getFullYear() + '-' + M1 + '-' + threeday.getDate()
      d2 = Nowdate.getFullYear() + '-' + M2 + '-' + Nowdate.getDate()
      break
    case '一周内7日':
    case '一周内七天':
      M1 = Number(sevenDaysAgo.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = sevenDaysAgo.getFullYear() + '-' + M1 + '-' + sevenDaysAgo.getDate()
      d2 = Nowdate.getFullYear() + '-' + M2 + '-' + Nowdate.getDate()
      break
    case '近30天':
    case '一个月内':
      M1 = Number(thirtyDaysAgo.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = thirtyDaysAgo.getFullYear() + '-' + M1 + '-' + thirtyDaysAgo.getDate()
      d2 = Nowdate.getFullYear() + '-' + M2 + '-' + Nowdate.getDate()
      break
    case '近45天': {
      M1 = Number(fortyFiveDaysAgo.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = fortyFiveDaysAgo.getFullYear() + '-' + M1 + '-' + fortyFiveDaysAgo.getDate()
      d2 = Nowdate.getFullYear() + '-' + M2 + '-' + Nowdate.getDate()
      break
    }
    case '近7天':
      M1 = Number(WeekFirstDay.getMonth()) + 1
      M2 = Number(WeekLastDay.getMonth()) + 1
      d1 = WeekFirstDay.getFullYear() + '-' + M1 + '-' + WeekFirstDay.getDate()
      d2 = WeekLastDay.getFullYear() + '-' + M2 + '-' + WeekLastDay.getDate()
      break
    case '本周':
      M1 = Number(WeekFirstDay.getMonth()) + 1
      M2 = Number(Nowdate.getMonth()) + 1
      d1 = sevenDaysAgo.getFullYear() + '-' + M1 + '-' + WeekFirstDay.getDate()
      d2 = Nowdate.getFullYear() + '-' + M2 + '-' + Nowdate.getDate()
      break
    case '上周':
      M1 = Number(preWeekFirstDay.getMonth()) + 1
      M2 = Number(preWeekLastDay.getMonth()) + 1
      d1 = preWeekFirstDay.getFullYear() + '-' + M1 + '-' + preWeekFirstDay.getDate()
      d2 = preWeekLastDay.getFullYear() + '-' + M2 + '-' + preWeekLastDay.getDate()
      break
    case '本月':
      M1 = Number(MonthFirstDay.getMonth()) + 1
      M2 = Number(MonthLastDay.getMonth()) + 1
      d1 = MonthFirstDay.getFullYear() + '-' + M1 + '-' + MonthFirstDay.getDate()
      d2 = MonthLastDay.getFullYear() + '-' + M2 + '-' + MonthLastDay.getDate()
      break
    case '上月':
      M1 = Number(preMonthFirstDay.getMonth()) + 1
      M2 = Number(preMonthLastDay.getMonth()) + 1
      d1 = preMonthFirstDay.getFullYear() + '-' + M1 + '-' + preMonthFirstDay.getDate()
      d2 = preMonthLastDay.getFullYear() + '-' + M2 + '-' + preMonthLastDay.getDate()
      break
    default:
      return []
  }
  return [add0(d1), add0(d2)]
}

//- todo
export function dataTime(unixTime: string | Date, type: any = "Y-M-D H:i:s") { // 转换时间
  let date = new Date(unixTime)
  let datetime = ''
  datetime += date.getFullYear() + type.substring(1, 2)
  datetime += (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + type.substring(3, 4)
  datetime += (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  if (type.substring(5, 6)) {
    if (type.substring(5, 6).charCodeAt() > 255) {
      datetime += type.substring(5, 6);
      if (type.substring(7, 8)) {
        datetime += " " + (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
        if (type.substring(9, 10)) {
          datetime += type.substring(8, 9) + (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
          if (type.substring(11, 12)) {
            datetime += type.substring(10, 11) + (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
          }
        }
      }
    } else {
      datetime += " " + (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
      if (type.substring(8, 9)) {
        datetime += type.substring(7, 8) + (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        if (type.substring(10, 11)) {
          datetime += type.substring(9, 10) + (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
        }
      }
    }
  }
  return datetime // 调用dataTime(time, 'Y-m-d H:i:s')
}

//- todo
export function handleBeforeUpload(file: any) { // 上传代码判断
  let name = file.name.slice(-3)//截取图片后缀
  // PNG,JPG,JPEG
  let kb = 15360 * 1024
  if (name.toLowerCase() === 'png' || name.toLowerCase() === 'jpg' || name.toLowerCase() === 'jpeg') {
    if (file.size > kb) {//判断大于15M直接中断
      return '文件过大，请重新上传'
    } else {
      return true
    }
  } else {
    return '格式不匹配'
  }
}

export const qrcodeAllAddress = 'https://' + window.location.host + '/#/app-download'