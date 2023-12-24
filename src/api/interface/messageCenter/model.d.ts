declare namespace MsAPI {
  type messageInfoList = {
    id?: number;
    messageId?: number;
    textContent?: string;
    imageUrl?: any;
    createTime?: string;
    createUser?: string;
    isSign?: number;
    isRead?: number;
    isReadSys?: number;
    isDelete?: number;
    expirationTime?: any;
    accountId?: any;
    loginName?: any;
    loginNameList?: any;
    agyList?: any;
    groupList?: any;
    msgType?: any;
    mbrIsRead?: any;
    infoId?: any;
    isMessage?: any;
    num?: any;
    setReadType?: any;
    isPush?: any;
    isAllDevice?: any;
    pushTitle?: any;
    noticeTitle?: string;
    pushContent?: any;
    siteCode?: any;
    timeToLive?: number;
    noticeContent?: string;
    isNotice?: boolean;
    startTime?: string;
  }

  type messageInfoData = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: messageInfoList[];
    pageTotalCount: number;
  }

  type messageInfoResType = {
    msg: string;
    code: number;
    data: messageInfoData;
  }
  type messageInfoParams = {
    key?: string;
    pageNo: number;
    pageSize: number;
    msgType: number;
    isRead: number;
    mbrIsRead: number;
  }


  type NoticeList = {
    id: number;
    ids?: any;
    noticeTitle: string;
    noticeContent: string;
    startTime: string;
    endTime: string;
    showType: string;
    available: number;
    createUser: string;
    createTime: string;
    updateUser: string;
    updateTime: string;
    pcPath?: any;
    mbPath?: any;
    createStart?: any;
    createEnd?: any;
    availables?: any;
    showTypes?: any;
  }

  type NoticePage = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: NoticeList[];
    pageTotalCount: number;
  }

  type NoticeResType = {
    msg: string;
    code: number;
    page: NoticePage;
  }
  type NoticeParams = {
    pageSize: number;
    pageNo: number;
    showType: number;
  }
  type mbReadParams = {
    id?: number;
    setReadType: number;
  }
  type deleteNoticeParams = {
    id: number;
  }
  type ResType = {
    code: number;
    msg: string;
    data?: boolean;
  }

}