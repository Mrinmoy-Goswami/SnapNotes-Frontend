import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationOptions } from "@/constants/navOptions";
import React from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";




export function NavBar() {

  const auth = useAuth()
  const signOutRedirect = () => {
    auth.removeUser()
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const logoutUri = "http://localhost:5173";
      const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };
  return (
    <NavigationMenu className="shadow-md w-screen p-2 z-1" viewport={false}>
      <NavigationMenuList>
        {navigationOptions.map((navOption) => (
          <NavigationMenuItem className="font-semibold mx-5" key={navOption.label}>
            {navOption.link ? (
              <NavigationMenuLink asChild>
                <Link
                  to={navOption.link}    
                >
                  {navOption.label}
                </Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger className="mx-5">
                  {navOption.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3">
                    {navOption.items.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.link}
                            className="block px-2  rounded hover:bg-muted"
                          >
                            <div className="font-medium">{item.name}</div>
                            <div className="text-muted-foreground text-sm">
                              {/* Optional description here */}
                            </div>
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
                        <Button className="mx-2" onClick={signOutRedirect}>
                          Logout
                        </Button>
      </NavigationMenuList>
        <ModeToggle/>
    </NavigationMenu>
  );
}

export default React.memo(NavBar);
