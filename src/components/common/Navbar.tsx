
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Train, Menu, Moon, Sun, User, MapPin, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Book", path: "/booking" },
  { name: "Trains", path: "/trains" },
  { name: "Track", path: "/track" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderNavLinks = (callback?: () => void) => (
    <ul className="flex flex-col md:flex-row gap-1 md:gap-2">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className={`px-4 py-2 rounded-lg block transition-all duration-200 ${
              location.pathname === link.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
            onClick={callback}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
        <img
        src="https://i.pinimg.com/736x/73/d4/28/73d428d4849adf3d6347bcedb20f3357.jpg"
        alt="IRCTC Logo"
        className="h-6 w-6"
        />

          <span className="hidden sm:inline">IRCTC</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px] sm:w-[300px]">
                <div className="mt-8 space-y-8">
                  {renderNavLinks(() => document.querySelector<HTMLButtonElement>(".close-button")?.click())}
                  <div className="space-y-2">
                    <Link to="/auth">
                      <Button
                        className="w-full"
                        onClick={() => document.querySelector<HTMLButtonElement>(".close-button")?.click()}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
                <SheetClose className="hidden close-button" />
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <nav>{renderNavLinks()}</nav>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Link to="/auth">
                <Button variant="outline" className="rounded-lg">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
