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
// import { AuthProvider } from 'react-oidc-context';


const queryClient = new QueryClient() 



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AuthProvider  {...cognitoAuthConfig}> */}
    <QueryClientProvider client={queryClient} >

   <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >

    {/* <BrowserRouter> */}
    <RouterProvider router={router}/>
    {/* </BrowserRouter> */}
   </ThemeProvider>
    </QueryClientProvider>
    {/* </AuthProvider> */}
  </StrictMode>,
)
