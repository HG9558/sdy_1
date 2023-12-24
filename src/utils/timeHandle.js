import moment from 'moment'
/* eslint-disable */
import state from "../store/global/state";

const { time_zone } = state
const TIME_ZONE = time_zone.value
/**
 * 返回数据的处理策略对象 -- 简单数据类型
 * @param { Object } data 接口返回的对象
 * {
    "msg": "success",
    "code": 0,
    "data": {
        ...
        "list": [
            {
                ...
                "betTime": "2022-03-15 15:18:33",
                ...
            },
        ]
      }
    }
 * @param { Object } key 后台返回包含时间需要处理的字段 betTime
 * @param { Object } strategiesValue 对应策略的值 data.list
 */
function arrType(data, key, strategiesValue, timeType, format) {
  const dataKeys = strategiesValue.split('.')
  // 根据返回的 data 里，遍历是否存在dataKeys的字段，决定是否要处理数据
  let needHandle = false
  let tmpData
  for (let len = dataKeys.length, i = 0; i < len; i++) {
    const keyIndex = dataKeys[i]
    const nowData = (tmpData || data)[keyIndex]
    if (nowData) {
      tmpData = nowData
      needHandle = true
    } else {
      needHandle = false
      break
    }
  }
  // 对数据进行处理
  if (needHandle) {
    tmpData = tmpData.map((tmpItem) => {
      if (tmpItem[key]) {
        // 2022-07-05 10:43:06
        if (timeType === 'timestamp') {
          tmpItem[key] = tmpItem[key] + TIME_ZONE*1000*60*60
        } else {
          if (format === 'HH:mm:ss') {
            tmpItem[key] = '1992-01-01 ' + tmpItem[key]
          }
          tmpItem[key] = moment(tmpItem[key]).add(TIME_ZONE, 'h').format(format)
        }
      }
      return tmpItem
    })
  }
  return false
}

function objType(data, key, strategiesValue, timeType, format) {
  const dataKeys = strategiesValue.split('.')
  // 根据返回的 data 里，遍历是否存在dataKeys的字段，决定是否要处理数据
  let needHandle = false
  let tmpData
  for (let len = dataKeys.length, i = 0; i < len; i++) {
    const keyIndex = dataKeys[i]
    const nowData = (tmpData || data)[keyIndex]
    if (nowData) {
      tmpData = nowData
      needHandle = true
    } else {
      needHandle = false
      break
    }
  }
  // 对数据进行处理
  if (needHandle) {
    if (timeType === 'timestamp') {
      tmpData[key] = tmpData[key] + TIME_ZONE*1000*60*60
    } else {
      if (format === 'HH:mm:ss') {
        tmpData[key] = '1992-01-01 ' + tmpData[key]
      }
      tmpData[key] = moment(tmpData[key]).add(TIME_ZONE, 'h').format(format)
    }
  }
  return false
}

/**
 * 返回数据的处理策略对象
 */
const responseStrategies = {
  arrType,
  objType,
}

/**
 * 查找字符串第几次出现的位置
 * @param {Object} str 源字符串
 * @param {Object} cha 要查询的字符或字符串
 * @param {Object} num 第几次出现，第一次则为 0
 */
function findStrIndex(str, cha, num) {
  let x = str.indexOf(cha)
  for (let i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1)
  }
  return x
}

/**
 * handleResponseTime 处理返回时间的修改
 * @param { String } url 请求的网址
 * @param { Object } data 接口返回的对象
 */

// const priceStrategies = {
//   "pre-sale": preSalePrice,
//   promotion: promotionPrice,
//   "black-friday": blackFridayPrice,
//   default: defaultPrice,
// };
//
// function getPrice(originalPrice, status) {
//   return responseStrategies[status](originalPrice);
// }

export function handleResponseTime(url, data) {
  // key 是 url网址
  // value 是这条网址里，需要递归寻找处理的字段
  const responseUrlMap = {
    // PC首页视频-视频推荐
    '/splive/app/listLandingPageSchedule': [{
      'matchDateTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data.list',
      },
      'matchTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data.list',
        format: 'HH:mm:ss'
      },
    }],
    '/splive/app/getMatchScheduleByMatchScheduleId': [{
      'matchDateTime': {
        strategiesType: 'objType',
        strategiesValue: 'data',
      },
      'matchTime': {
        strategiesType: 'objType',
        strategiesValue: 'data',
        format: 'HH:mm:ss'
      },
    }],
    // PC首页视频-热门
    '/splive/app/big/screen/getAppBigScreenList': [{
      'matchDateTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data',
      },
      'matchTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data',
        format: 'HH:mm:ss'
      },
    }],
    // 好友推荐——最后登录时间
    '/api/friendRebate/getFriendRebateDetails': [{
      'lastLoginTime': {
        strategiesType: 'objType',
        strategiesValue: 'msg',
      },
    }],
    // 注单界面
    '/splive/app/listSptvBetLog': [{
      'betTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data.list',
      },
    }],
    '/api/user/BetDetailList': [{
      'betTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
      'payoutTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
    }],
    // 交易记录
    // 存款 / 奖补
    '/api/OnlinePay/pzPay/getFundDepositList': [{
      'createTime': {
        strategiesType: 'arrType',
        strategiesValue: 'res.list',
      },
    }],
    // 提款
    '/api/user/wdApplyList': [{
      'createTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
    }],
    // 优惠
    '/api/user/bonusAndTaskList': [{
      'applicationTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
    }],
    // 返利
    '/api/friendRebate/rewardList': [{
      'time': {
        strategiesType: 'arrType',
        strategiesValue: 'msg.list',
      },
    }],
    // 洗码
    '/api/user/depotWaterDetailList': [{
      'applicationTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data.list',
      },
      'auditTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data.list',
      },
      'time': {
        strategiesType: 'arrType',
        strategiesValue: 'data.list',
      },
    }],
    // 好友推荐
    // 好友推荐-首页 | 好友推荐-收益日报
    // '/api/friendRebate/getFriendRebateRewardReportForDay': [{
    //   'time': {
    //     strategiesType: 'arrType',
    //     strategiesValue: 'msg.list',
    //   },
    // }],
    // 好友推荐-我的好友
    '/api/friendRebate/getFriendRebateList': [{
      'firstChargeTime': {
        strategiesType: 'arrType',
        strategiesValue: 'msg.list',
      },
    }],
    // 消息中心-通知
    '/api/user/messageInfo': [{
      'createTime': {
        strategiesType: 'arrType',
        strategiesValue: 'data.list',
      },
    }],
    // 消息中心-公告
    '/api/sys/noticeList': [{
      'createTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
      'endTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
      'startTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
      'updateTime': {
        strategiesType: 'arrType',
        strategiesValue: 'page.list',
      },
    }],
    // // 好友推荐-收益月报
    // '/api/friendRebate/getFriendRebateRewardReportForMonth': [{
    //   'time': {
    //     strategiesType: 'arrType',
    //     strategiesValue: 'msg.list',
    //   },
    // }],
    // 原生体育开赛时间
    '/splive/fbob/fbob/matches': [{
      'bt': {
        strategiesType: 'arrType',
        strategiesValue: 'data',
        timeType: 'timestamp',
      }
    }]
  }
  url = url.slice(findStrIndex(url, '/', 2))
  const sliceIndex = url.indexOf('?')
  if (sliceIndex !== -1) {
    url = url.slice(0, sliceIndex)
  }
  if (Object.keys(responseUrlMap).includes(url)) {
    // 第一步，检查url是否在我们需要处理的接口列表里
    responseUrlMap[url].forEach((keyItem) => {
      Object.keys(keyItem).forEach((key) => {
        const { strategiesType, strategiesValue, timeType, format='YYYY-MM-DD HH:mm:ss' } = keyItem[key]
        responseStrategies[strategiesType](data, key, strategiesValue, timeType, format)
      })
    })
  }
  return data
}
