import ajax from '../http.js'

//-世界杯-赛程
export const getWorldCupSchedule = params => ajax({ url: `/splive/feijing/getWorldCupSchedule?date=${params.date}&leagueId=${params.leagueId}`})

//-世界杯-积分
export const getWorldCupScore = params => ajax({ url: '/splive/feijing/getWorldCupScore', params})

// 资讯
export const getWorldCupNews = params => ajax({ url: '/splive/app/news/listAppWorldCupNews', params, type: 'post'})

// 资讯详情
export const getWorldCupNewsDetail = params => ajax({ url: '/splive/app/news/getAppNewsContent?id=' + params.id, type: 'post'})

// 相关资讯
export const getWorldCupNewsRelate = params => ajax({ url: '/splive/app/news/getRelateAppArticleNewsList', params, type: 'post'})
