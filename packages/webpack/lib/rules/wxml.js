'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 处理 wxml 文件
module.exports = function wxmlRule(options = {}) {
  let htmlOptions = {
    attrs: false,
    minifyCSS: false,
    minimize: false,
    removeComments: false,
    removeAttributeQuotes: false,
    removeEmptyElements: false,
    keepClosingSlash: false
  };

  if (!options.IS_DEV) {
    htmlOptions = Object.assign(htmlOptions, {
      minimize: true,
      removeComments: true,
      keepClosingSlash: true
    });
  }

  let htmlRules = [
    'raw-loader',
    'extract-loader',
    './loaders/fix-unary-element-loader',
    {
      loader: 'html-loader',
      options: htmlOptions
    },
    './loaders/fix-unary-element-loader'
  ];

  // 开启缓存
  if (options.cache) htmlRules = ['cache-loader'].concat(htmlRules);

  return {
    test: /\.(wxml|wxs)$/i,
    use: ExtractTextPlugin.extract(htmlRules)
  };
};