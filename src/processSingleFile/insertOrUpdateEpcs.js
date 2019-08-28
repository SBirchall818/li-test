import models from '../models';

export default async function insertOrUpdateEpcs(chunkedEpcArray) {
  console.log('insertOrUpdateEpcs: ', chunkedEpcArray[0]);
  await models.Epc.create(chunkedEpcArray[0]);
}