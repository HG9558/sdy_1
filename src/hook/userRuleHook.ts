// import { useNormalState, useEnvState } from '@/stores';
import { lang, _lang } from '../i18n'
import { api } from '@/api';

const mainState = useNormalState();
const envState = useEnvState()

export type ruleType = {
  field: string;
  fullField: string
  type: string
  validator: Function
}

export default () => {
  const validatorLoginName = (rule: ruleType, value: string, callback: Function) => {
    const maxNum = rule.field === 'loginName' ? 16 : '10'
    const accountReg = new RegExp(`[a-zA-Z0-9]{6,${maxNum}}`)
    if (!value) {
      callback(new Error(lang("请输入用户名")));
    } else if (!accountReg.test(value)) {
      callback(new Error(_lang('loginName', [maxNum])));
    } else {
      callback();
    }
  }

  const cache: { [key: string]: { msg: string, valid: boolean } } = {};
  const validatorRegName = (rule: ruleType, value: string, callback: Function) => {
    const maxNum = rule.field === 'loginName' ? 16 : '10';
    const accountReg = new RegExp(`[a-zA-Z0-9]{6,${maxNum}}`);
    if (!value) {
      callback(new Error(lang("请输入用户名")));
    } else if (!accountReg.test(value)) {
      callback(new Error(_lang('loginName', [maxNum])));
    } else if (cache[value]) {
      const { msg, valid } = cache[value];
      if (valid) {
        callback();
      } else {
        callback(new Error(msg));
      }
    } else {
      api.user.chkUser({ username: value }).then(res => {
        if (res.msg) {
          cache[value] = { msg: lang("该账号已存在"), valid: false };
          callback(new Error(lang("该账号已存在")));
        } else {
          cache[value] = { msg: '', valid: true };
          callback();
        }
      });
    }
  };

  const validatorPassword = (_rule: ruleType, value: string, callback: Function) => {
    const passwordReg = /^[0-9a-zA-Z]{6,18}$/g;
    if (!value) {
      callback(new Error(lang("请输入密码")));
    } else if (!passwordReg.test(value) && value !== "") {
      callback(new Error(_lang('password', [18])));
    } else {
      callback();
    }
  }

  const validatorTxCode = (_rule: ruleType, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(lang("请完成安全验证")));
    } else {
      callback();
    }
  }

  const mobileAreasCfg = mainState.mobileAreaCodes.map(item => {
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

  const activeCfg = () => {
    return mobileAreasCfg.find(v => {
      return v.mobileAreaCode === mainState.mobileAreaCode;
    }) || mobileAreasCfg[0] || {
      "id": 1,
      "mobileAreaCode": "86",
      "countryCode": "CN",
      "countryName": "中国",
      "englishName": "China",
      "siteCode": "dcs",
      "maxlength": 11,
      "reg": /^1[1-9]\d{9}$/
    }
  }

  //- 手机号码校验
  const validatePhone = (_rule: ruleType, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(lang('手机号码不能为空')))
    } else if (!activeCfg().reg.test(value)) {
      callback(new Error(lang('请输入正确的手机号码')));
    } else {
      callback();
    }
  }

  //- 手机验证码校验
  const validatePhoneCode = (_rule: ruleType, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(lang("验证码不能为空")));
    } else if (!/[0-9]{4,6}$/.test(value)) {
      callback(new Error(lang("请输入正确的验证码")));
    } else {
      callback();
    }
  }

  //- 邮箱验证吗
  const validateEmail = (_rule: ruleType, value: string, callback: Function) => {
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!value) {
      callback(new Error(lang("邮箱不能为空")));
    } else if (!emailReg.test(value)) {
      callback(new Error(lang("请输入正确的邮箱")));
    } else {
      callback();
    }
  }

  //-验证QQ号
  const validateQQ = (_rule: ruleType, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(lang("QQ不能为空")));
    } else if (!/[1-9][0-9]{0,14}/.test(value)) {
      callback(new Error(lang("请输入小于15位且为数字的QQ号码")));
    } else {
      callback();
    }
  }

  //- 验证，真实姓名
  const validateRealName = (_rule: ruleType, value: string, callback: Function) => {
    const nameReg = /^[A-Za-z\u4E00-\u9FA5\uF900-\uFA2D\u00B7\u0020]{2,100}$/
    if (!value) {
      callback(new Error(lang("真实姓名不能为空")));
    } else if (!nameReg.test(value)) {
      callback(new Error(lang("请输入正确的真实姓名")));
    } else {
      callback();
    }
  }

  //- 验证银行卡名称
  const validateBankName = (_rule: ruleType, value: string, callback: Function) => {
    const isAUD = envState.vite_currency_map.type === 'AUD';
    const isVN = envState.vite_currency_map.type === 'VN';
    if (isVN) {
      callback()
    }
    const regTest = isAUD ? /[0-9]{6,10}$/ : /[\u4e00-\u9fa5]{2,20}/;
    if (!value) {
      callback(new Error(isAUD ? lang('bsb码不能为空！') : lang("支行名称不能为空，请输入支行名称！")));
    } else if (!regTest.test(value)) {
      callback(new Error(isAUD ? lang('请输入正确的bsb码') : lang("请输入正确的银行名称")));
    } else {
      callback();
    }
  }

  //- 图形验证码校验
  // const validateCaptchaReg = (_rule: ruleType, value: string, callback: Function) => {
  //   if (!value) {
  //     callback(new Error(lang("验证码不能为空")));
  //   } else if (!/[0-9]/.test(value)) {
  //     callback(new Error(lang("请输入正确验证码")));
  //   } else {
  //     callback();
  //   }
  // }

  //- 验证  支付宝账号
  const validateAlipayNo = (_rule: ruleType, value: string, callback: Function) => {
    const maxNum = 32, minNum = 10;
    const accountReg = new RegExp(`[a-zA-Z0-9]{${minNum},${maxNum}}`)
    if (!value) {
      callback(new Error(lang("请输入支付宝账号")));
    } else if (!accountReg.test(value)) {
      callback(new Error(_lang('alipayAccount', [minNum, maxNum])));
    } else {
      callback();
    }
  }

  const accountLoginRule = {
    loginName: [{ validator: validatorLoginName, trigger: 'blur' }],
    password: [{ validator: validatorPassword, trigger: 'blur' }],
    captchaVerification: [{ validator: validatorTxCode, trigger: 'blur' }],
  };


  //- 手机号码表单
  const mobileLoginRule = {
    mobile: [{ validator: validatePhone, trigger: "blur", maxlength: 15 }],
    captchaVerification: [{ validator: validatorTxCode, trigger: "blur" }],
    mobileCaptcha: [{ validator: validatePhoneCode, trigger: "blur" }],
    email: [{ validator: validateEmail, trigger: "blur", }],
  };

  //- 邮箱
  const emailFormRule = {
    email: [{ validator: validateEmail, trigger: "blur", }],
    captchaVerification: [{ validator: validatorTxCode, trigger: "blur" }],
    code: [{ validator: validatePhoneCode, trigger: "blur" }],
  };

  //- 谷歌验证
  const googleFormRule = {
    loginName: [{ validator: validatorLoginName, trigger: 'blur' }],
    googleCode: [{ validator: validatePhoneCode, trigger: "blur" }],
  };

  const registerFormRule = (registerForm: API.regRuleType) => {
    //-  确认密码验证
    const validateComfirmpsw = (_rule: ruleType, value: string, callback: Function) => {
      if (!value) {
        callback(new Error(lang("确认密码不能为空")));
      } else if (registerForm.loginPwd !== value) {
        callback(new Error(lang("密码与确认密码不一致，请重新输入")));
      } else {
        callback();
      }
    }

    return {
      loginName: [{ validator: validatorRegName, trigger: "blur" }],
      loginPwd: [{ validator: validatorPassword, trigger: "blur" }],
      reLoginPwd: [
        { validator: validatorPassword, trigger: "blur" },
        { validator: validateComfirmpsw, trigger: "blur" },
      ],
      mobile: [{ validator: validatePhone, trigger: "blur" },
      ],
      addressis: [{ required: true, message: "地址不能为空", trigger: "blur" }],
      email: [{ validator: validateEmail, trigger: "blur" }],
      qq: [{ validator: validateQQ, trigger: "blur" }],
      weChat: [{ required: true, message: "微信不能为空", trigger: "blur" }],
      realName: [{ validator: validateRealName, trigger: "blur" }],
      mobileCaptchareg: [{ validator: validatePhoneCode, trigger: "blur" }],
    }
  }

  const rmbBankFormDataRule = {
    bankName: [
      {
        required: true,
        message: envState.vite_currency_map.type === 'AUD' ? lang('请选择提款方式') : lang('请选择开户银行'),
        trigger: ["blur", 'submit'],
      }
    ],
    address: [
      {
        required: true,
        message: envState.vite_currency_map.type === 'AUD' ? lang('bsb码不能为空！') : lang('"支行名称不能为空，请输入支行名称！"'),
        trigger: "blur",
      },
      { validator: validateBankName, trigger: "blur" },
    ],
    cardNo: [
      {
        required: true,
        message: lang('银行账号不能为空，请输入银行账号！'),
        trigger: 'blur',
      },
      {
        min: envState.vite_currency_map.type === 'AUD' ? 1 : envState.vite_currency_map.type === 'VN' ? 8 : 16,
        max: envState.vite_currency_map.type === 'AUD' ? 60 : envState.vite_currency_map.type === 'VN' ? 16 : 19,
        message: envState.vite_currency_map.type === 'AUD' ? lang('请输入正确的银行账号') : envState.vite_currency_map.type === 'VN' ? lang('银行账号应为8到16位纯数字') : lang('银行账号应为16到19位纯数字'),
        trigger: ['blur', 'change'],
      },
    ],
    city: [
      {
        required: true,
        message: lang('请选择开户银行区域'),
        trigger: 'blur',
      }
    ],
    code: [{ validator: validatePhoneCode, trigger: "blur" }]
  };


  const alipayBankRule = {
    cardNo: [
      { required: true, message: lang('支付宝账号不能为空'), trigger: 'blur' },
      { min: 10, max: 32, validator: validateAlipayNo, trigger: ['blur', 'change'] },
    ],
    code: [
      { required: true, message: lang("验证码不能为空"), trigger: "blur" },
      { validator: validatePhoneCode, trigger: "blur" },
    ],
  };


  const ecnyBankRule = {
    cardNo: [
      { required: true, message: lang('数字人民币编码不能为空'), trigger: 'blur' },
    ],
    realName: [
      { required: true, message: lang('数字人民币姓名不能为空'), trigger: 'blur' },
    ],
    code: [
      { required: true, message: lang("验证码不能为空"), trigger: "blur" },
      { validator: validatePhoneCode, trigger: "blur" },
    ],
  };

  type moneyRuleType = {
    curMoney: number | string;
    text: string;
  }

  const validateMoney = (rule: moneyRuleType, value: string, callback: Function) => {
    const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
    if (!value) {
      callback(new Error(lang("请输入金额")));
    } else if (!reg.test(value)) {
      callback(new Error(lang("请输入最多两位小数的数值")));
    } else if (value > rule.curMoney) {
      callback(new Error(rule.text));
    } else {
      callback();
    }
  }

  const moneyRule = (data: moneyRuleType) => {
    return {
      money: [{ validator: validateMoney, trigger: 'change', ...data }],
    }
  }

  return {
    accountLoginRule,
    mobileLoginRule,
    registerFormRule,
    rmbBankFormDataRule,
    alipayBankRule,
    ecnyBankRule,
    mobileAreasCfg,
    activeCfg,
    moneyRule,
    emailFormRule,
    googleFormRule,
    validatePhone
  }
}