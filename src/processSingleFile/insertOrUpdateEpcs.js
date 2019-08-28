import _models from '../models';
import _fetchLatLong from './fetchLatLong';
const _co = require('co');

export default async function insertOrUpdateEpcs(chunkedEpcArray, models = _models, fetchLatLong = _fetchLatLong, co = _co) {
  return co(function* () {
    console.log('insertOrUpdateEpcs via chunkedEpcArray ...');

    const arrayOfPromises = chunkedEpcArray.map( epc => {
      return fetchLatLong(epc);
    });
    const arrayOfObjects = yield arrayOfPromises;

    const arrayOfDbCreateTasks = arrayOfObjects.map( epc => {
      return createTask(epc);
    });
  });
  function createTask(epc) {
    models.Epc.create(epc);
  }
}
