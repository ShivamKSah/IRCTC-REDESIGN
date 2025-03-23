
import { ReactNode } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

interface MainLayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  className?: string;
}

const MainLayout = ({ children, hideFooter = false, className = "" }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
