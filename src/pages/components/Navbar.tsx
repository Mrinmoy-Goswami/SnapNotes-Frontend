import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationOptions } from "@/constants/navOptions";
import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen, LogOut } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";

export function NavBar() {
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const signOutRedirect = () => {
    auth.removeUser();
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_LOGOUT_URL;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Snapnotes
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu className="shadow-none w-auto z-2" viewport={false}>
            <NavigationMenuList className="flex gap-6">
              {navigationOptions.map((navOption) => (
                <NavigationMenuItem
                  className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  key={navOption.label}
                >
                  {navOption.link ? (
                    <NavigationMenuLink asChild>
                      <Link to={navOption.link} className="px-3 py-2">
                        {navOption.label}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-muted data-[state=open]:bg-muted">
                        {navOption.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-3 p-4 bg-card border border-border rounded-lg shadow-lg">
                          {navOption.items.map((item) => (
                            <li key={item.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.link}
                                  className="block rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
                                >
                                  <div className="font-medium">{item.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Button 
            onClick={signOutRedirect}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <button
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-t border-border px-4 py-4 space-y-4 animate-fade-in">
          {navigationOptions.map((navOption) => (
            <div key={navOption.label}>
              {navOption.link ? (
                <Link
                  to={navOption.link}
                  className="block py-2 font-semibold text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {navOption.label}
                </Link>
              ) : (
                <div className="space-y-2">
                  <div className="font-semibold text-foreground">{navOption.label}</div>
                  <ul className="pl-4 space-y-2">
                    {navOption.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.link}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Logout button (mobile) */}
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
            onClick={signOutRedirect}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}

export default React.memo(NavBar);