const path = require('path');
const spawn = require('child_process').spawn;
const concat = require('lodash.concat');
const argv = require('yargs').argv;

const uninstall = argv.uninstall;
const libs =
  uninstall &&
  uninstall !== true ?
    concat([uninstall], argv._)
  :
    argv._;

if (libs && libs.length > 0) {
  console.log(`🏗 Starting ${uninstall ? 'un': ''}installation of ${libs.join(',')}`);
  yarn = spawn('yarn', [
    uninstall ? 'remove' : 'add',
    libs.join(' ')
  ], {
    cwd: path.resolve(__dirname, '../e2e'),
    shell: true,
  });
} else {
  yarn = spawn('yarn', ['install'], {
    cwd: path.resolve(__dirname, '../e2e'),
    shell: true,
  });
}

yarn.stdout.on('data', data => process.stdout.write(data.toString()));
yarn.stderr.on('data', data => process.stdout.write(data.toString()));
yarn.on('error', error => console.log(error));
yarn.on('close', () => console.log('Done 🎉'))
