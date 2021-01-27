import { Iri, Id } from '@types'

const getIdFromIri = (iri: Iri) => iri.substr(iri.lastIndexOf('/') + 1) as Id

export default getIdFromIri
