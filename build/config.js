module.exports = {
  outputFileName: 'dist',
  fileReg: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
  fileFormat: '**/*.{html,js,css,map,png,jpeg,jpg,gif,svg}',
  environment: {
    dev: {
      domain: 'dev.rs.com'
    },
    uat1: {
      domain: 'uat1.rs.com'
    },
    stg: {
      domain: 'mklmall.com'
    },
    prd: {
      domain: 'mmall.com'
    }
  },
  cdnMapping: {
    js: {
      cdn: 'static1',
      name: 'js'
    },
    css: {
      cdn: 'static2',
      name: 'css'
    },
    image: {
      cdn: 'static3',
      name: 'image'
    },
    png: {
      cdn: 'static3',
      name: 'png'
    },
    jpg: {
      cdn: 'static3',
      name: 'jpg'
    },
    gif: {
      cdn: 'static3',
      name: 'gif'
    },
    bmp: {
      cdn: 'static3',
      name: 'bmp'
    },
    others: {
      cdn: 'static4',
      name: 'others'
    }
  }
};
