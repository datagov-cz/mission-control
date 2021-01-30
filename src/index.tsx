import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Auth from 'components/Auth'

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
