
const path = require('path')
const { appConfigs, normalizeConfigs } = require('./configs')

let {
  APP_SITE,
  VUE_APP_APP_TEMPLATE,
  VUE_APP_APP_CODE,
  VUE_APP_APP_TITLE,
  VUE_APP_APP_EN_TITLE,
  VUE_APP_LANGUAGE,
} = appConfigs

if (APP_SITE === 'bts') {
  VUE_APP_APP_CODE = 'bts'
}

process.env = Object.assign({}, process.env, { ...normalizeConfigs(appConfigs) })

// 路径别名
const alias = {
  '@': path.resolve(__dirname, 'src/'),
  'pages': path.resolve(__dirname, `src/pages/${VUE_APP_APP_TEMPLATE}`),
  'common': path.resolve(__dirname, 'src/common'),
  'components': path.resolve(__dirname, 'src/components'),
  'commonComponent': path.resolve(__dirname, `src/components/${VUE_APP_APP_TEMPLATE}`),
  'static_data': path.resolve(__dirname, `src/common/static_data/${VUE_APP_APP_TEMPLATE}`),
}

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

const mapStaticDomain = {
  default: 'https://download.injiepor.com',
  hbx: 'https://download.fvinbet.com',
  bw1: 'https://downloadcf.injiepor.com',
  bog: 'https://download.injiepor.com',
  ywb: 'https://downloadccs.injiepor.com',
}

const publicPath = mapStaticDomain[VUE_APP_APP_CODE] ? `${mapStaticDomain[VUE_APP_APP_CODE]}/${VUE_APP_APP_CODE}/pc/dist` : `${mapStaticDomain['default']}/${VUE_APP_APP_CODE}/pc/dist`

module.exports = {
  configureWebpack: {
    resolve: {
      alias
    },
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : publicPath,
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.plugin('html')
      .tap(args => {
        const language = VUE_APP_LANGUAGE || 'zh'
        if (language === 'zh') {
          args[0].title = VUE_APP_APP_TITLE
        } else {
          args[0].title = VUE_APP_APP_EN_TITLE || VUE_APP_APP_TITLE
        }
        return args;
      })
    config.module
      .rule('images')
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
      .end()
  },

  devServer: {
    host: '0.0.0.0',
    port: 9092,
  },
  css: {
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, `./src/common/style/mixin.scss`),
        path.resolve(__dirname, `./src/common/style/variable/${VUE_APP_APP_TEMPLATE}_var.scss`),
      ]
    }
  },
}
