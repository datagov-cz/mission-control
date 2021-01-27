import { zipObject } from 'lodash'

import { Iri } from '@types'
import getIdFromIri from './getIdFromIri'

/**
 * Converts an array of items to a object indexed by item id
 * The ids are decoded from the items' URIs
 */
const normalize = <ItemWithUri extends { uri: Iri }>(
  dataArray: ItemWithUri[]
) => {
  const keys = dataArray.map((item) => getIdFromIri(item.uri))
  return zipObject(keys, dataArray)
}

export default normalize
