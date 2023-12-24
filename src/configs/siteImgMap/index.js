import state from "@/store/global/state"
const { language } = state

let {  VUE_APP_APP_SIGN } = process.env

export default {
	logo: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/logo_${language}.png`)
		} catch (e) {
			try {
				return require(`./images/${VUE_APP_APP_SIGN}/logo_en.png`)
			} catch (e) {
				return null
			}
		}
	})(),
	footerLogo: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/footer-logo_${language}.png`)
		} catch (e) {
			try {
				return require(`./images/${VUE_APP_APP_SIGN}/footer-logo_en.png`)
			} catch (e) {
				return null
			}
		}
	})(),
	downloadPhone: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/first_phone_${language}.png`)
		} catch (e) {
			try {
				return require(`./images/${VUE_APP_APP_SIGN}/first_phone_en.png`)
			} catch (e) {
				return null
			}
		}
	})(),
	qrCode: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/qrcode-logo.png`)
		} catch (e) {
			return null
		}
	})(),
	defaultBanner: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/default_banner_${language}.png`)
		} catch (e) {
			try {
				return require(`./images/${VUE_APP_APP_SIGN}/default_banner_en.png`)
			} catch (e) {
				return null
			}
		}
	})(),
	matchDefaultBg: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/match-default-bg.png`)
		} catch (e) {
			return null
		}
	})(),
	serviceAvatar: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/servicer.png`)
		} catch (e) {
			return null
		}
	})(),
	headerMenuIos: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/special_ios_${language}.png`)
		} catch (e) {
			try {
				return require(`./images/${VUE_APP_APP_SIGN}/special_ios_en.png`)
			} catch (e) {
				return null
			}
		}
	})(),
	headerMenuAndroid: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/special_android_${language}.png`)
		} catch (e) {
			try {
				return require(`./images/${VUE_APP_APP_SIGN}/special_android_en.png`)
			} catch (e) {
				return null
			}
		}
	})(),
	loadGif: (() => {
		try {
			return require(`./images/${VUE_APP_APP_SIGN}/load_${language}.gif`)
		} catch (e) {
			try {
				return require(`./images/${VUE_APP_APP_SIGN}/load_en.gif`)
			} catch (e) {
				try {
					return require(`./images/${VUE_APP_APP_SIGN}/load.gif`)
				} catch (e) {
					return require(`./images/common_load.gif`)
				}
			}
		}
	})(),
}
