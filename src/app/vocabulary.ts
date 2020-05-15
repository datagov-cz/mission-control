const NS_POPIS_DAT =
  'http://onto.fel.cvut.cz/ontologies/slovnik/agendovy/popis-dat/pojem/'

const ns = (suffix: string) => `${NS_POPIS_DAT}${suffix}`

export const USER = ns('uživatel')
export const USER_ADMIN = ns('administrátor')
export const USER_DEACTIVATED = ns('zablokovaný-uživatel')
