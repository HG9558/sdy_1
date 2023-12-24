
export const noticeTextData = {
  '支付宝': '温馨提示：请使用支付宝App进行付款，请勿重复支付，',
  '网银转账': '请使用手机银行App或网银付款，请按照提交后页面实际显示金额充值，切勿保存转账人信息私下转账，否则无法自动到账！',
  '微信': '温馨提示：请使用微信App进行付款，请勿重复支付，',
  '电子钱包转账': '请使用手机银行App或网银付款，请勿重复支付，',
  '扫码支付': '请勿重复支付，',
  'QQ支付': '温馨提示：请使用QQ进行付款，请勿重复支付，'
}

function ceilNumber(num, type) {
  if (type === 'min') {
    return Math.ceil(num / 100) * 100
  }
  if (type === 'max') {
    return Math.floor(num / 100) * 100
  }
  return Math.round(num / 100) * 100
}

/**
 * 根据限额范围生成快捷金额
 * @param min 最小限额
 * @param max 最大限额
 * @param num 风控金额变化：全部金额减5；最小金额例外，进行+5）
 * @returns {number[]}
 * @constructor
 */
export function getRecommendList(min, max, num = 0) {
  // 快捷金额生成 最小100 最大50000
  const minAmount = 100
  const maxAmount = 50000

  min = Number(min) || minAmount
  max = Number(max) || maxAmount

  if (min < minAmount) min = minAmount
  if (max > maxAmount) max = maxAmount
  const difFn = () => {
    const num = Math.floor(Math.random() * 50)
    // 整10不要
    return num % 10 === 0 ? difFn() : num
  }
  const x = difFn()
  const sum = max - min
  const n = sum / 5
  const k1 = Math.round(min + x)
  const k2 = Math.round(min + n + x)
  const k3 = Math.round(min + 2 * n + x)
  const k4 = Math.round(min + 3 * n + x)
  const k5 = Math.round(min + 4 * n + x)

  const amounts = [k1, k2, k3, k4, k5]

  // const sum = min + max
  // const k1 = min
  // const k2 = 0.25 * sum
  // const k3 = 0.5 * sum
  // const k4 = 0.75 * sum
  // let amounts = [k1, k2, k3, k4, max]

  // amounts = amounts.map((amount, index) => {
  //   if (num) {
  //     const dif = Math.floor(Math.random() * 50)
  //     if (index === 0) {
  //       return ceilNumber(amount, 'min') + dif
  //     } if (index === amounts.length - 1) {
  //       return ceilNumber(amount, 'max') - dif
  //     }
  //     return ceilNumber(amount) - 5
  //   }
  //   if (index === 0) {
  //     return ceilNumber(amount, 'min')
  //   } if (index === amounts.length - 1) {
  //     return ceilNumber(amount, 'max')
  //   }
  //   return ceilNumber(amount)
  // })

  // 取 min - max 区间
  let quickAmounts = amounts.filter(amount => amount >= min && amount <= max)

  // 去重
  quickAmounts = [...new Set(quickAmounts)].map(item => {
    return { label: item, value: item }
  })
  return quickAmounts
}
