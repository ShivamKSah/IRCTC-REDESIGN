
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink, ChevronRight, Train } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 dark:bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
            <img
              src="https://i.pinimg.com/736x/73/d4/28/73d428d4849adf3d6347bcedb20f3357.jpg"
              alt="IRCTC Logo"
              className="h-6 w-6"
            />
              <span className="text-lg font-semibold">IRCTC</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern railway ticketing and information system for a seamless travel experience.
            </p>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>139 (24x7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>care@irctc.co.in</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>Indian Railways, New Delhi, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Book Ticket", "PNR Status", "Train Schedule", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link to="#" className="flex items-center hover:text-primary transition-colors">
                    <ChevronRight className="h-3 w-3 mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Travel Info</h3>
            <ul className="space-y-2 text-sm">
              {["Train Timetable", "Station Information", "Tatkal Booking", "Refund Rules", "Travel Insurance"].map((item) => (
                <li key={item}>
                  <Link to="#" className="flex items-center hover:text-primary transition-colors">
                    <ChevronRight className="h-3 w-3 mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Official Partners</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Indian Railways", url: "https://indianrailways.gov.in" },
                { name: "Ministry of Railways", url: "https://railways.gov.in" },
                { name: "National Train Enquiry", url: "https://enquiry.indianrail.gov.in" },
                { name: "Tourism", url: "https://tourism.gov.in" },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IRCTC. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
