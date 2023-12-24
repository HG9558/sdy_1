import TIM from 'tim-js-sdk'
import $http from '../api'

/**
 * 腾讯云 SDKAppId，需要替换为您自己账号下的 SDKAppId。
 *
 * 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav ) 创建应用，即可看到 SDKAppId，
 * 它是腾讯云用于区分客户的唯一标识。
 */
const { VUE_APP_TIM_SDK_APP_ID } = process.env

// 初始化 SDK 实例
export default async () => {
  let imSdkAppID = null;
  try {
    const res = await $http.getSdkAppId()
    imSdkAppID = res.data.imSdkAppID;
  } catch (error) {
    imSdkAppID = VUE_APP_TIM_SDK_APP_ID
  }
  const tim = TIM.create({
    SDKAppID: Number(imSdkAppID),
  })
  tim.setLogLevel(1)
  return tim;
}
