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
import { Link } from "react-router-dom";


export function NavBar() {
  return (
    <NavigationMenu className="shadow-md w-screen p-2" viewport={false}>
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
      </NavigationMenuList>
        <ModeToggle/>
    </NavigationMenu>
  );
}

export default React.memo(NavBar);
