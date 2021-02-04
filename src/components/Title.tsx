import React from 'react'
import { useIntl } from 'react-intl'
import { Helmet } from 'react-helmet-async'

const TITLE_SEPARATOR = ' | '

type TitleProps = {
  id?: string
  value?: string
}

const Title: React.FC<TitleProps> = ({ id, value }) => {
  const intl = useIntl()
  const titlePrefix = id ? intl.formatMessage({ id }) : value
  const title = `${titlePrefix ? titlePrefix : ''}${
    titlePrefix ? TITLE_SEPARATOR : ''
  }${intl.formatMessage({
    id: 'common.controlPanel',
  })}`
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default Title
