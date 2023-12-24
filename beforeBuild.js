const fs = require('fs-extra');
const path = require('path');
const readlineSync = require('readline-sync');

const toPath = url => path.resolve(__dirname, url);

// const  projectName = readlineSync.question('输入你的项目名称（如：sdy, bog, bt8 jun, ybo, ab8, ob8, ysz, hbx, mbs, bw1 等）: ')
const projectName = readlineSync.question(
  '输入你的项目名称（如：sdy, bog, jun, mgm, lua, goa, vvi, ysz, hbx,  bw1, asy, ywb, jss, aus, php, ynd, wpe 等）: '
);
const projectSite = readlineSync.question(
  '输入将要运行的环境名称（如：dcs, pre, goc, sdy, bog,  jun, mgm, lua, goa, vvi, ysz, hbx,  bw1, asy, ywb, jss, aus, php, ynd, wpe 等）: '
);
// const projectSite = readlineSync.question('输入将要运行的环境名称（如：dcs, pre, goc, bog, bt8 jun, ybo, ab8, ob8, ysz, hbx, mbs, bw1 等）: ')

console.log('配置当前站点信息');
function readySiteConfig() {
  let outSiteSitePath = `./configs/sites/${projectSite}.js`;
  const projectSiteConfig = toPath(`./configs/sites/${projectName}/${projectSite}.js`);
  // const outSiteSiteConfig = toPath(outSiteSitePath)
  if (fs.existsSync(projectSiteConfig)) {
    fs.writeFileSync(toPath(outSiteSitePath), fs.readFileSync(projectSiteConfig), { encoding: 'utf-8' });
  }
}
readySiteConfig();
