// src/App.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "./pages/components/Navbar";
import React from "react";
import { RequireAuth } from "./pages/components/AuthWrapper";
// import { useAuth } from "react-oidc-context";

const App = () => {

  // const user = useAuth()


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
