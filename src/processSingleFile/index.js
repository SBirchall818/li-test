import * as _logger from '../logger';

export default function processSingleFile(relativeFilePath, index, logger = _logger) {
  logger.log(`${index}: ${relativeFilePath}`);
}