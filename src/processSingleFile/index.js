import * as _logger from '../logger';
import _insertOrUpdateEpcs from './insertOrUpdateEpcs';
import * as _fs from 'fs';
import * as _csv from 'fast-csv';

const DATA_DIRECTORY = __dirname + '/../../data/';

export default function processSingleFile(relativeFilePath, index, chunkSize = 24, logger = _logger, fs = _fs, csv = _csv, insertOrUpdateEpcs = _insertOrUpdateEpcs) {
  return new Promise((resolve, reject) => {
    var chunkedEpcArray = [];
    let chunkNumber = 0;
    if (chunkSize > 1000) chunkSize = 1000; // TODO put this in a separate function

    logger.log(`${index}: ${relativeFilePath}`);
    const absolutePath = DATA_DIRECTORY + relativeFilePath;

    const readable = fs.createReadStream(absolutePath)
      .pipe(csv.parse({headers: true}))
      .on('error', handleError)
      .on('data', handleData)
      .on('end', handleEnd);

    function handleError(error) {
      logger.log(`Stream read error: ${error}`);
    }
    
    async function handleData(row) {
      try {
        var readEpc = {
          lmk_key: row.LMK_KEY,
          lodgement_date: row.LODGEMENT_DATE,
          transaction_type: row.TRANSACTION_TYPE,
          total_floor_area: row.TOTAL_FLOOR_AREA,
          address: row.ADDRESS,
          postcode: row.POSTCODE
        };
      } catch (err) {
        logger.log(`CSV read error: ${err}`);
      }

      chunkedEpcArray.push(readEpc);
      if (chunkedEpcArray.length >= chunkSize) {
        readable.pause();
        await insertOrUpdateEpcs(chunkedEpcArray, chunkNumber);
        chunkedEpcArray = [];
        chunkNumber++;
        readable.resume();
      }
    }
    
    async function handleEnd() {
      logger.log('end of file stream');
      if (chunkedEpcArray.length > 0) {
        await insertOrUpdateEpcs(chunkedEpcArray, chunkNumber);
      }
      resolve();
    }
  });
}
