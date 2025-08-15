import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import { ThemeProvider } from './context/ThemeProvider.tsx';
// import { AuthProvider } from 'react-oidc-context';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AuthProvider  {...cognitoAuthConfig}> */}
   <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >

    {/* <BrowserRouter> */}
    <RouterProvider router={router}/>
    {/* </BrowserRouter> */}
   </ThemeProvider>
    {/* </AuthProvider> */}
  </StrictMode>,
)
