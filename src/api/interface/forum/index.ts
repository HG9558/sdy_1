import ajax from '../../http.js'

export default {
  //- 获取分类列表
  listCircle: (params: forumAPI.listCircleParams): Promise<forumAPI.listCircleRes> => ajax({ url: '/splive/app/listCircle', method: 'post', params }),
  //- 帖子列表获取
  listPost: (params: forumAPI.listPostParams): Promise<forumAPI.listPostRes> => ajax({ url: '/splive/app/listPost', method: 'post', params }),
  //- 未登录帖子列表获取
  listPostGuest: (params: forumAPI.listPostParams): Promise<forumAPI.listPostRes> => ajax({ url: '/splive/app/listPostGuest', method: 'post', params }),
  //- 获取访问量
  PostRead: (params: forumAPI.PostReadGuestParams): Promise<forumAPI.PostReadGuestRes> => ajax({ url: `/splive/app/PostRead?postId=${params.postId}&terminal=1`, method: 'post' }),
  //- 未登录进行访问量获取
  PostReadGuest: (params: forumAPI.PostReadGuestParams): Promise<forumAPI.PostReadGuestRes> => ajax({ url: `/splive/app/PostReadGuest?postId=${params.postId}&terminal=1`, method: 'post' }),
  //- 获取评论列表
  listPostComment: (params: forumAPI.listPostCommentGuestParams): Promise<forumAPI.listPostCommentGuestRes> => ajax({ url: `/splive/app/listPostComment`, method: 'post', params }),
  //- 未登录状态评论列表获取
  listPostCommentGuest: (params: forumAPI.listPostCommentGuestParams): Promise<forumAPI.listPostCommentGuestRes> => ajax({ url: `/splive/app/listPostCommentGuest`, method: 'post', params }),
}
