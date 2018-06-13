/**
 * Created by lenovo on 2017/10/13.
 */

const env = 'uat1';

module.exports = {
  '/api-longguo': {
    // 测试环境
    target: 'http://longguo.' + env + '.com',  // 接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api-longguo': ''   //需要rewrite重写的,
    }
  },
  '/api-innovation': {
    // 测试环境
    target: 'http://api-inno-lab-e.uat1.rs.com',  // 接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api-innovation': ''   //需要rewrite重写的,
    }
  },
  '/api-sale': {
    // 测试环境
    target: 'http://mmc.'+env+'.rs.com',  // 接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api-sale': 'mmc'   //需要rewrite重写的,
    }
  },
  '/api-aps': {
    // 测试环境
    target: 'http://aps.'+env+'.rs.com',  // 接口域名
    // target: 'http://10.11.28.26:57202',  // 接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api-aps': 'aps'   //需要rewrite重写的,
    }
  }
}
