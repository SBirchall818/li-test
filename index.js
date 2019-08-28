import start from './src/start';

// Assume first argument is chunkSize
const chunkSize = process.argv[2];
// Assume all following arguments are relative files in the data directory
const relativeFileArray = process.argv.slice(3);

start(relativeFileArray, chunkSize);