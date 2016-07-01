'use strict';
var webpack = require('./src/webpack/make-config.webpack');

// 配置环境变量
var env = {
    target: 'debug',                                            // 设置当前的工作环境
    env: {
        debug: {                                                // 定义工作环境
            debug: true,                                        // 项目类型，debug, release
            src: './src/assets',                                // 资源目录
            dist: './release/assets',                           // 输出目录
            urlDist: '/release/assets',                         // 输出 URL 路径
            externals: {                                        // 指定忽略列表
                // jquery: "$"
            },
            sourceMap: {
                jquery: "js/lib/zepto",
                commonCss: "css/common.css",
                webpackLogo: "img/webpack.png"
            }
        },
        release: {                                              // 定义工作环境
            debug: false,
            src: './src/assets',                                // 资源目录
            dist: './release/assets',                           // 输出目录
            urlDist: '/release/assets',                         // 输出 URL 路径
            externals: {
                //jquery: "$"                                   // 指定忽略列表
            },
            noParse: [],                                        // 忽略对已知文件的解析操作，加快编译速度
            sourceMap: {
                jquery: "js/lib/zepto",
                commonCss: "css/common.css",
                webpackLogo: "img/webpack.png"
            }
        }
    }
};

module.exports = webpack(env);