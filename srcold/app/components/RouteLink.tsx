import React from 'react'
import { Link, LinkProps } from '@material-ui/core'

import { BaseLink, useRouter } from 'react-router5'
import { BaseLinkProps } from 'react-router5/dist/BaseLink'

type EnhancedLinkProps = LinkProps &
  BaseLinkProps & { component: typeof BaseLink }

type LinkComponent = React.ComponentType<EnhancedLinkProps>
const EnhancedLink: LinkComponent = Link as LinkComponent

type RouteLinkProps = Omit<EnhancedLinkProps, 'component' | 'router' | 'href'>

const RouteLink: React.FC<RouteLinkProps> = ({ classes, ...props }) => {
  const router = useRouter()
  return <EnhancedLink component={BaseLink} router={router} {...props} />
}

export default RouteLink
