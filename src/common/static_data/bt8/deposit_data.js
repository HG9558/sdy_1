
export const noticeTextData = {
  '支付宝': '温馨提示：请使用支付宝App进行付款，请勿重复支付，',
  '银行卡': '请使用手机银行App或U盾网银付款，请按照提交后页面实际显示金额充值，切勿保存转账人信息私下转账，否则无法自动到账！',
  '微信': '温馨提示：请使用微信App进行付款，请勿重复支付，',
  '网银快捷': '请使用手机银行App或U盾网银付款，请勿重复支付，',
  'QQ支付': '温馨提示：请使用QQ进行付款，请勿重复支付，'
}

export const getRecommendList = (Min, Max, num = 0) => {
  let arr = [
    {
      label: Math.ceil(Math.ceil(Min) / 100) * 100 + num,
      value: num ? Math.ceil(Min / 100) * 100 + num : Math.ceil(Math.ceil(Min) / 100) * 100,
    },
    {
      label: Math.floor(Math.floor((Min + Max) * 0.25) / 100) * 100 - num,
      value: Math.floor(Math.floor((Min + Max) * 0.25) / 100) * 100 - num,
    },
    {
      label: Math.floor(Math.floor((Min + Max) * 0.5) / 100) * 100 - num,
      value: Math.floor(Math.floor((Min + Max) * 0.5) / 100) * 100 - num,
    },
    {
      label: Math.floor(Math.floor((Min + Max) * 0.75) / 100) * 100 - num,
      value: Math.floor(Math.floor((Min + Max) * 0.75) / 100) * 100 - num,
    },
    { label: Max - num, value: Max - num },
  ];
  if (!num) {
    return arr;
  } else {
    const map = new Map();
    arr = arr.filter(
      (item) =>
        !map.has(item["value"] + "") && map.set(item["value"] + "", 1)
    );
    return arr.filter((item) => item.value >= Min && item.value <= Max);
  }

}