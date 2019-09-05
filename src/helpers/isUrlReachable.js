const { https } = require('follow-redirects');
const chalk = require('chalk');

const successCodes = [200];
const warningCodes = [301, 302];
const errorCodes = [403, 404];
const success = chalk.bgGreen.black;
const warning = chalk.bgYellow.black;

const isUrlReachable = (url) => {
  const request = https.get(url, (response) => {
    const { statusCode } = response;

    if (successCodes.includes(statusCode)) {
      console.log(`${success(`${url} - is available`)}`);
    } else if (warningCodes.includes(statusCode)) {
      console.log(`${warning(`${url} - gets redirected`)}`);
    } else if (errorCodes.includes(statusCode)) {
      console.log(`${error(`${url} - is NOT available`)}`);
    } else {
      console.log(`${url}: ${statusCode}`);
    }
  });
  request.on('error', (error) => {
    console.error(`problem with request: ${error.message}`);
  });
  request.end();
};

module.exports = isUrlReachable;
