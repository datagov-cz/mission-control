import { RouteTransition } from '@types'
import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'
import loggerPlugin from 'router5-plugin-logger'
import { from, ObservableInput } from 'rxjs'
import { tap } from 'rxjs/operators'

import { RoutesConfiguration } from './routes'

const router = createRouter(RoutesConfiguration, {
  allowNotFound: true,
})
router.usePlugin(browserPlugin())
router.usePlugin(loggerPlugin)

from((router as unknown) as ObservableInput<RouteTransition>)
  .pipe(
    tap((routeTransition) => {
      const currentRouteName = routeTransition.route.name
      const currentConfiguration = RoutesConfiguration.find(
        (conf) => conf.name === currentRouteName
      )!
      if (currentConfiguration.onEnter) {
        currentConfiguration.onEnter(routeTransition)
      }
    })
  )
  .subscribe()

export default router

export const startRouter = () =>
  new Promise((resolve) => {
    router.start(resolve)
  })
