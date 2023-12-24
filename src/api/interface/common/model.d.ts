declare namespace API {
  type siteCode = {
    url: string
  }
  type loginByEmailParams = {
    email: string;
    mailCaptcha: string;
    loginType: number;
  }

  type loginByGoogleParams = {
    loginName: string;
    googleCode: string;
  }

  type sendEmailCodeLogParams = {
    email: string;
    captchaVerification: string;
  }

  type sendEmailCodeRegParams = {
    email: string;
    captchaVerification: string;
  }

  type ISideCodeRes = {
    SToken: string;
    code: number;
    isI18n: number;
    language: string;
    msg: string;
  }

  type MobileAreaCode = {
    id: number;
    mobileAreaCode: string;
    countryCode: string;
    countryName: string;
    englishName: string;
    siteCode: string;
  }

  type MobileAreaCodeObject = {
    msg: string;
    mobileAreaCodes: MobileAreaCode[];
    code: number;
  }

  type IsNeedVfySecurityRes = {
    msg: string;
    mobileAreaCodes: MobileAreaCode[];
    code: number;
    isNeedMail: number;
    isNeedSms: number;
    isNeedGoogle: number,
  }

  type sendSecurityMailCodeParams = {
    module: number;
    captchaVerification: string;
    email: string;
  }


  type vfySecurityEmailCodeParams = {
    module: number;
    code: string;
    email: string;
  }

  type IService = {
    terminal: number
  }

  type IServiceRes = {
    msg: string;
    code: number;
    data: string;
  }

  type sendEmailCodeLogRes = {
    msg: string;
    code: number;
  }


  type vfySecurityEmailCodeParamsRes = {
    msg: string;
    code: number;
  }
  type sendEmailCodeRegRes = {
    msg: string;
    code: number;
  }

  type queryStationSetData = {
    defaultQueryDays?: any;
    memberQueryDays?: any;
    passwordExpireDays?: any;
    logoPath: string;
    titlePath: string;
    websiteTitle?: any;
    websiteKeywords?: any;
    websiteDescription?: any;
    configCodePc: string;
    configCodeMb: string;
    configCodePc1: string;
    configCodeMb1: string;
    autoDeleteDays?: any;
    websiteCodePc: string;
    websiteCodeMb: string;
    createTimeFrom?: any;
    createTimeTo?: any;
    agentDomainAnalysisSite: string;
    accWebRegister: boolean;
    configTelegram: string;
    configSkype: string;
    configFlygram: string;
    pcIconTelegram: string;
    appIconTelegram: string;
    titleTelegram: string;
    pcIconSkype: string;
    appIconSkype: string;
    titleSkype: string;
    pcIconFlygram: string;
    appIconFlygram: string;
    titleFlygram: string;
    showWebSite: string;
    androidDownloadUrl?: any;
    iosDownloadUrl?: any;
    usdtBuyUrl: string;
    [key: string]: any;
  }

  type queryStationSetType = {
    msg: string;
    code: number;
    data: queryStationSetData;
  }

  type CurrencyMapType = {
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    type: string;
    label: string;
    wap_label: string;
    value: string;
    symbol: string;
    en_label: string;
    zh_label: string;
  }

}