const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const isUrlValid = require('./helpers/isUrlValid');
const isUrlReachable = require('./helpers/isUrlReachable');

console.log('Welcome to the Domain Checker');
const FILE_NAME = process.argv[2] || 'urls.txt';

const error = chalk.bgRed.black;

const main = async () => {
  const fileStream = fs.createReadStream(FILE_NAME);

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of lines) {
    if (isUrlValid(line)) {
      isUrlReachable(line);
    } else {
      console.log(error(`"${line}" is not valid, please enter a correct URL!`));
    }
  }
};

main();
