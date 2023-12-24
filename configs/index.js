const path = require('path')
const { site: APP_SITE, env: targetEnv, buildSite } = require('yargs').argv
// eslint-disable-next-line import/no-dynamic-require
let siteUrl =  `sites/${APP_SITE}`
if (buildSite && APP_SITE === 'dcs') {
  siteUrl = `sites/${buildSite}/dcs.js`
}
if (buildSite && APP_SITE === 'pre') {
  if (buildSite === 'goc') {
    siteUrl = `sites/sdy/pre.js`
  } else {
    siteUrl = `sites/${buildSite}/pre.js`
  }
}
const siteConfigs = require( path.resolve(__dirname,siteUrl))
// eslint-disable-next-line import/no-dynamic-require
const envUrl =  `env/${targetEnv}`
const envConfigs = require( path.resolve(__dirname,envUrl))
const stokenconfigs = require('../src/configs/stokenconfig')
const VUE_APP_DEFAULTSTOKEN = stokenconfigs.stokenconfig({site:APP_SITE})

// 把configs的值都转化成'"xxx"'形式
const normalizeConfigs = (configs) => {
  const newConfig = {}
  Object
    .keys(configs)
    .forEach((key) => {
      const value = configs[key]
      newConfig[key] = value
    })
  return newConfig
}

module.exports = {
  normalizeConfigs,
  appConfigs: {
    APP_SITE,
    VUE_APP_DEFAULTSTOKEN,
    ...envConfigs,
    ...siteConfigs,
  },
}
