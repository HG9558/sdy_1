import compressImage from './compressImage'
export { handleResponseTime } from './timeHandle'

export { compressImage }

/* 给网址补协议名 */
export function padProtocol(url) {
  return /^http/.test(url) ? url : 'http://' + url
}

/* 去掉时间后面的.0 */
export function timeFilter(value) {
  if (!value) return ''
  return value.slice(0, -2)
}


/* 去掉时间后面的.0 和 小时 分钟 */
export function timeFilterNone(value) {
  if (!value) return ''
  return value.slice(0, -10)
}

// export const deepClone = (obj) => {
//   let type = getType(obj),
//       objClone = type === "Array" ? [] : (type === "Object" ? {} : obj);
//   if (obj && (type === "Array" || type === "Object")) {
//       for (let key in obj) {
//           if (obj.hasOwnProperty(key)) {
//               if (obj && (type === "Array" || type === "Object")) {
//                   objClone[key] = deepClone(obj[key]);
//               } else {
//                   objClone[key] = obj[key];
//               }
//           }
//       }
//   }
//   return objClone;
// }

/* 倒计时 */
export function countTime(theEnd) {
  //获取当前时间
  var date = new Date();
  var now = date.getTime();
  //设置截止时间
  // var str="2020/3/30 00:00:00";
  var endDate = new Date(theEnd);
  var end = endDate.getTime();

  //时间差
  var leftTime = end-now;

  if(leftTime <= 0) {
    return 0
  }

  //定义变量 d,h,m,s保存倒计时的时间
  var d,h_in_d,h,m,s;
  // if (leftTime>=0) {
    d = Math.floor(leftTime/1000/60/60/24);
    h_in_d = Math.floor(leftTime/1000/60/60); // 把天换算成小时
    h = Math.floor(leftTime/1000/60/60%24);
    m = Math.floor(leftTime/1000/60%60);
    s = Math.floor(leftTime/1000%60);
  // }
  //将0-9的数字前面加上0，例1变为01
  d = checkTime(d);
  h = checkTime(h);
  h_in_d = checkTime(h_in_d);
  m = checkTime(m);
  s = checkTime(s);
  function checkTime(i){
      if (i<10) {
          i = "0"+i;
      }
      return i;
  }

  return {d,h_in_d,h,m,s}
  // //递归每秒调用countTime方法，显示动态时间效果
  // setTimeout(countTime,1000);
}

/* 给数字加千分符 */
export function amountFilter(value) {
  if (value) {
    return Number(value).toFixed(2).replace(/\d+/, s => s.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
  return '0.00'
}

// 函数节流
export function throttle(fun, delay) {
  let last, deferTimer
  return function () {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    }else {
      last = now
      fun.apply(that,_args)
    }
  }
}
export const getBeijingtime = () => {
  var d = new Date()
  const currentDate = new Date()
  const tmpHours = currentDate.getHours()
  // 算得时区
  let timeZone = -d.getTimezoneOffset() / 60
  if (timeZone < 0) {
    timeZone = Math.abs(timeZone) + 8; currentDate.setHours(tmpHours + timeZone)
  } else {
    timeZone -= 8; currentDate.setHours(tmpHours - timeZone)
  }
  return currentDate
}

// 获取北京时间时间戳
export const getTimeStamp = () => {
  const currentDate = new Date(+sessionStorage.getItem('timeGap') + new Date().getTime() + (parseInt(new Date().getTimezoneOffset() / 60, 10) + 8) * 3600 * 1000)
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

// 视频源arr 排序
export const sortSource = (sources, matchType, sortType = 1) => {
  // matchType  3: 365, 6:闪耀
  /*
    lang
    中文高清, 1
    原声高清, 2
    中文标清, 3
    原声标清, 4
    英文高清, 5

    365
    lang:4,name:原声标清
    lang:2,name:原声高清
    lang:1,name:中文高清

    闪耀
    lang:3,name:中文标清
    lang:1,name:中文高清
    lang:5,name:英文高清

    sortType = 2
    中文站：SDY,BOG,君博，温莎
    闪耀清晰度优先级：默认 高清→普通→英文
    365清晰度优先级： 默认 中文高清→普清→原声高清

    sortType = 1
    国际站：澳世，Gosport,美高梅，lua999
    闪耀清晰度优先级：默认 英文→高清→普通
    365清晰度优先级： 默认 原声高清→中文高清→普清
  */
  const firstArr = []
  const elseArr = []
  const key = 'lang'
  const sourceSort = {
    1: {
      3: [
        { lang: 2 },
        { lang: 1 },
        { lang: 4 },
      ],
      6: [
        { lang: 5 },
        { lang: 1 },
        { lang: 3 },
      ],
    },
    2: {
      3: [
        { lang: 1 },
        { lang: 4 },
        { lang: 2 },
      ],
      6: [
        { lang: 1 },
        { lang: 3 },
        { lang: 5 },
      ],
    },
  }[sortType][matchType] || []
  sourceSort.forEach((i) => {
    const obj = sources.find(_i => i[key] === _i[key])
    if (obj) firstArr.push(obj)
  })
  sources.forEach((k) => {
    const obj = firstArr.find(_k => k[key] === _k[key])
    if (obj) return
    elseArr.push(k)
  })
  return [...firstArr, ...elseArr]
}
