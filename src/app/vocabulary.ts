const NS_POPIS_DAT =
  'http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/'
const NS_PRACOVNI_PROSTOR =
  'https://slovník.gov.cz/datový/pracovní-prostor/pojem/'

const ns = (prefix: string) => (suffix: string) => `${prefix}${suffix}`

const nspd = ns(NS_POPIS_DAT)
const nspp = ns(NS_PRACOVNI_PROSTOR)

export const USER = nspp('uživatel')
export const USER_ADMIN = nspp('administrátor')
export const USER_DEACTIVATED = nspp('zablokovaný-uživatel')

export const VOCABULARY_CONTEXT_READ_ONLY = nspp(
  'slovníkový-kontext-pouze-pro-čtení'
)
