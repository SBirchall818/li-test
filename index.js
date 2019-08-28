import start from './src/start';

// Assume only arguments it takes are relative files in the data directory
const relativeFileArray = process.argv.slice(2);

start(relativeFileArray);