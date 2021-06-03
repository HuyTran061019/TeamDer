var config = {
   mode:"development",
    entry: './src/index.js',
     
    output: {
       path:'/',
       filename: 'index.js',
       publicPath: '/'
    },
     
    devServer: {
       inline: true,
       port: 8080,
       historyApiFallback: true
    },
     
    module: {
       rules: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
                 
             query: {
                presets: ['es2015', 'react']
             }
          }
       ]
    }
 }
 
 module.exports = config;