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
import { Menu, X } from "lucide-react"; // hamburger icons
// import { ModeToggle } from "@/components/ui/ModeToggle";

export function NavBar() {
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const signOutRedirect = () => {
    auth.removeUser();
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const logoutUri = "http://localhost:5173";
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return (
    <nav className="w-full border-b border-gray-800 bg-black text-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-purple-500">
          Snapnotes
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu className="shadow-none w-auto z-2" viewport={false}>
            <NavigationMenuList className="flex gap-6">
              {navigationOptions.map((navOption) => (
                <NavigationMenuItem
                  className="font-semibold"
                  key={navOption.label}
                >
                  {navOption.link ? (
                    <NavigationMenuLink asChild>
                      <Link to={navOption.link}>{navOption.label}</Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>
                        {navOption.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-3 p-4">
                          {navOption.items.map((item) => (
                            <li key={item.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.link}
                                  className="block rounded px-2 py-1 hover:bg-muted"
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
            {/* <ModeToggle/> */}
          </NavigationMenu>
        </div>

        {/* Logout button (desktop) */}
        <div className="hidden md:block">
          <Button onClick={signOutRedirect}>Logout</Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-4">
          {navigationOptions.map((navOption) => (
            <div key={navOption.label}>
              {navOption.link ? (
                <Link
                  to={navOption.link}
                  className="block py-2 font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  {navOption.label}
                </Link>
              ) : (
                <div className="space-y-2">
                  <div className="font-semibold">{navOption.label}</div>
                  <ul className="pl-4 space-y-2">
                    {navOption.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.link}
                          className="block text-sm text-gray-300 hover:text-white"
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
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={signOutRedirect}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}

export default React.memo(NavBar);
