import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from 'react-oidc-context'
import { WebStorageStateStore } from 'oidc-client-ts'

function onSigninCallback():void {
  window.history.replaceState({}, document.title, window.location.pathname);
}

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  response_type: "code",
  scope: "email openid phone",
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  onSigninCallback,
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider { ...cognitoAuthConfig }>
      <App />
    </AuthProvider>
  </StrictMode>,
)
