
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft, Train } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Train className="h-12 w-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-sm font-medium h-8 w-8 rounded-full flex items-center justify-center">
              404
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! The page you're looking for has departed from this station.
        </p>
        <p className="text-muted-foreground mb-8">
          The page at <span className="font-mono bg-muted px-2 py-1 rounded text-sm">{location.pathname}</span> doesn't exist or has been moved to a different location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="gap-2">
            <Link to="/">
              <HomeIcon className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
