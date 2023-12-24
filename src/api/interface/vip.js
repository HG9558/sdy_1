import ajax from '../http.js'

//- vip 数据 无参
export const getVipInfo = () => ajax({ url: '/sdyactivity/vipInfo?' })

//- 晋级优惠
export const getVipPrivileges = () => ajax({ url: '/sdyactivity/accountVipPrivileges?' })

//- 生日接口
export const getBirthday = () => ajax({ url: '/sdyactivity/accountBirthday?' })

export const getGameListWithoutRebate = () => ajax({ url: '/sys/getGameListWithoutRebate' })
