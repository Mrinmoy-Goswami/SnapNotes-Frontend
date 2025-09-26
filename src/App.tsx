// src/App.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "./pages/components/Navbar";
import React from "react";
import { RequireAuth } from "./pages/components/AuthWrapper";
// import axios from "axios";
// import { useAuth } from "react-oidc-context";
// import { useAuth } from "react-oidc-context";

const App = () => {

  // const auth = useAuth()

//   useEffect(()=>{
//     const interceptor =  axios.interceptors.request.use((config)=> {
//     const token = auth.user?.access_token
//     if(token){
//        config.headers.set("Authorization", `Bearer ${token}`);
//     }
//       return config;
//   })
//   return ()=>{
//     axios.interceptors.request.eject(interceptor)
//   };
// },[auth.user?.access_token])
 



     return (
      <RequireAuth>
    <div className="min-h-screen ">
      <NavBar />
      <main className="flex-1 p-1">
        <Outlet />
      </main>
    </div>
      </RequireAuth>
  );

  }


  


export default React.memo(App);
