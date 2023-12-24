const fs = require('fs');
const crc32 = require('crc_32_ts').CRC32;

module.exports = {
  input: ['src/**/*.{js,ts,vue}', '!src/i18n/**', '!**/node_modules/**'],
  output: './',
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs: ['zh', 'en', 'vi', 'ms', 'zh_tw', 'INDONESIA'],
    defaultLng: 'zh',
    resource: {
      loadPath: './src/i18n/json/{{lng}}.json',
      savePath: './src/i18n/json/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    removeUnusedKeys: true,
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    //自己通过该函数来加工key或value
    ('use strict');
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    parser.parseFuncFromString(content, { list: ['lang', 't_c'] }, (key, options) => {
      options.defaultValue = key;
      // let hashKey = `k${crc32(key).toString(16)}`;
      let hashKey = `k${crc32.str(key).toString(16)}`;
      parser.set(hashKey, options);
    });
    done();
  },
};
