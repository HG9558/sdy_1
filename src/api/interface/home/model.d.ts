declare namespace HOMEAPI {
  type indexNoticeAndAdvParams = {
    terminal: number;
    pageNo: number;
    pageSize: number;
    advType: number;
    evebNum: number;
  }
  type HomeList = {
    id: number;
    ids?: any;
    noticeTitle?: string;
    noticeContent?: string;
    startTime?: string;
    endTime?: string;
    showType?: string | number | boolean;
    available?: number;
    createUser?: string;
    createTime?: string;
    updateUser?: any;
    updateTime?: any;
    pcPath?: any;
    mbPath?: any;
    createStart?: any;
    createEnd?: any;
    availables?: any;
    showTypes?: any;
  }

  type NoticeList = {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    list: HomeList[];
    pageTotalCount: number;
  }

  type Page = {
    evebNum?: any;
    clientShow: number;
    advType?: any;
    picTarget: number;
    actId: number;
    activityId?: any;
    outStation?: any;
    path?: any;
    picPcPath: string;
    picMbPath: string;
    title?: any;
    inType?: any;
    inPageType?: any;
  }

  type indexNoticeAndAdvType = {
    msg: string;
    noticeList: NoticeList;
    code: number;
    page: Page[];
    popUpList: any[];
  }
  type linkDataType = {
    bannerLink: boolean;
    id?: number;
    activityId?: number;
  }


  type getAppSpecifyListData = {
    sort_num: number;
    value: string;
    key: string;
  }

  type getAppSpecifyListType = {
    msg: string;
    code: number;
    data: getAppSpecifyListData[];
  }

  type getWinUserListPage = {
    gameName: string;
    username: string;
    betAmount: number;
    odds: number;
    winAmount: number;
    time: string;
  }

  type getWinUserListRes = {
    msg: string;
    code: number;
    page: getWinUserListPage[];
  }
}