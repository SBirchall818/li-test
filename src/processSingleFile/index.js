import * as _logger from '../logger';
import _insertOrUpdateEpcs from './insertOrUpdateEpcs';
import * as _fs from 'fs';
import * as _csv from 'fast-csv';

const DATA_DIRECTORY = '/Users/sbirchall/Code/LandInsight/li-test/data/'

export default function processSingleFile(relativeFilePath, index, chunkSize = 24, logger = _logger, fs = _fs, csv = _csv, insertOrUpdateEpcs = _insertOrUpdateEpcs) {
  return new Promise((resolve, reject) => {
    var chunkedEpcArray = [];
    if (chunkSize > 1000) chunkSize = 1000; // TODO put this in a separate function
    chunkSize = 24; // TODO - remove after debugging

    logger.log(`${index}: ${relativeFilePath}`);
    const absolutePath = DATA_DIRECTORY + relativeFilePath;

    const readable = fs.createReadStream(absolutePath)
      .pipe(csv.parse({headers: true}))
      .on('error', handleError)
      .on('data', handleData)
      .on('end', handleEnd);

    function handleError(error) {
    
    }
    
    function handleData(row) {
      const readEpc = {
        lmk_key: row.LMK_KEY,
        lodgement_date: row.LODGEMENT_DATE,
        transaction_type: row.TRANSACTION_TYPE,
        total_floor_area: row.TOTAL_FLOOR_AREA,
        address: row.ADDRESS,
        postcode: row.POSTCODE
      };

      chunkedEpcArray.push(readEpc);
      if (chunkedEpcArray.length >= chunkSize) {
        insertOrUpdateEpcs(chunkedEpcArray)
        chunkedEpcArray = [];
      }
    }
    
    function handleEnd(rowCount) {
      resolve();
    }
  });
}
