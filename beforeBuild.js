const fs = require('fs-extra');
const path = require('path');
const readlineSync = require('readline-sync');
const axios = require('axios');
const tsStringTemplate = require('./config/tsString');
const { appcode } = require('yargs').argv;
const { runTranslate } = require('./src/i18n/excel2Json');
const shell = require('shelljs');
const { execSync } = require('child_process');

const toPath = url => path.resolve(__dirname, url);
const requestBaseUrl = 'https://strapi-web.wsdy.net/api';

const generateMappingFn = data => {
  let projectStr = '';
  const templateMap = {};
  const siteMap = {};

  data.appcode.forEach((_, index) => {
    projectStr += `${index + 1}: ${_} `;
    templateMap[index + 1] = _;
  });

  data.sitecode.forEach((_, index) => {
    siteMap[index + 1] = _;
  });
  return {
    projectStr,
    templateMap,
    siteMap,
  };
};

const saveGame = async (gameSite, template) => {
  const tempData = {
    sport: [],
    e_sport: [],
    cockfighting: [],
    real: [],
    lottery: [],
    chess: [],
    electronic: [],
    fish: [],
    rollingBall: [],
  };
  const homeTitleList = [];
  return new Promise(resolve => {
    axios
      .get(`${requestBaseUrl}/www-game-lists?filters[gameSite]=${gameSite}&populate=*`)
      .then(res => {
        let data = res.data.data[0].attributes;
        data = deleteTime(data);

        Object.keys(data).forEach(key => {
          if (tempData[key]) {
            let o = data[key].data.map(_ => {
              const target = data.micro_game_list.find(item => item.depotCode === _.attributes.depotCode);
              if (data.micro_game_list?.length && target) {
                _.attributes.isMicroGame = true;
                _.attributes.firstPageShow = target.firstPageShow;
              }
              return _.attributes;
            });
            tempData[key] = o;
          } else if (key === 'home_game') {
            homeTitleList.push(...data[key].data.map(_ => _.attributes));
          }
        });
        const tempStr = `export const gameLists =${JSON.stringify(
          tempData
        )}; \n export const homeTitleList:GameDataType.HomeTitle[] =${JSON.stringify(homeTitleList)}`;
        fs.writeFileSync(toPath(`./src/assets/data/${template}/game_data_template.ts`), tempStr, {
          // encoding: 'utf-8',
        });
        resolve({
          micro_game_list: data.micro_game_list,
          game_sort_map: data.game_sort_map,
          home_hot_game_list: data.home_hot_game_list,
        });
      })
      .catch(e => console.log('147行打印：============:', e));
  });
};

//- 删除strapi无用的属性
const deleteTime = obj => {
  for (let key in obj) {
    if (key === 'createdAt' || key === 'updatedAt' || key === 'publishedAt') {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      deleteTime(obj[key]);
    }
  }
  return obj;
};

const translateImg = ({ logo_info, template }) => {
  if (process.platform === 'linux') {
    const sourceFilePath = path.join(__dirname, 'src', 'hook', 'usePath.ts');
    const targetFilePath = path.join(__dirname, 'prodUseImgPath.ts');
    const targetContent = fs.readFileSync(targetFilePath, 'utf8');
    fs.writeFileSync(sourceFilePath, targetContent);
    console.log('79行打印：============:', 'replace img config file success');
  }

  return new Promise(resolve => {
    const sourceFolder = `./src/assets/wsdy-fastsub/pc/${template}/sites/${logo_info}/ico/${logo_info}`;
    const destFolder = `./public/ico/${logo_info}`;
    fs.mkdir(destFolder, { recursive: true }, err => {
      const files = fs.readdirSync(sourceFolder);
      files.forEach(file => {
        const source = fs.createReadStream(path.join(sourceFolder, file));
        const dest = fs.createWriteStream(path.join(destFolder, file));
        source.pipe(dest);
      });
      setTimeout(resolve, 1000);
    });
  });
};

const deleteFolderRecursive = folderPath => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`已删除文件夹: ${folderPath}`);
  }
};

const deleteImgPath = folderName => {
  const dirPath = './src/assets/wsdy-fastsub/pc/template_2';
  fs.readdir(dirPath, (err, files) => {
    if (err) return console.error('读取文件夹失败', err);
    files.forEach(file => {
      const folderPath = path.join(dirPath, file);
      if (fs.lstatSync(folderPath).isDirectory() && file !== folderName && file !== 'common' && file !== 'sites') {
        deleteFolderRecursive(folderPath);
      }
    });
    const cssPath = `${dirPath}/css_import.scss`;
    const fileContent = `@import './${folderName}/style/index.scss'; @import './${folderName}/style/reset_element.scss';`;
    fs.writeFile(cssPath, fileContent, err => {
      if (err) return console.error(`无法创建文件: ${err}`);
    });
  });
};

const readySiteConfig = configRes => {
  let _appCode, projectType;
  if (typeof configRes === 'string') {
    _appCode = configRes;
  } else {
    _appCode = readlineSync.question(`输入需要编译的站点标识 ${configRes.projectStr}: `);
    _appCode = configRes.templateMap[+_appCode];
  }

  projectType = +_appCode.substring(1, 2);
  axios
    .get(`${requestBaseUrl}/fastwww-${projectType}-settings?filters[appcode]=${_appCode}&populate=*`)
    .then(async res => {
      let tempData = res.data.data[0].attributes;
      tempData = deleteTime(tempData);
      const siteData = tempData.sitecode.data.attributes;
      const languageListArr = tempData.languages.data.sort((a, b) => a.id - b.id);
      const { game_sort_map, home_hot_game_list, micro_game_list } = await saveGame(siteData.site, tempData.template);

      const data = {
        VITE_APP_CODE: _appCode,
        VITE_CURRENT_SITE: tempData.logo_info,
        VITE_CURRENCY_MAP: JSON.stringify(tempData.currency_map.data.attributes),
        VITE_TEMPLATE: tempData.template,
        VITE_THEME: tempData.theme.slice(2),
        VITE_AGT_URL: siteData.agt_url,
        VITE_MICRO_GAME_LIST: JSON.stringify(micro_game_list),
        VITE_SITE_CODE: siteData.site,
        VITE_DEFAULT_DOMAIN: tempData.default_domain,
        VITE_DEFAULT_SPTVTOKEN: siteData.default_sptvtoken,
        VITE_DEFAULTSTOKEN: siteData.default_token,
        VITE_LANGUAGE: tempData.default_language ?? 'zh',
        VITE_APP_TITLE: languageListArr[0].attributes.languageList[tempData.logo_info],
        VITE_HOME_HOT_GAME_LIST: JSON.stringify(home_hot_game_list),
        VITE_SHOW_HISTORY_SPONSOR: tempData.showHistorySponsor,
        VITE_SHOW_DEPOSIT_TIP_DIALOG: tempData.showDepositTipDialog,
        VITE_SHOW_RETURN_WATER: tempData.showReturnWater,
        VITE_IS_AUTO_CONFIG: tempData.is_auto_config,
        VITE_GAME_SORT_MAP: JSON.stringify(game_sort_map),
        VITE_APP_APP_API_URL: JSON.stringify(siteData.url_data),
        VITE_DEPOSIT_TYPE_SORT_MAP: JSON.stringify(tempData.deposit_type_sort_map),
        VITE_AREA_CODE: siteData.area_code,
        VITE_SHOW_VIP_INFO: tempData.show_vip_info,
        VITE_AVATAR_SHOW_VIP: tempData.avatar_show_vip,
        VITE_SHOW_PARTNER: tempData.show_partner,
        VITE_LANGUAGE_LIST: JSON.stringify(
          languageListArr.map(_ => ({
            languageType: _.attributes.languageType,
            languageList: _.attributes.languageList,
          }))
        ),
      };

      const configDataStr = `module.exports = ${JSON.stringify(data)}`;
      fs.writeFileSync(toPath(`./config/${_appCode}_${tempData.logo_info}.js`), configDataStr, {
        encoding: 'utf-8',
      });

      if (typeof configRes === 'string') {
        const saveDate = JSON.parse(JSON.stringify(data));
        saveDate.VITE_LANGUAGE_LIST = JSON.parse(saveDate.VITE_LANGUAGE_LIST);
        saveDate.VITE_CURRENCY_MAP = JSON.parse(saveDate.VITE_CURRENCY_MAP);
        saveDate.VITE_APP_APP_API_URL = JSON.parse(saveDate.VITE_APP_APP_API_URL);
        fs.writeFileSync(toPath('./public/__config__.json'), JSON.stringify(saveDate), {
          encoding: 'utf-8',
        });
      }

      let tempStr = JSON.stringify(tsStringTemplate);
      tempStr = tempStr.replace(/template_1/g, data.VITE_TEMPLATE);
      fs.writeFileSync('./tsconfig.json', tempStr, 'utf-8');
      let str = '';
      Object.keys(data).forEach(key => (str += `${key}=${data[key]}\n`));
      fs.writeFileSync(toPath(`./viteEnvConfig/.env`), str, {
        encoding: 'utf-8',
      });

      if (appcode) {
        //- 初始化子仓库 + 更新子仓库代码
        shell.exec('git submodule update --init --recursive && git submodule foreach git pull origin pc_test');
        process.platform === 'linux' && !tempData.is_auto_config && deleteImgPath(data.VITE_THEME);
        await translateImg(tempData);
        replaceTranslateFile();
        shell.exec('npx vite build');
      }
    })
    .catch(e => console.log('119行打印：============:', e));
};

const replaceTranslateFile = async () => {
  if (getBranch() === 'test' || getBranch() === 'master') await runTranslate(true);
};

const getBranch = () => {
  try {
    const command = 'git rev-parse --abbrev-ref HEAD';
    const branch = execSync(command).toString().trim();
    console.log('245行打印：=====当前分支是=======:', branch);
    return branch;
  } catch (e) {
    console.log('248行打印：============:', e);
    return '';
  }
};

const init = async () => {
  let _ = appcode;
  if (getBranch() === 'test' || getBranch() === 'master') await runTranslate(false);
  if (!appcode) {
    const res = await axios.get(`${requestBaseUrl}/projectlist`);
    _ = generateMappingFn(res.data.data.attributes);
  }
  readySiteConfig(_);
};

init();
