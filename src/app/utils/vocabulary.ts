const _NS_POPIS_DAT =
  'http://onto.fel.cvut.cz/ontologies/slovnik/agendovy/popis-dat/pojem/'
const _NS_RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const _NS_RDFS = 'http://www.w3.org/2000/01/rdf-schema#'
const _NS_SKOS = 'http://www.w3.org/2004/02/skos/core#'

export const PREFIX = _NS_POPIS_DAT
export const VOCABULARY = _NS_POPIS_DAT + 'slovník'
export const DOCUMENT_VOCABULARY = _NS_POPIS_DAT + 'dokumentový-slovník'
export const TERM = _NS_POPIS_DAT + 'term'
export const FILE = _NS_POPIS_DAT + 'soubor'
export const DOCUMENT = _NS_POPIS_DAT + 'dokument'
export const DEFINITION = _NS_SKOS + 'definition'
export const BROADER = _NS_SKOS + 'broader'
export const NARROWER = _NS_SKOS + 'narrower'
export const SKOS_PREF_LABEL = _NS_SKOS + 'prefLabel'
export const DATASET =
  'http://onto.fel.cvut.cz/ontologies/dataset-descriptor/dataset'
export const IS_TERM_FROM_VOCABULARY = _NS_POPIS_DAT + 'je-pojmem-ze-slovníku'
export const RESOURCE = _NS_POPIS_DAT + 'zdroj'
export const HAS_FILE = _NS_POPIS_DAT + 'má-soubor'
export const HAS_AUTHOR = _NS_POPIS_DAT + 'má-autora'
export const CREATED = _NS_POPIS_DAT + 'má-datum-a-čas-vytvoření'
export const HAS_LAST_EDITOR = _NS_POPIS_DAT + 'má-posledního-editora'
export const LAST_MODIFIED =
  _NS_POPIS_DAT + 'má-datum-a-čas-poslední-modifikace'
export const IMPORTS_VOCABULARY = _NS_POPIS_DAT + 'importuje-slovník'
export const USER = _NS_POPIS_DAT + 'uživatel'
export const USER_ADMIN = _NS_POPIS_DAT + 'administrátor'
export const USER_LOCKED = _NS_POPIS_DAT + 'uzam\u010den\u00fd-u\u017eivatel'
export const USER_DISABLED = _NS_POPIS_DAT + 'zablokovan\u00fd-u\u017eivatel'
export const HAS_COUNT = _NS_POPIS_DAT + 'has-count'
export const PREFIX_RDFS = _NS_RDFS
export const RDF_TYPE = _NS_RDF + 'type'
export const RDFS_LABEL = _NS_RDFS + 'label'
export const RDFS_COMMENT = _NS_RDFS + 'comment'
export const RDFS_RESOURCE = _NS_RDFS + 'Resource'
export const RDFS_SUB_CLASS_OF = _NS_RDFS + 'subClassOf'
export const RDFS_SUB_PROPERTY_OF = _NS_RDFS + 'subPropertyOf'
export const RDF_PROPERTY = _NS_RDF + 'Property'
export const DC_DESCRIPTION = 'http://purl.org/dc/terms/description'

export const PERSIST_EVENT = `${_NS_POPIS_DAT}vytvo\u0159en\u00ed-entity`
export const UPDATE_EVENT = `${_NS_POPIS_DAT}\u00faprava-entity`
