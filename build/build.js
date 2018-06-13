require('./check-versions')();

const env = JSON.parse(process.env.npm_config_argv).original[1];
if(env === 'dev' || env === 'uat1' || env === 'stg' || env === 'prd'){
  process.env.NODE_ENV = '"production"';
}

const fs = require('fs');
const glob = require('glob');
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const environmentConfig = require('./config');

let webpackConfig;
webpackConfig = require('./webpack.build.conf');

const spinner = ora('building for production...');
spinner.start();

const fileUrl = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

rm(fileUrl, err => {
  if (err) throw err;

  let compiler = webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  });

  function doneHandler () {

    const cdnMap = environmentConfig.cdnMapping;
    const envDomain = environmentConfig.environment[env].domain;
    const projectName = process.env.npm_package_name;

    var pattern = path.join(webpackConfig.output.path, environmentConfig.fileFormat);
    const files = glob.sync(pattern);

    let urlArr = '';
    let fileUrl = [];

    files.forEach((file) => {
      urlArr = file.split(environmentConfig.outputFileName);
      if (urlArr && urlArr[1] && !/\.map$/.test(urlArr[1])) {
        fileUrl.push(urlArr[1]);
      }
    });

    files.forEach((file) => {

      try {
        const fileIndex = file.lastIndexOf('.');

        if (environmentConfig.fileReg.test(file.substr(fileIndex))) {
          return;
        }
      }catch (e){
        return;
      }

      let fileContent = fs.readFileSync(file, 'utf-8');

      fileUrl.forEach((fileName) => {
        const regex1 = new RegExp(fileName, 'g');

        let fileFormat = fileName.split('.')[1];

        if (fileFormat !== 'js' && fileFormat !== 'css') {
          fileFormat = 'image';
        }

        const domain = `//${cdnMap[fileFormat].cdn}.${envDomain}`;

        fileContent = fileContent.replace(regex1, `${domain}/${projectName}${fileName}`);

        fs.writeFileSync(file, fileContent, 'utf-8');
      });
    });
  }

  compiler.run(doneHandler);

});
