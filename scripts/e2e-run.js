const spawn = require('child_process').spawn;
const path = require('path');

var getNetworkIPs = (function () {
    var ignoreRE = /^(127\.0\.0\.1|::1|fe80(:1)?::1(%.*)?)$/i;

    var exec = require('child_process').exec;
    var cached;
    var command;
    var filterRE;

    switch (process.platform) {
    case 'win32':
    case 'win64':
        command = 'ipconfig';
        filterRE = /\bIPv4[^:\r\n]+:\s*([^\s]+)/g;
        // filterRE = /\bIPv6[^:\r\n]+:\s*([^\s]+)/g; // IPv6
        break;
    case 'darwin':
        command = 'ifconfig';
        filterRE = /\binet\s+([^\s]+)/g;
        // filterRE = /\binet6\s+([^\s]+)/g; // IPv6
        break;
    default:
        command = 'ifconfig';
        filterRE = /\binet\b[^:]+:\s*([^\s]+)/g;
        // filterRE = /\binet6[^:]+:\s*([^\s]+)/g; // IPv6
        break;
    }

    return function (callback, bypassCache) {
        if (cached && !bypassCache) {
            callback(null, cached);
            return;
        }
        // system call
        exec(command, function (error, stdout, sterr) {
            cached = [];
            var ip;
            var matches = stdout.match(filterRE) || [];
            //if (!error) {
            for (var i = 0; i < matches.length; i++) {
                ip = matches[i].replace(filterRE, '$1')
                if (!ignoreRE.test(ip)) {
                    cached.push(ip);
                }
            }
            //}
            callback(error, cached);
        });
    };
})();

const log = console.log;
const tab = '\t';
const arr = '>';

log('Starting docker end-to-end test suite, please wait...');

log(tab, arr, 'Getting your ip...');

getNetworkIPs((error, ipList) => {
  const ip = ipList[0];
  log(tab, arr, 'Found ip to be:', ip);
  log(tab, arr, 'Spawning docker containers...');

  const docker = spawn('docker-compose', ['-f', 'config/docker-compose.yml', 'up'], {
    cwd: path.resolve(__dirname, '../'),
    env: {
      HOMEIP: ip
    },
    shell: true,
  });

  docker.stdout.on('data', data => process.stdout.write(data.toString()));
  // docker.stderr.on('data', data => console.log(data.toString()));
  docker.on('error', error => console.log(error));

  const exitProc = (code) => {
    log('');
    log(tab, arr, 'Please wait, Shutting down docker containers...');
    let stopExit = true;
    docker.kill('SIGINT');
    const stopDocker = spawn('docker-compose', ['-f', 'config/docker-compose.yml', 'stop'], {
      cwd: path.resolve(__dirname, '../'),
      shell: true,
    });
    stopDocker.on('close', () => {
      stopExit = false;
      clearInterval(loader);
      log('\r\n');
      log(tab, arr, 'Docker containers shut down.');
      log(tab, arr, 'Hit enter to continue...');
      process.exit();
    });

    const boat = `
               . •  °  O
                         0
                        _[]__
                        || ||_____
                        || ||   [|
             --------------------------
              \\   O   O   O   O      /`;

    const loading = ['.', '·', '•', '°', '•', '·', '.'];
    const loadingIconsCount = process.stdout.columns;
    let loadingPoint = 0;
    process.stdout.write(boat);
    const loader = setInterval(() => {
      process.stdout.clearLine();  // clear current text
      process.stdout.cursorTo(0);  // move cursor to beginning of line
      let output = '';
      for(let i=0; i<loadingIconsCount; i++){
        output += loading[(loadingPoint+i)%loading.length];
      }
      process.stdout.write(output);
      loadingPoint++;
      if(loadingPoint > loading.length - 1) loadingPoint = 0;
    }, 40);
  };

  process.on('SIGINT', exitProc);
  process.on('SIGTERM', exitProc);
});
