import { Uri, Id } from 'app/types'

const getIdFromUri = (uri: Uri) => uri.substr(uri.lastIndexOf('/') + 1) as Id

export default getIdFromUri
