import React from 'react'
import { Tab, TabProps } from '@material-ui/core'

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

type IRouteTabProps = TabProps &
  RouterLinkProps & { component: typeof RouterLink }

type LinkTab = React.ComponentType<IRouteTabProps>
const LinkTab: LinkTab = Tab as LinkTab

type RouteTabProps = Omit<IRouteTabProps, 'component' | 'to'>

const RouteTabRaw: React.FC<RouteTabProps> = ({ classes, ...props }) => (
  <LinkTab component={RouterLink} to={props.value} {...props} />
)

export default React.memo(RouteTabRaw)
