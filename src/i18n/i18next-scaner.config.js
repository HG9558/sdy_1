const fs = require("fs");
const { crc32 } = require("crc");
module.exports = {
  input: [
    "src/**/*.{js,jsx,vue}",
    // Use ! to filter out files or directories
		"!src/i18n/**",
		"!**/node_modules/**",
  ],
  output: "./",
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs: ["zh", "en", "vi", "ms"],
    defaultLng: "zh",
    resource: {
      loadPath: "./src/i18n/json/{{lng}}.json",
      savePath: "./src/i18n/json/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    removeUnusedKeys: true,
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    //自己通过该函数来加工key或value
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    parser.parseFuncFromString(
      content,
      { list: ["lang", "t"] },
      (key, options) => {
				options.defaultValue = key;
				let hashKey = `k${crc32(key).toString(16)}`;
				parser.set(hashKey, options);
      }
    );
    done();
  },
};
