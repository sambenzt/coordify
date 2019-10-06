const path = require('path')

module.exports = {
    entry : './src/main.js',
    output:{
        path:path.resolve(__dirname,'extension/js'),
        filename:'bundle.js',
        publicPath:'/extension/js'
    },
    devServer:{
        host:'0.0.0.0',
        port:8008,
        inline:true
    }
};