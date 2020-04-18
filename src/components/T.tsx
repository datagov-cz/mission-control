import React from 'react'
import { FormattedMessage } from 'react-intl'

type TProps = {
  children: string
}

const T: React.FC<TProps> = ({ children }) => <FormattedMessage id={children} />

export default T
