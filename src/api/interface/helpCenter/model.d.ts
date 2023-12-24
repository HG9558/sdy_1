declare namespace HelpCenterAPI {
  type CategoryList = {
    id: number;
    helpCategoryName: string;
    outRangId: number;
    available: number;
    creater: string;
    createTime: string;
    updater?: any;
    updateTime?: any;
    isdelete: number;
    picPath?: any;
  }

  type helpCategoryListRes = {
    msg: string;
    code: number;
    categoryList: CategoryList[];
  }

  type OprHelpContentList = {
    id: number;
    helpContent: string;
    contentTitle: string;
    helpCategoryId: number;
    helpTitleId: number;
    creater: string;
    createTime: string;
    updater?: any;
    updateTime?: any;
    isdelete: number;
  }

  type CategoryDetail = {
    id: number;
    titleName: string;
    helpCategoryId: number;
    creater: string;
    createTime: string;
    updater?: any;
    updateTime?: any;
    isdelete: number;
    oprHelpContentList: OprHelpContentList[];
  }

  type findTitleAndContentRes = {
    msg: string;
    code: number;
    categoryDetail: CategoryDetail[] | null;
  }

  type findTitleAndContentParams = {
    id: number;
  }
}