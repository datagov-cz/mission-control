import React from 'react'
import { Tab, TabProps } from '@material-ui/core'

import { BaseLink, useRouter } from 'react-router5'
import { BaseLinkProps } from 'react-router5/dist/BaseLink'
import { useSelector } from 'react-redux'
import { getIsAdmin } from 'id/selectors'
import { RouteName } from 'app/types'
import { isRouteAccessible } from 'app/utils/route'

type IRouteTabProps = TabProps & BaseLinkProps & { component: typeof BaseLink }

type LinkTab = React.ComponentType<IRouteTabProps>
const LinkTab: LinkTab = Tab as LinkTab

type RouteTabProps = Omit<IRouteTabProps, 'component' | 'router' | 'routeName'>

const RouteTab: React.FC<RouteTabProps> = ({ classes, ...props }) => {
  const router = useRouter()
  const isAdmin = useSelector(getIsAdmin)
  if (!isRouteAccessible(props.value as RouteName, isAdmin)) {
    return null
  }
  return (
    <LinkTab
      component={BaseLink}
      routeName={props.value}
      router={router}
      {...props}
    />
  )
}

export default RouteTab
