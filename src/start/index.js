import processSingleFile from '../processSingleFile';

export default function start(relativeFileArray) {
  relativeFileArray.forEach((val, index) => {
    processSingleFile(val, index);
  })
}