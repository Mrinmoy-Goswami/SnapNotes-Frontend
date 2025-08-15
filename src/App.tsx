// src/App.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "./pages/components/Navbar";

const App = () => {

    return (
    <div className="min-h-screen ">
      <NavBar />
      <main className="flex-1 p-1">
        <Outlet />
      </main>
    </div>
  );
  }


  


export default App;
