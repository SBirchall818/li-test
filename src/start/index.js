import _processSingleFile from '../processSingleFile';

export default function start(relativeFileArray, processSingleFile = _processSingleFile) {
  relativeFileArray.forEach((val, index) => {
    processSingleFile(val, index);
  });
}