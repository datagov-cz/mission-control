import { Uri } from 'app/types'

const getIdFromUri = (uri: Uri) => uri.substr(uri.lastIndexOf('/') + 1)

export default getIdFromUri
