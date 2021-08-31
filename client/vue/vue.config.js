const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias.set("@", resolve("src"));
    },
    devServer: {  
        proxy: {  
          '/api': {  
          target: 'http://192.168.1.4:3000', // 后台请求地址  
          ws: true,  
          changeOrigin: true,  
          pathRewrite: {  
						'^/api': '' //通过pathRewrite重写地址，将前缀/api转为/  
          }  
        }  
       }
    }  
};
