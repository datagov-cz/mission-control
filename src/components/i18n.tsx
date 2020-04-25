import React from 'react'
import { FormattedMessage } from 'react-intl'

const NAMESPACE_SEPARATOR = '.'

export const Namespace = React.createContext('')

const getNamespacedMessage = (
  id: string,
  values?: Object
): React.ReactElement => (
  <Namespace.Consumer>
    {(value) => {
      const key =
        id.indexOf(NAMESPACE_SEPARATOR) !== -1
          ? id
          : `${value}${NAMESPACE_SEPARATOR}${id}`
      return <FormattedMessage id={key} values={values} />
    }}
  </Namespace.Consumer>
)

/**
 * Shortcut to efficient react-intl FormattedMessage component use.
 * It is to be used anywhere within components, and it supports both
 * calling as a function or using it as a template literal.
 *
 * Examples:
 * t`message.id`    <- use as a template literal
 * t('message.id')  <- equivalent to the above
 * t('message.id.with.variable', { variable: 'value' })
 */
function t(id: string, values?: object): React.ReactElement
function t(
  template: TemplateStringsArray,
  ...expressions: (string | number | boolean)[]
): React.ReactElement
function t(a: any, ...b: any[]): React.ReactElement {
  if (typeof a === 'string') {
    return getNamespacedMessage(a, b[0])
  } else {
    return getNamespacedMessage(
      String.raw((a as unknown) as TemplateStringsArray, ...b)
    )
  }
}

export default t
