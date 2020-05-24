import { format } from 'date-fns'
import { cs } from 'date-fns/locale'

const formatDate = (date: Date) => format(date, 'PPP', { locale: cs })

export default formatDate
