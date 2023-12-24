declare namespace API {
  type checkBalanceType = {
    msg: string;
    code: number;
    balance: number;
  }
  type messageUnreadParams = {
    msgType: number;
  }

  type messageUnreadType = {
    msg: string;
    code: number;
    data: boolean;
    count: number;
  }

  type loginOutParams = {
    SToken: string;
    token: string;
  }

  type loginOutType = {
    code: number;
    msg: boolean;
  }

  type userInfoType = {
    gender?: string;
    birthday?: string;
    userId?: number;
    loginName?: string;
    nickName?: string;
    depositLock?: number;
    realName?: string;
    registerTime?: string;
    balance?: number;
    available?: number;
    mobile?: string;
    email?: string;
    weChat?: string;
    whatsapp?: any;
    telegram?: any;
    loginPwd?: string;
    securePwd?: any;
    qq?: string;
    userInfoMeasure?: number;
    groupName?: string;
    mbrLevel?: number;
    levelName?: string;
    freeWalletSwitch?: number;
    settlementSwitch?: number;
    settlementBtnShow?: number;
    egSanGongFlg?: number;
    egSanGong?: number;
    egSanGongPromotionUrl?: number;
    depositCondition?: number[];
    withdrawCondition?: number[];
    withDrawalAudit?: number;
    isVerifyGoogle?: number,
  }

  type nickNameType = {
    nickName?: string;
  }

  type isNeedSliderCheckParams = {
    loginName: string
  }


  type isNeedSliderCheckResType = {
    code: number;
    msg: boolean;
  }

  type loginParams = {
    loginName?: string;
    password?: string;
    captchaVerification?: string;
    loginType?: number;
  }

  type chkUserParams = {
    username: string;
  }

  type UserInfo = {
    gender: string;
    birthday: string;
    userId: number;
    loginName: string;
    nickName: string;
    depositLock: number;
    realName: string;
    registerTime: string;
    balance: number;
    available: number;
    mobile: string;
    email: string;
    weChat: string;
    whatsapp?: any;
    telegram?: any;
    loginPwd: string;
    securePwd?: any;
    qq: string;
    userInfoMeasure: number;
    groupName: string;
    mbrLevel: number;
    levelName: string;
    freeWalletSwitch: number;
    settlementSwitch: number;
    settlementBtnShow: number;
    egSanGongFlg: number;
    egSanGong: number;
    egSanGongPromotionUrl: number;
    depositCondition: number[];
    withdrawCondition: number[];
    withDrawalAudit: number;
  }

  type loginResType = {
    msg: string;
    userInfo: UserInfo;
    code: number;
    expire: number;
    token: string;
  }

  type nickNameInfo = {
    userId: number;
    username: string;
    nickName: string;
    available: number;
    createTime: string;
    updateTime: string;
    isgGroupId: number;
    logo: string;
    betSettingsType: number;
    muteStatus: number;
    addFriendStatus: number;
    createGroupStatus: number;
    blacklistStatus: number;
    addIm: number;
  }

  type nickNameInfoResType = {
    msg: string;
    code: number;
    data: nickNameInfo;
  }

  type isCrWithrawType = {
    msg: string;
    code: number;
    crFlag: boolean;
  }

  type sendEquipmentIdParams = {
    deviceUuid: string;
    deviceType: string;
    browserType: string;
  }

  type sendEquipmentIdType = {
    msg: string;
    code: number;
  }

  type reqGetParams = {
    captchaType: string;
    clientUid: string | null;
    ts: number;
  }
  type getRepData = {
    captchaId?: any;
    projectCode?: any;
    captchaType?: any;
    captchaOriginalPath?: any;
    captchaFontType?: any;
    captchaFontSize?: any;
    secretKey: string;
    originalImageBase64: string;
    point?: any;
    jigsawImageBase64: string;
    wordList?: any;
    pointList?: any;
    pointJson?: any;
    token: string;
    result: boolean;
    captchaVerification?: any;
    clientUid?: any;
    ts?: any;
    browserInfo?: any;
  }

  type reqGetResType = {
    repCode: string;
    repMsg?: any;
    repData: getRepData;
    success: boolean;
  }

  type reqCheckParams = {
    captchaType: string;
    pointJson: string;
    token: string;
  }

  type reqCheckResType = {
    repCode: string;
    repMsg: string;
    repData?: any;
    success: boolean;
  }

  type sendMobCodeLogParams = {
    mobile: string;
    captchaVerification: string;
    mobileAreaCode: string;
  }

  type sendMobCodeLogResType = {
    msg: string;
    code: number;
  }

  type forgetpswParams = {
    mobile?: string;
    captchaVerification?: string;
    codeSign?: string;
    mobileAreaCode?: string;
    vaildType?: number;
    email?: string;
  }

  type forgetpswResType = {
    msg: string;
    code: number;
    expire: number;
    token: string;
  }

  type captchajpgParams = {
    terminal: number;
  }

  type captchajpgType = {
    msg: string;
    code: string;
    codeSign: string;
  }

  type validCodeParams = {
    mobile?: string;
    code: string;
    token: string;
    vaildType?: number;
    email?: string;
  }

  type validCodeResType = {
    msg: string;
    code: number;
    expire: number;
    token: string;
  }

  type modpwdParams = {
    password: string;
    confirmPassword: string;
    token: string;
    vaildType?: number;
  }

  type modpwdResType = {
    code: number;
    msg: string;
  }

  type regSettingType = {
    accWebRegister: boolean;
    addressisVisible: boolean;
    addressisRequire: boolean;
    captcharegisVisible: boolean;
    captcharegisRequire: boolean;
    deviceUuidisVisible: boolean;
    deviceUuidisRequire: boolean;
    emailisVisible: boolean;
    emailisRequire: boolean;
    loginIpisVisible: boolean;
    loginIpisRequire: boolean;
    loginNameisVisible: boolean;
    loginNameisRequire: boolean;
    loginPwdisVisible: boolean;
    loginPwdisRequire: boolean;
    mailCaptcharegisRequire: boolean;
    mailCaptcharegisVisible: boolean;
    mobileisVisible: boolean;
    mobileisRequire: boolean;
    mobileCaptcharegisVisible: boolean;
    mobileCaptcharegisRequire: boolean;
    promotionisVisible: boolean;
    promotionisRequire: boolean;
    qqisVisible: boolean;
    qqisRequire: boolean;
    realNameisVisible: boolean;
    realNameisRequire: boolean;
    registerMethod: string;
    reLoginPwdisVisible: boolean;
    reLoginPwdisRequire: boolean;
    smsMobileCompelBindisRequire: boolean;
    telegramisVisible: boolean;
    telegramisRequire: boolean;
    weChatisVisible: boolean;
    weChatisRequire: boolean;
    whatsappisVisible: boolean;
    whatsappisRequire: boolean;
  }

  type regSettingResType = {
    msg: string;
    code: number;
    regSetting: RegSetting;
  }

  type regRuleType = {
    loginName?: string;
    loginPwd?: string;
    reLoginPwd?: string;
    mobile?: string;
    addressis?: string;
    emailis?: string;
    qq?: string;
    realName?: string;
    weChat?: string;
    mobileCaptchareg?: string;
  }

  type getSendMobCodeRegParams = {
    mobile: string;
    captchaVerification: string;
    mobileAreaCode: string;
  }
  type getSendMobCodeRegResType = {
    msg: string;
    code: number;
  }

  type registerParams = {
    loginName?: string;
    loginPwd?: string;
    reLoginPwd?: string;
    captchaVerification: string;
    registerDevice: string;
    mainDomain: string;
    mobileAreaCode?: any;
    loginType: number;
  }

  type regUserInfo = {
    gender?: any;
    birthday?: any;
    userId: number;
    loginName: string;
    nickName: string;
    depositLock: number;
    realName: string;
    registerTime: string;
    balance: number;
    available: number;
    mobile: string;
    email: string;
    weChat: string;
    whatsapp?: any;
    telegram?: any;
    loginPwd: string;
    securePwd?: any;
    qq: string;
    userInfoMeasure: number;
    groupName: string;
    mbrLevel: number;
    levelName: string;
    freeWalletSwitch: number;
    settlementSwitch: number;
    settlementBtnShow: number;
    egSanGongFlg: number;
    egSanGong: number;
    egSanGongPromotionUrl: number;
    depositCondition: any[];
    withdrawCondition: any[];
    withDrawalAudit: number;
  }

  type registerResType = {
    msg: string;
    userInfo: regUserInfo;
    code: number;
    expire: number;
    loginFlag: boolean;
    token: string;
  }

  type getUserInfoUserInfo = {
    gender: string;
    birthday: string;
    userId: number;
    loginName: string;
    nickName: string;
    depositLock: number;
    realName: string;
    registerTime: string;
    balance: number;
    available: number;
    mobile: string;
    email: string;
    weChat: string;
    whatsapp?: any;
    telegram?: any;
    loginPwd: string;
    securePwd?: any;
    qq: string;
    userInfoMeasure: number;
    groupName: string;
    mbrLevel: number;
    levelName: string;
    freeWalletSwitch: number;
    settlementSwitch: number;
    settlementBtnShow: number;
    egSanGongFlg: number;
    egSanGong: number;
    egSanGongPromotionUrl: number;
    depositCondition: number[];
    withdrawCondition: number[];
    withDrawalAudit: number;
  }

  type getUserInfoRes = {
    msg: string;
    userInfo: getUserInfoUserInfo;
    code: number;
  }

  type mbrRebateAgentInfoData = {
    isShowMbrAgent: boolean;
    agyflag?: any;
    isApply?: any;
    codeId?: any;
    appDomain?: any;
    validPayoutForSelf?: any;
    validPayoutFromChild?: any;
    commissionRatio?: any;
    rebate?: any;
    commissionRatioSub?: any;
    bonusAmountExfromChildTotal?: any;
    rebateFromChildActual?: any;
    rebateTotal?: any;
    childList?: any;
  }

  type mbrRebateAgentInfoRes = {
    msg: string;
    code: number;
    data: mbrRebateAgentInfoData;
  }

  type updateNickNameParas = {
    nick: string
  }

  type verifyPwdParams = {
    lastPwd: string
  }
  type modPwdParams = {
    confirmPwd: string
    lastPwd: string
    pwd: string
  }
  type sendMobCodeParams = {
    captchaVerification: string
    mobile: string
    mobileAreaCode: string
  }
  type vfyMobCodeParams = {
    code: string
    mobile: string
    mobileAreaCode: string
  }
  type setAccMailParams = {
    email: string
  }
  type modRealNameParams = {
    realName: string
  }
  type setBirthdayParams = {
    birthday: string
  }
  type setGenderParams = {
    gender: string
  }

  type freeWalletSwitchParams = {
    status: number;
  }

  type freeWalletSwitchRes = {
    code: number;
    msg: string;
  }

  type transferInPlatformParams = {
    amount: number;
    depotId: number;
  }
}