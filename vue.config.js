// 引入别名配置
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
// 判断生产环境
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5, // 换算的基数(37.5是ipone6宽度视图开发)
                        // 忽略转换正则匹配项。插件会转化所有的样式的px。
                        // 比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
                        // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                        selectorBlackList: ['weui', 'mu'],
                        propList: ['*']
                    })
                ]
            },
            less: {
                modifyVars: {
                    white: '#191919',
                    black: '#fff',
                    blue: '#fff',
                    'picker-option-disabled-opacity': '1',
                    'text-link-color': '#C8A76A',
                    'gray-6': '#fff',
                    'gray-7': '#fff',
                    'text-color': '#fff',
                    'toast-background-color': '#191919',
                    'toast-text-color': '#fff',
                    'toast-loading-icon-color': '#fff'
                }
            }
        }
    },
    chainWebpack: (config) => {
        // 配置别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
        if (IS_PROD) {
            config.optimization.minimizer('terser').tap((args) => {
                // 去除生产环境console
                args[0].terserOptions.compress.drop_console = true
                return args
            })
        }
        // svg
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader,如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        // 添加要替换的 loader
        svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        // 生产环境分析项目资源
        // if (IS_PROD) {
        //     config
        //         .plugin('webpack-bundle-analyzer')
        //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        // }
    },
    configureWebpack: (config) => {
        if (IS_PROD) {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    // gzip压缩配置
                    test: /\.js$|\.css/, // 匹配文件名
                    threshold: 1024, // 对超过10kb的数据进行压缩
                    deleteOriginalAssets: false // 是否删除原文件
                })
            )
        }
    },
    devServer: {
        // open: false, // 是否自动弹出浏览器页面
        // host: 'localhost',
        port: '1111',
        disableHostCheck: true,
        https: false, // 是否使用https协议
        hotOnly: true,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API, // 'http://13.250.112.4:5859'
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
