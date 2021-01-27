import { zipObject } from 'lodash'
import { Uri } from 'app/types'
import getIdFromUri from './getIdFromUri'

/**
 * Converts an array of items to a object indexed by item id
 * The ids are decoded from the items' URIs
 */
const normalize = <ItemWithUri extends { uri: Uri }>(
  dataArray: ItemWithUri[]
) => {
  const keys = dataArray.map((item) => getIdFromUri(item.uri))
  return zipObject(keys, dataArray)
}

export default normalize
