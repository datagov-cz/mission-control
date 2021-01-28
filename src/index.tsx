import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Auth from 'components/Auth'

// import { initKeycloak } from 'app/keycloak'
// import { startRouter } from 'app/router'

// import { userManagerPromise } from 'app/oidc'

// userManagerPromise.then(console.log).catch(console.error)

// const App = React.lazy(() => import('components/App'))

/*const main = async () => {
  try {
    const result = await initKeycloak()
    console.log('KEYCLOAK AWAITED')
    // await startRouter()

    const rootElement = document.getElementById('app') as HTMLElement
    // TODO: replace with stable method once proper typings are available
    ReactDOM.unstable_createRoot(rootElement).render(
      <React.StrictMode>
        <Suspense fallback={'Main fallback'}>
          This is the way
        </Suspense>
      </React.StrictMode>
    )
  } catch (e) {
    console.error(e)
  }
}

main()*/

const App = React.lazy(() => import('components/App'))

const AuthErrorFallback = () => (
  <>Unable to authenticate user, identity service may be down</>
)

const rootElement = document.getElementById('app') as HTMLElement
// TODO: replace with stable method once proper typings are available
ReactDOM.unstable_createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      <Auth>
        <Suspense fallback={''}>
          <App />
        </Suspense>
      </Auth>
    </ErrorBoundary>
  </React.StrictMode>
)
