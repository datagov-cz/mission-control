import React from 'react'
import ReactDOM from 'react-dom'

import router from 'app/router'

import App from 'components/App'

router.start(() => {
  const rootElement = document.getElementById('app') as HTMLElement
  // TODO: replace with stable method once proper typings are available
  ReactDOM.unstable_createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
