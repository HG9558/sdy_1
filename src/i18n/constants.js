import state from '../store/global/state';

const { VUE_APP_APP_SIGN, VUE_APP_APP_BANK_ARE_CODE } = process.env;

let currencyMap = null;
try {
  currencyMap = {
    ynd: {
      en: { label: 'IDR', value: 'Rp',  symbol: 'Rp' },
      ms: { label: 'IDR', value: 'Rp', symbol: 'Rp' },
      zh: { label: '印尼盾', value: 'Rp',  symbol: 'Rp' },
    },
    wpe: {
      en: { label: 'MYR', value: 'MYR', symbol: 'MYR' },
      ms: { label: 'MYR', value: 'MYR', symbol: 'MYR' },
      zh: { label: '马币', value: 'MYR', symbol: 'MYR' },
    },
    aus: {
      en: { label: 'AUD', value: 'A$',  symbol: 'A$' },
      zh: { label: '澳币', value: 'A$',  symbol: 'A$' },
    },
    ywb: {
      zh: { label: '澳币', value: ' A$', symbol: ' A$' },
      en: { label: 'Australian Dollar', value: ' A$', symbol: ' A$' },
    },
    goa: {
      en: { label: 'USD', value: ' USD', symbol: ' $' },
    },
    vvi: {
      en: { label: 'MYR', value: 'MYR', symbol: 'MYR' },
      zh: { label: '马币', value: 'MYR', symbol: 'MYR' },
    },
    bw1: (() => {
      if (VUE_APP_APP_BANK_ARE_CODE === 'MY') {
        return {
          en: { label: 'MYR', value: 'MYR', symbol: 'MYR' },
          zh: { label: '马币', value: 'MYR', symbol: 'MYR' },
        };
      }
      return {
        en: { label: 'AUD', value: 'A$', symbol: 'A$' },
        zh: { label: '澳币', value: 'A$', symbol: 'A$' },
      };
    })(),
    jss: {
      en: { label: 'RMB', value: 'RMB', symbol: '¥' },
      zh: { label: '人民币', value: '元', symbol: '￥' },
      vi: { label: 'RMB', value: 'RMB', symbol: '¥' },
    },
    php: {
      en: { label: 'PHP', value: 'PHP', symbol: '₱' },
      zh: { label: '披索', value: 'PHP', symbol: '₱' },
    },
    jvi: {
      zh: { label: '越币', value: 'VND', symbol: '₫' },
      vi: { label: 'VND', value: 'VND', symbol: '₫' },
    },
    lua: {
      zh: { label: '越币', value: 'VND', symbol: '₫' },
      vi: { label: 'VND', value: 'VND', symbol: '₫' },
    },
    mgm: {
      zh: { label: '马币', value: 'MYR', symbol: 'MYR' },
      en: { label: 'MYR', value: 'MYR', symbol: 'MYR' },
      ms: { label: 'MYR', value: 'MYR', symbol: 'MYR' },
    },
  }[VUE_APP_APP_SIGN][state.language] || { label: '人民币', value: '元', symbol: '￥' };
} catch (e) {
  currencyMap = { label: '人民币', value: '元', symbol: '￥' };
}

let appTitle = null;
try {
  appTitle =
    {
      ynd: {
        zh: 'Marispin',
        ms: 'Marispin',
        en: 'Marispin',
      },
      wpe: {
        zh: 'WePlay',
        ms: 'WePlay',
        en: 'WePlay',
      },
      aus: {
        zh: 'AU77 Sports',
        en: 'AU77 Sports',
      },
      ywb: {
        zh: '澳世娱乐城',
        en: 'SDY Sports',
      },
      goa: {
        en: 'GOAL Sports',
      },
      vvi: {
        zh: 'VVIP WIN Sports',
        en: 'VVIP WIN Sports',
      },
      bw1: {
        zh: '澳世娱乐城',
        en: 'SYD Entertainment',
      },
      jss: {
        zh: '金沙集团',
        en: 'SANDS GROUP',
      },
      php: {
        zh: '55X',
        en: '55X',
      },
      jvi: {
        zh: '君博体育',
        vi: 'JUN BET SPORTS',
      },
      lua: {
        zh: 'LUA999',
        vi: 'LUA999',
      },
      mgm: {
        zh: '美高梅娱乐城',
        en: 'MGM Casino',
        ms: 'MGM Casino',
      },
    }[VUE_APP_APP_SIGN][state.language] || '君博体育';
} catch (e) {
  appTitle = '君博体育';
}

let appText = null;
try {
  appText = appText =
    {
      ynd: {
        zh: 'Marispin',
        ms: 'Marispin',
        en: 'Marispin',
      },
      wpe: {
        zh: 'WePlay',
        ms: 'WePlay',
        en: 'WePlay',
      },
      aus: {
        zh: 'AU77',
        en: 'AU77',
      },
      ywb: {
        zh: '澳世娱乐城',
        en: 'SDY Sports',
      },
      goa: {
        en: 'GOAL Sports',
      },
      vvi: {
        zh: 'VVIP WIN Sports',
        en: 'VVIP WIN Sports',
      },
      bw1: {
        zh: '澳世娱乐城',
        en: 'SYD Entertainment',
      },
      jss: {
        zh: '金沙集团',
        en: 'SANDS GROUP',
      },
      php: {
        zh: '55X',
        en: '55X',
      },
      jvi: {
        zh: '君博',
        vi: 'JUN BET',
      },
      lua: {
        zh: 'LUA999',
        vi: 'LUA999',
      },
      mgm: {
        zh: '美高梅',
        en: 'MGM',
        ms: 'MGM',
      },
    }[VUE_APP_APP_SIGN][state.language] || '君博';
} catch (e) {
  appText = '君博';
}

let languages = [
  {
    value: 'zh',
    label: '中文简体',
  },
];

if (VUE_APP_APP_SIGN === 'mgm') {
  languages = [
    ...languages,
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'ms',
      label: 'Malay',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'goa') {
  languages = [
    {
      value: 'en',
      label: 'English',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'jvi') {
  languages = [
    {
      value: 'vi',
      label: 'Tiếng Việt',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'lua') {
  languages = [
    {
      value: 'vi',
      label: 'Tiếng Việt',
    },
    {
      value: 'th',
      label: 'ไทย',
    },
    {
      value: 'id',
      label: 'Bhs Indonesia',
    },
    {
      value: 'ms',
      label: 'Malay',
    },
    {
      value: 'au',
      label: 'Australia',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'vvi') {
  languages = [
    ...languages,
    {
      value: 'en',
      label: 'English',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'bw1') {
  languages = [
    ...languages,
    {
      value: 'en',
      label: 'English',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'jss') {
  languages = [
    ...languages,
    {
      value: 'en',
      label: 'English',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'php') {
  languages = [
    ...languages,
    {
      value: 'en',
      label: 'English',
    },
  ];
}

if (VUE_APP_APP_SIGN === 'aus') {
	languages = [
		...languages,
		{
			value: 'en',
			label: 'English'
		},
	]
}

if (VUE_APP_APP_SIGN === 'ynd') {
  languages = [
    {
      value: 'en',
      label: 'English'
    },
    {
      value: 'ms',
      label: 'Indonesia',
    },
    ...languages,
  ]
}

if (VUE_APP_APP_SIGN === 'wpe') {
  languages = [
    {
      value: 'en',
      label: 'English'
    },
    {
      value: 'ms',
      label: 'Malay',
    },
    ...languages,
  ]
}

export const languageOptions = languages

export { currencyMap, appTitle, appText };
