// src/components/RequireAuth.tsx
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useAuth } from "react-oidc-context";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const signOutRedirect = () => {
    auth.removeUser()
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const logoutUri = "http://localhost:5173";
      const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };
  
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        Checking authentication...
      </div>
    );
  }

  if (auth.error) {
    return <Container className=" flex flex-col align-center  items-center">
      <p>⚠️ Auth Error: {auth.error.message}</p>
     <Button className="w-40 align-center" onClick={signOutRedirect}>Go to Signin Page</Button>
    </Container>;
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6 text-white">
        <p className="text-lg">You must sign in to access SnapNotes AI</p>
        <button
        type="button"
        className="w-40 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        onClick={() => auth.signinRedirect()}
          // className="px-6 py-3 bg-purple-600 text-black font-semibold rounded-xl hover:bg-purple-400 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
