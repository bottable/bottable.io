/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const {
  override,
  overrideDevServer,
  removeModuleScopePlugin,
} = require('customize-cra');
const paths = require('react-scripts/config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

// Utility function to replace/remove specific plugin in a webpack config
function replacePlugin(plugins, nameMatcher, newPlugin) {
  const i = plugins.findIndex((plugin) => {
    return (
      plugin.constructor &&
      plugin.constructor.name &&
      nameMatcher(plugin.constructor.name)
    );
  });
  return i > -1
    ? plugins
        .slice(0, i)
        .concat(newPlugin || [])
        .concat(plugins.slice(i + 1))
    : plugins;
}

// Function to override the CRA webpack config
function customOverride(config, env) {
  // Replace single entry point in the config with multiple ones
  // Note: you may remove any property below except "popup" to exclude respective entry point from compilation
  config.entry = {
    popup: paths.appIndexJs,
    options: paths.appSrc + '/options',
    background: paths.appSrc + '/background',
    content: paths.appSrc + '/content',
  };
  // Change output filename template to get rid of hash there
  config.output.filename = 'static/js/[name].js';
  // Disable built-in SplitChunksPlugin
  config.optimization.splitChunks = {
    cacheGroups: { default: false },
  };
  // Disable runtime chunk addition for each entry point
  config.optimization.runtimeChunk = false;

  // Shared minify options to be used in HtmlWebpackPlugin constructor
  const minifyOpts = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  };
  const isEnvProduction = env === 'production';

  // Custom HtmlWebpackPlugin instance for index (popup) page
  const indexHtmlPlugin = new HtmlWebpackPlugin({
    inject: true,
    chunks: ['popup'],
    template: paths.appHtml,
    filename: 'popup.html',
    minify: isEnvProduction && minifyOpts,
  });
  // Replace original HtmlWebpackPlugin instance in config.plugins with the above one
  config.plugins = replacePlugin(
    config.plugins,
    (name) => /HtmlWebpackPlugin/i.test(name),
    indexHtmlPlugin
  );

  // Extra HtmlWebpackPlugin instance for options page
  const optionsHtmlPlugin = new HtmlWebpackPlugin({
    inject: true,
    chunks: ['options'],
    template: paths.appPublic + '/options.html',
    filename: 'options.html',
    minify: isEnvProduction && minifyOpts,
  });
  // Add the above HtmlWebpackPlugin instance into config.plugins
  // Note: you may remove/comment the next line if you don't need an options page
  config.plugins.push(optionsHtmlPlugin);

  // Custom ManifestPlugin instance to cast asset-manifest.json back to old plain format
  const manifestPlugin = new ManifestPlugin({
    fileName: 'asset-manifest.json',
  });
  // Replace original ManifestPlugin instance in config.plugins with the above one
  config.plugins = replacePlugin(
    config.plugins,
    (name) => /ManifestPlugin/i.test(name),
    manifestPlugin
  );

  // Custom MiniCssExtractPlugin instance to get rid of hash in filename template
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'static/css/[name].css',
  });
  // Replace original MiniCssExtractPlugin instance in config.plugins with the above one
  config.plugins = replacePlugin(
    config.plugins,
    (name) => /MiniCssExtractPlugin/i.test(name),
    miniCssExtractPlugin
  );

  // Remove GenerateSW plugin from config.plugins to disable service worker generation
  config.plugins = replacePlugin(config.plugins, (name) =>
    /GenerateSW/i.test(name)
  );

  // Copy "public" content for extension development
  config.plugins.push(
    new CopyPlugin({
      patterns: [{ from: 'public', to: '' }],
    })
  );

  // Reload extension when content script changes
  if (!isEnvProduction)
    config.plugins.push(
      new ExtensionReloader({
        entries: {
          background: 'background',
          contentScript: 'content',
          options: 'options',
          popup: 'popup',
        },
      })
    );

  // Add support for importing workspace projects.
  config.resolve.plugins.push(
    new TsConfigPathsPlugin({
      configFile: path.resolve(__dirname, 'tsconfig.json'),
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      mainFields: ['module', 'main'],
    })
  );

  // Replace include option for babel loader with exclude
  // so babel will handle workspace projects as well.
  config.module.rules.forEach((r) => {
    if (r.oneOf) {
      const babelLoader = r.oneOf.find(
        (rr) => rr.loader.indexOf('babel-loader') !== -1
      );
      babelLoader.exclude = /node_modules/;
      delete babelLoader.include;
    }
  });

  return config;
}

const devServerConfig = () => (config) => {
  return {
    ...config,
    // webpackDevService doesn't write the files to desk
    // so we need to tell it to do so so we can load the
    // extension with chrome
    writeToDisk: true,
  };
};

// Export override function(s) via object
module.exports = {
  webpack: override(customOverride, removeModuleScopePlugin),
  devServer: overrideDevServer(devServerConfig()),
  paths: (paths) => {
    // Rewrite dist folder to where Nx expects it to be.
    paths.appBuild = path.resolve(__dirname, '../../dist/apps/extension');
    return paths;
  },
  jest: (config) => {
    config.resolver = '@nrwl/jest/plugins/resolver';
    return config;
  },
  // You may also override the Jest config (used for tests) by adding property with 'jest' name below. See react-app-rewired library's docs for details
};
