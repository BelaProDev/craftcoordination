import { Menu, WifiOff } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

const maintenanceFields = [
  { name: "Electrics", path: "/electrics" },
  { name: "Plumbing", path: "/plumbing" },
  { name: "Ironwork", path: "/ironwork" },
  { name: "Woodwork", path: "/woodwork" },
  { name: "Architecture", path: "/architecture" },
];

const Header = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return (
    <header className="border-b bg-gradient-to-r from-primary to-accent text-white shadow-lg relative">
      {isOffline && (
        <Badge 
          variant="destructive" 
          className="absolute top-2 right-2 md:right-4 flex items-center gap-1 z-50"
        >
          <WifiOff className="h-3 w-3" />
          Offline
        </Badge>
      )}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-white flex items-center gap-2 relative">
            <div className="mix-blend-difference md:mix-blend-overlay">
              <img 
                src="/forest-lidar.png" 
                alt="Loopus&Maintain" 
                className="h-8 w-auto object-contain invert md:invert-0"
              />
            </div>
            <span className="mix-blend-difference">Loopus&Maintain</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {maintenanceFields.map((field) => (
              <Link
                key={field.name}
                to={field.path}
                className="text-white hover:text-secondary transition-colors"
              >
                {field.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-secondary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gradient-to-r from-primary to-accent text-white">
              <div className="flex flex-col space-y-4 mt-8">
                {maintenanceFields.map((field) => (
                  <Link
                    key={field.name}
                    to={field.path}
                    className="text-lg text-white hover:text-secondary transition-colors"
                  >
                    {field.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;