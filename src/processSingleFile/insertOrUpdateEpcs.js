import _models from '../models';
import _fetchLatLong from './fetchLatLong';

export default async function insertOrUpdateEpcs(chunkedEpcArray, models = _models, fetchLatLong = _fetchLatLong) {
  console.log('insertOrUpdateEpcs: ', chunkedEpcArray[0]);
  const epcObj = await fetchLatLong(chunkedEpcArray[0]);
  await models.Epc.create(epcObj);
}