import ajax from '../../http.js'

export default {
  //- vip 数据 
  getVipInfo: (): Promise<VipAPI.vipInfoRes> => ajax({ url: '/sdyactivity/vipInfo' }),
  //- 晋级优惠
  getVipPrivileges: (): Promise<VipAPI.accountVipPrivilegesRes> => ajax({ url: '/sdyactivity/accountVipPrivileges' }),
  //- 生日接口
  getBirthday: (): Promise<VipAPI.accountBirthdayRes> => ajax({ url: '/sdyactivity/accountBirthday' }),
  //- 不返水列表
  getGameListWithoutRebate: (): Promise<VipAPI.getGameListWithoutRebateRes> => ajax({ url: '/sys/getGameListWithoutRebate' }),
  //- 立即领取
  getActApply: (params: VipAPI.actApplyParams): Promise<VipAPI.actApplyRes> => ajax({ url: `/user/actApply`, params, method: "post" })

}
