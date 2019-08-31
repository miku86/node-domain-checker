const fs = require('fs');
const readline = require('readline');

console.log('Welcome to the Domain Checker');
const FILE_NAME = process.argv[2];

// read file line by line
const processLineByLine = async () => {
  const fileStream = fs.createReadStream(FILE_NAME);

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of lines) {
    console.log(`${line}`);
  }
};

processLineByLine();
