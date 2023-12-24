let { VUE_APP_APP_SIGN } = process.env
export default {
  name: 'userRule',
  data () {
    return {
      logReg: '/[a-zA-Z0-9]{6,16}/',
      accountLoginRule: {
        loginName: [{ validator: this.validatorLoginName, trigger: 'blur' }],
        password: [{ validator: this.validatorPassword, trigger: 'blur' }],
        captchaVerification: [{ validator: this.validatorTxCode, trigger: 'blur' }],
      },
      mobileLoginRule: {
        mobile: [{ validator: this.validatePhone, trigger: "blur" }],
        captchaVerification: [{ validator: this.validatorTxCode, trigger: "blur" }],
        mobileCaptcha: [{ validator: this.validatePhoneCode, trigger: "blur" }],
      },
			emailFormRule: {
				email: [{ validator: this.validateEmail, trigger: "blur" }],
				captchaVerification: [{ validator: this.validatorTxCode, trigger: "blur" }],
				code: [{ validator: this.validatePhoneCode, trigger: "blur" }],
			},
      registerFormRule: {
        loginName: [{ validator: this.validatorLoginName, trigger: "blur" }],
        loginPwd: [{ validator: this.validatorPassword, trigger: "blur" }],
        reLoginPwd: [
          { validator: this.validatePassword, trigger: "blur" },
          { validator: this.validateComfirmpsw, trigger: "blur" },
        ],
        mobile: [{ validator: this.validatePhone, trigger: "blur" },
        ],
        addressis: [{ required: true, message: this.$t('地址不能为空'), trigger: "blur" }],
        email: [{ validator: this.validateEmail, trigger: "blur" }],
        qq: [{ validator: this.validateQQ, trigger: "blur" }],
        weChat: [{ required: true, message: this.$t('微信不能为空'), trigger: "blur" }],
        realName: [{ validator: this.validateRealName, trigger: "blur" }],
        whatsapp: [{ required: true, message: this.$t('whatsapp不能为空'), trigger: "blur" }],
        telegram: [{ required: true, message: this.$t('telegram不能为空'), trigger: "blur" }],
        mobileCaptchareg: [{ validator: this.validatePhoneCode, trigger: "blur" }],
				mailCaptchareg: [{ validator: this.validatePhoneCode, trigger: "blur" }],
      },
      rmbBankFormDataRule: {
        address: [
          {
            require: true,
            message: this.$t('支行名称不能为空，请输入支行名称！'),
            trigger: "blur",
          },
          { validator: this.validateBankName, trigger: "blur" },
        ],
        cardNo: [
          {
            required: true,
            message: this.$t('银行账号不能为空，请输入银行账号！'),
            trigger: 'blur',
          },
          {
            min: 16,
            max: 19,
            message: this.$t('银行账号应为16到19位纯数字'),
            trigger: ['blur', 'change'],
          },
        ],
        city: [
          {
            required: true,
            message: this.$t('请选择开户银行区域'),
            trigger: 'blur',
          }
        ],
        code: [{ validator: this.validatePhoneCode, trigger: "blur" }]
      },
      cyBankRules: {
        currencyProtocol: [
          { required: true, message: this.$t('请选择协议类型'), trigger: 'change' },
        ],
        walletName: [
          { required: true, message: this.$t('请选择钱包类型'), trigger: "change" },
        ],
        walletAddress: [
          { required: true, message: this.$t('请输入钱包地址'), trigger: ["blur"] },
          { validator: this.validateAddress, trigger: "blur" },
        ],
        checkWalletAddress: [
          { required: true, message: this.$t('请再次输入钱包地址'), trigger: "blur" },
          { validator: this.validateAddress2, trigger: "blur" },
        ],
        captchareg: [
          { required: true, message: this.$t('验证码不能为空'), trigger: "blur" },
          { validator: this.validateCaptchaReg, trigger: "blur" },
        ],
        code: [
          { validator: this.validatePhoneCode, trigger: "blur" }
        ]
      },
      alipayBankRule: {
        cardNo: [
          { required: true, message: this.$t('支付宝验证码不能为空'), trigger: 'blur' },
          { min: 10, max: 32, validator: this.validateAlipayNo, trigger: ['blur', 'change'] },
        ],
        code: [
          { validator: this.validatePhoneCode, trigger: "blur" },
        ],
      },
      ecnyBankRule: {
        cardNo: [
          { required: true, message: this.$t('数字人民币编码不能为空'), trigger: 'blur' },
        ],
        realName: [
          { required: true, message: this.$t('数字人民币姓名不能为空'), trigger: 'blur' },
        ],
        code: [
          { required: true, message: this.$t('验证码不能为空'), trigger: "blur" },
          { validator: this.validatePhoneCode, trigger: "blur" },
        ],
      },
      otherPayRule: {
        address: [
          { required: true, message: this.$t('请选择钱包类型'), trigger: "change" },
        ],
        cardNo: [
          { required: true, message: this.$t('请输入钱包地址'), trigger: ["blur"] },
          // { validator: this.validateAddress, trigger: "blur" },
        ],
        checkCardNo: [
          { required: true, message: this.$t('请再次输入钱包地址'), trigger: "blur" },
          { validator: this.validateCarcNo2, trigger: "blur" },
        ],
        captchareg: [
          { required: true, message: this.$t('验证码不能为空'), trigger: "blur" },
          { validator: this.validateCaptchaReg, trigger: "blur" },
        ],
        code: [
          { validator: this.validatePhoneCode, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    validatorLoginName (rule, value, callback) {
      const maxNum = rule.field === 'loginName' ? 16 : '10'
      const accountReg = new RegExp(`[a-zA-Z0-9]{6,${maxNum}}`)
      if (!value) {
        callback(new Error(this.$t('请输入用户名')));
      } else if (!accountReg.test(value)) {
        callback(new Error(this.$tt('loginName', [maxNum])));
      } else {
        callback();
      }
    },
    validatorPassword (rule, value, callback) {
      const passwordReg = /^[0-9a-zA-Z]{6,18}$/g;
      if (!value) {
        callback(new Error(this.$t('请输入密码')));
      } else if (!passwordReg.test(value) && value !== "") {
        callback(new Error(this.$tt('loginName', [18])));
      } else {
        callback();
      }
    },
    validatorTxCode (rule, value, callback) {
      if (!value) {
        callback(new Error(this.$t('请完成安全验证')));
      } else {
        callback();
      }
    },
    //- 手机号码校验
    validatePhone (rule, value, callback) {
      const mobileReg = this.mobileArea === 2 ? /^09[0-9]\d{7}$/ : /^1[1-9]\d{9}$/;
      if (!value) {
        callback(new Error(this.$t('手机号码不能为空')));
      } else if (!mobileReg.test(value)) {
        callback(new Error(this.$t('请输入正确的手机号码')));
      } else {
        callback();
      }
    },
    //- 图形验证码校验
    validateCaptchaReg (rule, value, callback) {
      if (!value) {
        callback(new Error(this.$t('验证码不能为空')));
      } else if (!/[0-9]/.test(value)) {
        callback(new Error(this.$t('请输入正确验证码')));
      } else {
        callback();
      }
    },
    //- 手机验证码校验
    validatePhoneCode (rule, value, callback) {
      // console.log(value)
      if (!value) {
        callback(new Error(this.$t('验证码不能为空')));
      } else if (!/[0-9]{4,6}$/.test(value)) {
        callback(new Error(this.$t('请输入正确的验证码')));
      } else {
        callback();
      }
    },
    //-  确认密码验证
    validateComfirmpsw (rule, value, callback) {
      if (!value) {
        callback(new Error(this.$t('确认密码不能为空')));
      } else if (
        this.registerForm.loginPwd !== value
      ) {
        callback(new Error(this.$t('密码与确认密码不一致，请重新输入')));
      } else {
        callback();
      }
    },
    //- 邮箱验证吗
    validateEmail (rule, value, callback) {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!value) {
        callback(new Error(this.$t('邮箱不能为空')));
      } else if (!emailReg.test(value)) {
        callback(new Error(this.$t('请输入正确的邮箱')));
      } else {
        callback();
      }
    },
    //-验证QQ号
    validateQQ (rule, value, callback) {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!value) {
        callback(new Error(this.$t('QQ不能为空')));
      } else if (!/[1-9][0-9]{0,14}/.test(value)) {
        callback(new Error(this.$t('请输入小于15位且为数字的QQ号码')));
      } else {
        callback();
      }
    },
    //- 验证，真实姓名
    validateRealName (rule, value, callback) {
      if (!['vvi', 'bw1'].includes(VUE_APP_APP_SIGN)) {
				// {n,} 至少两位字符
        const nameReg = /^[A-Za-z\u4E00-\u9FA5\uF900-\uFA2D\u00B7\u0020]{2,}$/
        if (!value) {
          callback(new Error(this.$t('真实姓名不能为空')));
        } else if (!nameReg.test(value)) {
          callback(new Error(this.$t('请输入正确的真实姓名')));
        } else {
          callback();
        }
      } else {
        if (!value) {
          callback(new Error(this.$t('真实姓名不能为空')));
        } else if (value.length === 1) {
          callback(new Error(this.$t('请输入正确的真实姓名')));
        } else {
          callback();
        }
      }
    },
    //- 验证银行卡名称
    validateBankName (rule, value, callback) {
      // 银行名称
      if (!value) {
        callback(new Error(this.$t('支行名称不能为空，请输入支行名称！')));
      } else if (!/[\u4e00-\u9fa5]{2,20}/.test(value)) {
        callback(new Error(this.$t('请输入正确的银行名称')));
      } else {
        callback();
      }
    },
    //- 验证 usdt 钱包地址
    validateAddress (rule, value, callback) {
      const isTRC20 = this.cyBankForm.currencyProtocol.id === 'TRC20'
      let reg = isTRC20 ? /^T\w{33}/.test(value) : /^0x[0-9a-fA-F]{40}$/.test(value)
      const errText = isTRC20 ? this.$t('暂只支持T开头的34位TRC20地址') : this.$t('暂只支持0x开头的42位ERC20地址')
      if (!reg) {
        callback(new Error(errText));
      } else {
        if (this.cyBankForm.checkWalletAddress !== "") {
          this.$refs.cyBankForm.validateField("checkWalletAddress");
        }
        callback();
      }
    },
    //- 验证确认 usdt 钱包地址
    validateAddress2 (rule, value, callback) {
      if (value !== this.cyBankForm.walletAddress) {
        callback(new Error(this.$t('两次输入钱包地址不一致，请核对后重新输入!')));
      } else {
        callback();
      }
    },
    //- 验证确认 otherpay 钱包地址
    validateCarcNo2 (rule, value, callback) {
      if (value !== this.otherPayForm.cardNo) {
        callback(new Error(this.$t('两次输入钱包地址不一致，请核对后重新输入!')));
      } else {
        callback();
      }
    },
    //- 验证  支付宝账号
    validateAlipayNo (rule, value, callback) {
      const maxNum = 32, minNum = 10;
      const accountReg = new RegExp(`[a-zA-Z0-9]{${minNum},${maxNum}}`)
      if (!value) {
        callback(new Error(this.$t('请输入支付宝账号')));
      } else if (!accountReg.test(value)) {
        callback(new Error(this.$tt('alipayAccount', [minNum , maxNum])));
      } else {
        callback();
      }
    }
  },
}
