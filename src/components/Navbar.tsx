
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";

// Force cache bust

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Leadership", href: "/leadership" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Join Us", href: "/join" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Repentance and Holiness Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-soft transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p className="font-serif text-sm md:text-base font-semibold text-foreground leading-tight">
                Repentance & Holiness
              </p>
              <p className="text-xs text-muted-foreground">TU-K Fellowship</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Show Admin button only for authenticated admins */}
            {isAdmin && (
              <Link to="/admin/dashboard" className="ml-2">
                <Button className="gap-2 bg-gold hover:bg-gold-dark text-foreground shadow-gold">
                  <Settings className="w-4 h-4" />
                  Admin
                </Button>
              </Link>
            )}
            
            {/* Auth buttons */}
            {user ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="ml-2 gap-2 border-gold/30 hover:bg-gold/10"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" className="ml-2">
                <Button variant="outline" className="gap-2 border-gold/30 hover:bg-gold/10">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Admin button - only for admins */}
              {isAdmin && (
                <Link to="/admin/dashboard" className="mt-2 px-4" onClick={() => setIsOpen(false)}>
                  <Button className="w-full gap-2 bg-gold hover:bg-gold-dark text-foreground">
                    <Settings className="w-4 h-4" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              
              {/* Mobile Auth buttons */}
              {user ? (
                <div className="mt-2 px-4">
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full gap-2 border-gold/30 hover:bg-gold/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="mt-2 px-4" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2 border-gold/30 hover:bg-gold/10">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
