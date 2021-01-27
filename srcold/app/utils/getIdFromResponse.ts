import { AjaxResponse } from 'rxjs/ajax'
import getIdFromUri from './getIdFromUri'

const getIdFromResponse = (response: AjaxResponse) =>
  getIdFromUri(response.xhr.getResponseHeader('Location') || '')

export default getIdFromResponse
