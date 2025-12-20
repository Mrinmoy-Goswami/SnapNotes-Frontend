import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import { ThemeProvider } from 'next-themes'; // ✅ Use next-themes
import { AuthProvider } from 'react-oidc-context';
import { LoaderProvider } from './context/LoaderContext.tsx';
import { WebStorageStateStore } from 'oidc-client-ts';

const queryClient = new QueryClient() 

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  response_type: "code",
  scope: "email openid profile s3-api/Upload",
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  monitorSession: true,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          {/* ✅ Updated ThemeProvider from next-themes */}
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem
            storageKey="snapnotes-theme"
            disableTransitionOnChange={false}
          >
            <RouterProvider router={router} />
          </ThemeProvider>
        </LoaderProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)