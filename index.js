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

const isUrlReachable = (url) => {
  const request = https.get(url, (response) => {
    const { statusCode } = response;

    if (successCodes.includes(statusCode)) {
      console.log(`${success(`${url}: ${statusCode}`)}`);
    } else if (warningCodes.includes(statusCode)) {
      console.log(`${warning(`${url}: ${statusCode}`)}`);
    } else if (errorCodes.includes(statusCode)) {
      console.log(`${error(`${url}: ${statusCode}`)}`);
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
    isUrlReachable(line);
  }
};

processLineByLine();
