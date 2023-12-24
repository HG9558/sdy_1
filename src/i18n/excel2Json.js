const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const shell = require('shelljs');
const credentials = require('./autho.json');
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const authClient = new google.auth.JWT(credentials.client_email, null, credentials.private_key, scopes);
const spreadsheetId = '1NSK3ZaaCEo0WLpqNr9sBf_9EpKtxEYHBo-OQ0g8FGFo';
const sheetName = 'pc_translate';
const sheets = google.sheets({ version: 'v4', auth: authClient });

const savePath = './json';

const contents = {};
const languages = [];
let promises = [];

const generatorJson = savePath => {
  promises = Object.keys(contents).map(key => {
    const targetPath = path.resolve(__dirname, savePath, `${key}.json`);
    return new Promise((resolve, reject) => {
      fs.writeFile(targetPath, JSON.stringify(contents[key], null, 2), err => {
        if (err) {
          reject(err);
        } else {
          console.log(`translate ${key} success`);
          resolve();
        }
      });
    });
  });
};

const runTranslate = async (isBuild = false) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });
    const data = response.data.values;
    data.forEach((row, rowIndex) => {
      let key;
      row.forEach((col, colIndex) => {
        if (rowIndex === 0 && colIndex !== 0) {
          if (!(col in contents)) {
            contents[col] = {};
            languages.push(col);
          }
        }

        if (rowIndex >= 1) {
          if (colIndex === 0) {
            key = col;
          } else {
            const lang = languages[colIndex - 1];
            contents[lang][key] = col;
          }
        }
      });
    });
    generatorJson(savePath);
    if (isBuild) {
      await Promise.all(promises);
      shell.exec('npx i18next-scanner --config src/i18n/i18next-scaner.config.js');
      console.log('67行打印：============:', '执行翻译');
      shell.exec('npx node src/i18n/json2Excel.js');
    }
  } catch (error) {
    console.log('55行打印：============:', error);
  }
};

//- 手动扫描时打开
// runTranslate();

module.exports = {
  runTranslate,
};
