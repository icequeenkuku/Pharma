import { Link, useLocation } from "react-router-dom";
import { Shield, BarChart3, FileText, Home } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Client Portal", path: "/client", icon: FileText },
  { label: "Donor Dashboard", path: "/donor", icon: BarChart3 },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">ZimPharma</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                title={item.label}
              >
                <item.icon className="w-5 h-5 md:w-4 md:h-4 shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
