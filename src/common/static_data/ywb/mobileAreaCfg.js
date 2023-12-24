import { lang } from "@/i18n";

export const mobileAreaCfg = {
	0: {
		mobileAreaCode: 61,
		maxlength: 9,
		label: lang('澳洲'),
		reg: /^\d{9}$/,
	},
	1: {
		mobileAreaCode: 86,
		maxlength: 11,
		label: lang('中国'),
		reg: /^1[1-9]\d{9}$/,
	},
	2: {
		mobileAreaCode: 886,
		maxlength: 10,
		label: lang('台湾'),
		reg: /^09[0-9]\d{7}$/,
	},
}

export const mobileRules = [{ validator: validatePhone, trigger: "blur" }]

function validatePhone (rule, value, callback) {
	const reg = mobileAreaCfg[this.mobileArea]
	if (!value) {
		callback(new Error(lang('手机号码不能为空')))
	} else if (!reg.test(value)) {
		callback(new Error(lang('请输入正确的手机号码')));
	} else {
		callback();
	}
}
