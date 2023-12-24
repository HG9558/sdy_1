import { lang } from "@/i18n"

export const getMobileAreasCfg = (mobileAreaCodes = []) => {
  return mobileAreaCodes.map( item => {
    switch (item.countryCode) {
      case 'CN':
        return {
          ...item,
          maxlength: 11,
          reg: /^1[1-9]\d{9}$/,
        }
      case 'TW':
        return {
          ...item,
          maxlength: 10,
          reg: /^09[0-9]\d{7}$/,
        }
      case 'AUD':
        return {
          ...item,
          maxlength: 9,
          reg: /^\d{9}$/,
        }
      case 'VN':
        return {
          ...item,
          maxlength: 10,
          reg: /^(\d{9}|\d{10})$/,
        }
      default:
        return {
          ...item,
          maxlength: 60,
          reg: /^\d{1,60}$/,
        }
    }
  })
}

export function getActiveMobileAreaCfg(mobileAreaCode = '86', mobileAreasCfg = []) {
    mobileAreasCfg = getMobileAreasCfg(mobileAreasCfg)
    const activeCfg = mobileAreasCfg.find(v => v.mobileAreaCode === mobileAreaCode) || mobileAreasCfg[0] || {}
    function validatePhone(rule, value, callback) {
        if (!value) {
            callback(new Error(lang('手机号码不能为空')))
        } else if (!activeCfg.reg.test(value)) {
            callback(new Error(lang('请输入正确的手机号码')));
        } else {
            callback();
        }
    }

    return {
        rules: [{validator: validatePhone, trigger: 'blur'}],
        ...activeCfg,
    }
}
