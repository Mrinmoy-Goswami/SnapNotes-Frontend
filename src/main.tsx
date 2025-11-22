import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { AuthProvider } from 'react-oidc-context';
import { LoaderProvider } from './context/LoaderContext.tsx';
import { WebStorageStateStore } from 'oidc-client-ts';




const queryClient = new QueryClient() 

const cognitoAuthConfig = {
  authority:import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: "http://localhost:5173",
  // post_logout_redirect_uri: "http://localhost:5173", 
  response_type: "code",
  scope: "email openid profile s3-api/Upload",
  loadUserInfo:true,
   userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,  // ✅ Auto-refresh tokens before expiry
  monitorSession: true,  // ✅ Monitor Cognito session
   onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

// console.log("ENV",import.meta.env.VITE_CLIENT_ID)



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider  {...cognitoAuthConfig} >
    <QueryClientProvider client={queryClient} >
    <LoaderProvider>

   <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
    <RouterProvider router={router}/>

    {/* <BrowserRouter> */}
    {/* </BrowserRouter> */}
   </ThemeProvider>
    </LoaderProvider>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
