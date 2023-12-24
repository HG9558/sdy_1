declare namespace forumAPI {
  type listCircleParams = {
    terminal: 1
  }

  type listCircleData = {
    type: string;
    name: string;
    postAmount?: number;
    createTime?: string;
    updateTime?: string;
    id?: number;
    adminId?: number;
    username?: any;
    nickName?: any;
    circle?: number | null;
    isExit?: boolean;
    matchType: string;
  }

  type listCircleRes = {
    msg: string;
    code: number;
    data: listCircleData[];
  }

  type listPostParams = {
    circle: null | number | undefined;
    listType: number;
    pageNo: number;
    pageSize: number;
  }

  type listPostList = {
    id: number;
    title?: any;
    content: string;
    picture: string;
    readAmount: number;
    likeAmount: number;
    commentAmount: number;
    collectAmount: number;
    followAmount: number;
    status: number;
    circle: number;
    createTime: string;
    updateTime: string;
    playerName: string;
    logo: string;
    isLiked?: any;
    isCollected?: any;
    isFollowed?: any;
    username?: any;
    nickName?: any;
    adminId?: any;
    type?: string
  }

  type listPostData = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: listPostList[];
  }

  type listPostRes = {
    msg: string;
    code: number;
    data: listPostData;
  }

  type PostReadGuestParams = {
    postId: number;
    terminal: number;
  }
  type PostReadGuestRes = {
    msg: string;
    code: number;
  }

  type listPostCommentGuestParams = {
    pageNo: number;
    pageSize: number;
    postId: number;
  }

  export interface listPostCommentGuestList {
    id: number;
    postId: number;
    playerName: string;
    content: string;
    likeAmount: number;
    isLiked?: any;
    createTime: string;
    logo: string;
    reply: any[];
  }

  type listPostCommentGuestData = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: listPostCommentGuestList[];
  }

  type listPostCommentGuestRes = {
    msg: string;
    code: number;
    data: listPostCommentGuestData;
  }
}