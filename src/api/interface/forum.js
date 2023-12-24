import ajax from '../http.js'

//- 获取分类列表
export const listCircle = params => ajax({ url: '/splive/app/listCircle', type: 'post', params })
//- 帖子列表获取
export const listPost = params => ajax({ url: '/splive/app/listPost', type: 'post', params })
//- 未登录帖子列表获取
export const listPostGuest = params => ajax({ url: '/splive/app/listPostGuest', type: 'post', params })
//- 获取访问量
export const PostRead = params => ajax({ url: `/splive/app/PostRead?postId=${params.postId}&terminal=1`, type: 'post' })
//- 未登录进行访问量获取
export const PostReadGuest = params => ajax({ url: `/splive/app/PostReadGuest?postId=${params.postId}&terminal=1`, type: 'post' })
//- 获取评论列表
export const listPostComment = params => ajax({ url: `/splive/app/listPostComment`, type: 'post', params })
//- 未登录状态评论列表获取
export const listPostCommentGuest = params => ajax({ url: `/splive/app/listPostCommentGuest`, type: 'post', params })
