var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
    path                = require('path'),
    webpack             = require('webpack')

module.exports = {

  entry: {
    vendor: [
      'dragon.js',
      'eisley',
      //'moment'
    ],
    app: [
      './app/index.js'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public/js')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        only: [
          'components/**/*.js',
          'config/**/*.js',
          'controllers/**/*.js',
          'mixins/**/*.js',
          'models/**/*.js',
          'node_modules/dragon.js/**/*.js',
          'views/**/*.js',
          'index.js',
          'routes.js'
        ],
        query: {
          //cacheDirectory: true,
          presets: [
            'es2015',
            'stage-0'
          ],
          /*
          TODO: figure out what causes this Error

          Uncaught TypeError: (0 , _typeof3.default) is not a function
          */
          //plugins: ['transform-runtime']
        }
      },
      { test: /\.json$/, loader: 'json-loader' },

      // Bootstrap
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=image/svg+xml"}
    ]
  },

  node: {
    dns: 'empty',
    fs:  'empty',
    net: 'empty'
  },

  resolve: {
    alias: {},
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules'],
    root: [
      path.resolve(__dirname, './app'),
      //path.resolve(__dirname, './node_modules')
    ]
  },
  resolveLoader: {root: path.join(__dirname, 'node_modules')},

  plugins: [
    new webpack.ContextReplacementPlugin(/buffer/, require('node-libs-browser/mock/buffer')),
    new webpack.IgnorePlugin(/node_modules\/^dragon.js/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest'
    })
  ]
}
