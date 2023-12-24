import $http from '../../api'

export default {
  //- 是否允许前端进行注册
  async _stationSettingWithCache (store) {
    const result = await $http.getQueryStationSe()
    store.commit('set_station_setting', result.data.data)
  },
  async getMobileAreaCodes (store) {
    const result = await $http.getMobileAreaCodes()
    store.commit('set_mobileAreaCodes', result.data.mobileAreaCodes)
  },
  // 获取后台短信验证码开关
  async getIsNeedVfySecurity (store) {
    const result = await $http.getIsNeedVfySecurity()
		const { isNeedSms, isNeedMail } = result.data
    store.commit('set_isNeedVfySecurity', { isNeedSms, isNeedMail })
  },
  updateMyProfile ({ state, rootState }, nick) {
    const { tim } = window
    try {
      const promise = tim.updateMyProfile({
        nick: nick || rootState.user.nickNameInfo.nickName || rootState.user.userInfo.nickName || rootState.user.userInfo.loginName
      })
      promise.then((imResponse) => {
        console.log(imResponse, '更新IM资料成功')
      }).catch((imError) => {
        console.warn('更新IM资料 error:', imError)
      })
    } catch (error) {
      console.log(error)
    }
  },
}
