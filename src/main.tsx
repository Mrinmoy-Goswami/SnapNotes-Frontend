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




const queryClient = new QueryClient() 

const cognitoAuthConfig = {
  authority:import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: "http://localhost:5173",
  // post_logout_redirect_uri: "http://localhost:5173", 
  response_type: "code",
  scope: "email openid s3-api/Upload",
};

console.log("ENV",import.meta.env.VITE_CLIENT_ID)



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider  {...cognitoAuthConfig}>
    <QueryClientProvider client={queryClient} >

   <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
    <RouterProvider router={router}/>

    {/* <BrowserRouter> */}
    {/* </BrowserRouter> */}
   </ThemeProvider>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
