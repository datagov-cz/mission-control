import React from 'react'
import { FormattedMessage } from 'react-intl'

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
    return (
      <FormattedMessage
        id={String.raw((a as unknown) as TemplateStringsArray, ...b)}
      />
    )
  } else {
    return <FormattedMessage id={a} values={b[0]} />
  }
}

export default t
