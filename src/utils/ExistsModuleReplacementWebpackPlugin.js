/**
 * 本插件允许你用 newResource 替换与 resourceRegExp 匹配的资源，如果替换后的资源不存在，则会删除路径中 resourceRegExp 匹配的部分
 * @param {RegExp} resourceRegExp  匹配需要替换的路径的正则
 * @param {String} newResource 用来替换的新路径
 * @param {Object} alias 支持的路径别名
 * @param {Array} extensions 支持的拓展名(如果引入路径中不包含拓展名 则按该数组中的拓展名查找)
 */

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = function (
  {
    resourceRegExp,
    newResource,
    alias = {},
    extensions = ['.js', '.vue', 'json']
  }
) {
  // 匹配文件
  const fileReg = new RegExp(`(.*)${resourceRegExp.toString().slice(1, -1)}(\.*)`)
  return new webpack.NormalModuleReplacementPlugin(fileReg, resource => {
    const request = resource.request.replace(resourceRegExp, newResource)
    const checkExists = req => {
      // 获取resource的上下文路径
      const { context } = resource
      const aliasKey = Object.keys(alias).find(k => req.includes(k))

      // 检测是否使用了路径别名
      if (aliasKey) {
        req = path.resolve(alias[aliasKey], req.replace(aliasKey, '.'))
      }
      if (path.extname(req)) {
        // 如果有拓展名 直接检测有没有该文件
        return fs.existsSync(path.resolve(context, req))
      } else {
        // 如果没有拓展名 依次按extensions里的拓展名检查是否存在该文件
        return extensions.some(ext => fs.existsSync(path.resolve(context, req + ext)))
      }
    }
    // 检测个性化文件是否存在 如果存在 使用个性化文件
    resource.request = checkExists(request) ? request : resource.request.replace(resourceRegExp, '')
  })
}