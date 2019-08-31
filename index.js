const fs = require('fs');
const readline = require('readline');
const http = require('http');
const url = require('url');

console.log('Welcome to the Domain Checker');
const FILE_NAME = process.argv[2];

// check if domain is reachable
const isUrlReachable = (url) => {
  const { hostname } = new URL(url);

  const options = {
    hostname
  };

  const req = http.get(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.end();
};

// read file line by line
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
