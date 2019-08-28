import _processSingleFile from '../processSingleFile';

export default async function start(relativeFileArray, processSingleFile = _processSingleFile) {
  for (let i = 0; i < relativeFileArray.length; i++) {
    await processSingleFile(relativeFileArray[i], i);
  }
}