const NS_POPIS_DAT =
  'http://onto.fel.cvut.cz/ontologies/slovnik/agendovy/popis-dat/pojem/'
const NS_PRACOVNI_PROSTOR =
  'https://slovník.gov.cz/datový/pracovní-prostor/pojem/'

const ns = (prefix: string) => (suffix: string) => `${prefix}${suffix}`

const nspd = ns(NS_POPIS_DAT)
const nspp = ns(NS_PRACOVNI_PROSTOR)

export const USER = nspd('uživatel')
export const USER_ADMIN = nspd('administrátor')
export const USER_DEACTIVATED = nspd('zablokovaný-uživatel')

export const VOCABULARY_CONTEXT_READ_ONLY = nspp(
  'slovníkový-kontext-pouze-pro-čtení'
)
