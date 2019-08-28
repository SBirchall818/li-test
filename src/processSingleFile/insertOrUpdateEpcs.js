import _models from '../models';
import _fetchLatLong from './fetchLatLong';
import * as _logger from '../logger';
const _co = require('co');

export default async function insertOrUpdateEpcs(chunkedEpcArray, chunkNumber, models = _models, fetchLatLong = _fetchLatLong, co = _co, logger = _logger) {
  return co(function* () {
    logger.log(`insertOrUpdateEpcs chunkNumber: ${chunkNumber}`);

    const arrayOfPromises = chunkedEpcArray.map( epc => {
      return fetchLatLong(epc);
    });
    const arrayOfObjects = yield arrayOfPromises;

    const arrayOfDbCheckPromises = arrayOfObjects.map( obj => {
      return dbCheckTask(obj);
    });

    const arrayOfFoundEpcs = yield arrayOfDbCheckPromises;

    var arrayOfCreateOrUpdateTasks = createArrayOfCreateOrUpdateTasks(arrayOfObjects, arrayOfFoundEpcs);

    yield arrayOfCreateOrUpdateTasks;
  });

  function dbCheckTask(obj) {
    return models.Epc.findOne({ where: {lmk_key: obj.lmk_key}});
  }

  function createArrayOfCreateOrUpdateTasks(arrayOfObjects, arrayOfFoundEpcs) {
    var arrayOfCreateOrUpdateTasks = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfFoundEpcs[i]) {
        // If exists update
        arrayOfCreateOrUpdateTasks.push(models.Epc.update(arrayOfObjects[i], {where: { id: arrayOfFoundEpcs[i].id }}));
      } else {
        // If does not exist create
        arrayOfCreateOrUpdateTasks.push(models.Epc.create(arrayOfObjects[i]));
      }
    }
    return arrayOfCreateOrUpdateTasks;
  }
}
