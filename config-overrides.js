const {
  override,
  useEslintRc,
  addWebpackResolve,
  addBundleVisualizer,
  disableEsLint,
  addWebpackPlugin,
} = require('customize-cra');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const excludePackages = (config) => {
  config.externals = [
    (context, request, callback) => {
      if (/canvg|pdfmake/.test(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ];
  return config;
};

module.exports = override(
  // usual webpack plugin
  disableEsLint(),
  // useEslintRc(path.resolve(__dirname, '.eslintrc.js')),
  addWebpackResolve({
    alias: { '@': path.resolve(__dirname, 'src') },
  }),
  process.env.BUNDLE_VISUALIZE === '1' && addBundleVisualizer(),
  excludePackages,
  addWebpackPlugin(
    new HTMLWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      hash: JSON.stringify(process.env.BUILD_GIT_HASH),
      branch: JSON.stringify(process.env.BUILD_GIT_BRANCH),
    })
  ),
  addWebpackPlugin(
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '',
    })
  )
);
