const path = require('path');
const getPathInfo = p => path.parse(p);
const { google } = require('googleapis');
const fs = require('fs');
const credentials = require('./autho.json');

const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const authClient = new google.auth.JWT(credentials.client_email, null, credentials.private_key, scopes);
const spreadsheetId = '1NSK3ZaaCEo0WLpqNr9sBf_9EpKtxEYHBo-OQ0g8FGFo';
const sheetName = 'pc_translate';
const sheets = google.sheets({ version: 'v4', auth: authClient });

/**
 * @description // 递归读取文件，类似于webpack的require.context()
 * @param {String} directory 文件目录
 * @param {Boolean} useSubdirectories 是否查询子目录，默认false
 * @param {array} extList 查询文件后缀，默认 ['.js']
 *
 */
function autoLoadFile(directory, useSubdirectories = false, extList = ['.js']) {
  const filesList = [];
  // 递归读取文件
  function readFileList(directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory);
    files.forEach(item => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList);
      } else {
        const info = getPathInfo(fullPath);
        extList.includes(info.ext) && filesList.push(fullPath);
      }
    });
  }
  readFileList(directory, useSubdirectories, extList);
  // 生成需要的对象
  const res = filesList.map(item => ({
    path: item,
    data: require(item),
    ...getPathInfo(item),
  }));
  return res;
}
// 自动获取同目录下的json文件夹下的json文件
const fileList = autoLoadFile(path.join(__dirname, './json'), true, ['.json']);

let data = []; // json2xls需要的数据格式: [{zh: "我是中文", en: "i am chinese"}]

fileList.forEach((_, i) => {
  for (const [key, val] of Object.entries(_.data)) {
    if (i === 0) {
      data.push({ 键名: key, [_.name]: val });
    } else {
      data.forEach(e => {
        if (e['键名'] === key) {
          e[_.name] = val;
        }
      });
    }
  }
});

const titleList = Object.keys(data[0]);
data = data.map((item, index) => {
  return Object.values(item);
});
data.unshift(titleList);

const requestBody = {
  values: data,
};

sheets.spreadsheets.values
  .clear({
    spreadsheetId,
    range: sheetName,
  })
  .then(res => {
    sheets.spreadsheets.values.update(
      {
        spreadsheetId,
        range: sheetName,
        valueInputOption: 'RAW',
        resource: requestBody,
      },
      (err, response) => {
        if (err) {
          console.log('🚀 ~ file: json2Excel.js:90 ~ err:', err);
          console.log('🚀 ~ file: json2Excel.js:91 ~ err.errors:', err.errors);
          console.log('🚀 ~ file: json2Excel.js:92 ~  response.data.error:', response.data.error);
          return;
        }
        console.log('数据已成功写入谷歌 Excel 表格。');
      }
    );
  });
