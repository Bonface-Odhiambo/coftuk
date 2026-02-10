
import { Heart, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-primary via-primary to-primary/95 text-primary-foreground overflow-hidden">
      {/* Decorative glow elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/50 rounded-full blur-3xl" />
      </div>
      
      {/* Enhanced Scroll to top button */}
      <div className="relative flex justify-center -mt-7 mb-10">
        <button
          onClick={scrollToTop}
          className="group relative bg-gradient-to-br from-gold to-gold/80 text-primary rounded-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_hsl(43,90%,55%,0.4)] transition-all duration-500 hover:-translate-y-2 hover:scale-110"
          aria-label="Scroll to top"
        >
          {/* Animated ring */}
          <span className="absolute inset-0 rounded-full border-2 border-gold/50 animate-ping opacity-30" />
          <span className="absolute inset-[-4px] rounded-full border border-gold/30 group-hover:border-gold/60 transition-colors" />
          
          {/* Icon */}
          <ArrowUp className="w-5 h-5 relative z-10 group-hover:animate-bounce" strokeWidth={2.5} />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gold/40 blur-md -z-10 group-hover:blur-lg transition-all" />
        </button>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Logo & Mission */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-5 justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/30 rounded-full blur-md animate-pulse" />
                  <img
                    src={logo}
                    alt="Repentance and Holiness Logo"
                    className="relative w-14 h-14 rounded-full object-cover border-2 border-gold shadow-lg"
                  />
                </div>
                <div>
                  <p className="font-serif font-bold text-lg">Repentance & Holiness</p>
                  <p className="text-sm text-gold font-medium">TU-K Fellowship</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed font-medium italic">
                "Preparing the Way for the Coming of the Messiah."
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-serif font-bold text-lg mb-5 text-gold">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "#about", label: "About Us" },
                  { href: "#events", label: "Events" },
                  { href: "#join", label: "Join Fellowship" },
                  { href: "#contact", label: "Contact Us" },
                ].map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="text-primary-foreground/70 hover:text-gold transition-colors duration-300 inline-block hover:translate-x-1 transform"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scripture */}
            <div className="text-center md:text-right">
              <h4 className="font-serif font-bold text-lg mb-5 text-gold">Scripture</h4>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-gold/20 inline-block">
                <blockquote className="text-primary-foreground/90 italic text-lg font-serif">
                  "Be holy, for I am holy."
                </blockquote>
                <footer className="text-gold mt-3 font-medium">
                  — 1 Peter 1:16
                </footer>
              </div>
            </div>
          </div>

          {/* Divider with cross icon */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent flex-1" />
            <div className="text-gold text-2xl">✝</div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent flex-1" />
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-primary-foreground/60">
              © {currentYear} Repentance & Holiness Fellowship, TU-K
            </p>
            <p className="text-primary-foreground/60">
              For the Glory of Jesus
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
