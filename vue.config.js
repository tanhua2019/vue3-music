
const registerRouter = require('./backend/router')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/variable.scss"; @import "@/assets/scss/mixin.scss";' // v10+
      }
    }
  },
  devServer: {
    // 升级webpack5
    setupMiddlewares: (middlewares, devServer) => {
      registerRouter(devServer.app)
      return middlewares
    }
  }
}
