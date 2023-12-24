export const mobileAreaCfg = {
	0: {
		mobileAreaCode: 61,
		maxlength: 9,
		label: '澳洲 +61',
		reg: /^\d{9}$/,
	},
	1: {
		mobileAreaCode: 86,
		maxlength: 11,
		label: '中国 +86',
		reg: /^1[1-9]\d{9}$/,
	},
	2: {
		mobileAreaCode: 886,
		maxlength: 10,
		label: '台湾 +886',
		reg: /^09[0-9]\d{7}$/,
	},
}

export const mobileRules = [{ validator: validatePhone, trigger: "blur" }]

function validatePhone (rule, value, callback) {
	const reg = mobileAreaCfg[this.mobileArea]
	if (!value) {
		callback(new Error('手机号码不能为空'))
	} else if (!reg.test(value)) {
		callback(new Error("请输入正确的手机号码"));
	} else {
		callback();
	}
}
