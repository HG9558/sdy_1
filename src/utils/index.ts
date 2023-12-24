// 获取北京时间时间戳
export const getTimeStamp = () => {
  const currentDate = new Date(+(sessionStorage.getItem('timeGap') as string) + new Date().getTime() + (parseInt((new Date().getTimezoneOffset() / 60).toString(), 10) + 8) * 3600 * 1000)
  const y = currentDate.getFullYear()
  const m = currentDate.getMonth()
  const d = currentDate.getDate()
  const h = currentDate.getHours()
  const mm = currentDate.getMinutes()
  const ss = currentDate.getSeconds()
  // Date.UTC() 方法接受的参数同日期构造函数接受最多参数时一样，返回从1970-1-1 00:00:00 UTC到指定日期的的毫秒数。
  const timeObj = Date.UTC(y, m, d, h, mm, ss, 0) / 1000 - (8 * 60 * 60)
  return timeObj * 1000
}

/* 倒计时 */
export function countTime(theEnd: Date): RedEnvelopeEntranceAPI.endCountDownType | number {
  //获取当前时间  
  var date = new Date();
  var now = date.getTime();
  //设置截止时间  
  // var str="2020/3/30 00:00:00";
  var endDate = new Date(theEnd);
  var end = endDate.getTime();

  //时间差  
  var leftTime = end - now;

  if (leftTime <= 0) {
    return 0
  }

  //定义变量 d,h,m,s保存倒计时的时间  
  var d, h_in_d, h, m, s;
  // if (leftTime>=0) {  
  d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
  h_in_d = Math.floor(leftTime / 1000 / 60 / 60); // 把天换算成小时  
  h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
  m = Math.floor(leftTime / 1000 / 60 % 60);
  s = Math.floor(leftTime / 1000 % 60);
  // }
  //将0-9的数字前面加上0，例1变为01
  d = checkTime(d);
  h = checkTime(h);
  h_in_d = checkTime(h_in_d);
  m = checkTime(m);
  s = checkTime(s);
  function checkTime(i: number | string) {
    if (+i < 10) {
      i = "0" + i;
    }
    return i;
  }
  return { d, h_in_d, h, m, s }
}

/* 给数字加千分符 */
export function amountFilter(value: number): string {
  if (value) {
    return Number(value).toFixed(2).replace(/\d+/, s => s.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
  return '0.00'
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

export function dataTime(unixTime: string | number | Date, type = "Y-M-D H:i:s") { // 转换时间
  let date = new Date(unixTime)
  let datetime = ''
  datetime += date.getFullYear() + type.substring(1, 2)
  datetime += (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + type.substring(3, 4)
  datetime += (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())

  if (type.substring(5, 6)) {
    if (type.substring(5, 6).charCodeAt(0) > 255) {
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


export const deleteTime = (obj: { [x: string]: any }) => {
  for (let key in obj) {
    if (key === 'createdAt' || key === 'updatedAt' || key === 'publishedAt') {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      deleteTime(obj[key]);
    }
  }
  return obj;
}
