import ajax from '../http.js'

//- 红包雨详情
export const redPacketRainInfo = params => ajax({ url: '/sdyactivity/redPacketRainInfo', params })

// - 红包雨点击事件
export const redPacketClick = params => ajax({ url: '/sdyactivity/redPacketClick', params })

// - 新红包雨接口
// - 新红包雨排行榜
export const redEnvelopeRecord = params => ajax({ url: '/activity/redNewEnvelope/getRedEnvelopeActivityRankingInfo', params })

//- 领取红包
export const applyNewRedEnvelope = params => ajax({ url: '/activity/redNewEnvelope/applyNewRedEnvelope', params })

//- 红包信息
export const getRedEnvelopeActivityTimeInfo = params => ajax({ url: '/activity/redNewEnvelope/getRedEnvelopeActivityTimeInfo', params })
