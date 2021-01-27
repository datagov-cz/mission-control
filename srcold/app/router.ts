import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'
import loggerPlugin from 'router5-plugin-logger'

import { RoutesConfiguration } from './routes'

const router = createRouter(RoutesConfiguration, {
  allowNotFound: true,
})
router.usePlugin(browserPlugin())
router.usePlugin(loggerPlugin)

export default router

export const startRouter = () =>
  new Promise((resolve) => {
    router.start(resolve)
  })
