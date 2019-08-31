const fs = require('fs');
const readline = require('readline');
const { https } = require('follow-redirects');
const chalk = require('chalk');

console.log('Welcome to the Domain Checker');
const FILE_NAME = process.argv[2];

const successCodes = [200];
const success = chalk.bgGreen.black;

const warningCodes = [301, 302];
const warning = chalk.bgYellow.black;

const errorCodes = [403, 404];
const error = chalk.bgRed.black;

const isValidUrl = (url) => {
  const regexToCheckIfUrlIsValid = new RegExp(
    '^' +
      '(?:(?:(?:https?|ftp):)?\\/\\/)' +
      '(?:\\S+(?::\\S*)?@)?' +
      '(?:' +
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
      '|' +
      '(?:' +
      '(?:' +
      '[a-z0-9\\u00a1-\\uffff]' +
      '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
      ')?' +
      '[a-z0-9\\u00a1-\\uffff]\\.' +
      ')+' +
      '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
      ')' +
      '(?::\\d{2,5})?' +
      '(?:[/?#]\\S*)?' +
      '$',
    'i'
  );
  return url.match(regexToCheckIfUrlIsValid);
};

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

const processLineByLine = async () => {
  const fileStream = fs.createReadStream(FILE_NAME);

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of lines) {
    if (isValidUrl(line)) {
      isUrlReachable(line);
    } else {
      console.log(error(`"${line}" is not valid, please enter a correct URL!`));
    }
  }
};

processLineByLine();
