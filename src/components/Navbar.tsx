import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Instagram } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Services", href: "#services", mobileIndex: 2 },
  { label: "Gallery", href: "#gallery", mobileIndex: 3 },
  { label: "Offers", href: "#offers", mobileIndex: 4 },
  { label: "Academy & Reviews", href: "#academy", mobileIndex: 5 },
  { label: "Contact", href: "#contact", mobileIndex: 7 },
];

const instagramUrl = "https://www.instagram.com/aaurora2024/";

interface NavbarProps {
  onMobileNavigate?: (index: number) => void;
}

const Navbar = ({ onMobileNavigate }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleUserActivity = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      // Show navbar if it was hidden
      setHidden(false);

      // Clear any existing timeout
      clearTimeout(timeoutId);

      // Only hide when idle if we are scrolled down a bit
      if (currentY > 100) {
        timeoutId = setTimeout(() => {
          // If the mobile menu isn't open, hide the navbar
          setHidden(true);
        }, 3000); // 3 seconds of idle time
      }
    };

    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);

    // Initial setup
    handleUserActivity();

    return () => {
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMobileClick = (index: number) => {
    if (onMobileNavigate) {
      onMobileNavigate(index);
      setMobileOpen(false);
    }
  };

  // Check if we're on mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Solid black on mobile, transparent only on hero for desktop
  const bgClass = (scrolled || isMobile)
    ? "bg-background border-b border-border"
    : "bg-transparent";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${bgClass}`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3"
          onClick={(e) => {
            if (onMobileNavigate) {
              e.preventDefault();
              onMobileNavigate(0);
            }
          }}
        >
          <img
            src={logo}
            alt="Aurora Logo"
            className="h-8 w-8 object-contain"
          />
          <div className="font-display tracking-tight">
            <span className="text-primary text-2xl font-light">Aurora</span>
            <span className="block text-white text-xs uppercase tracking-wide font-semibold mt-0.5">
              Makeup Studio & Academy
            </span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs uppercase tracking-[0.2em] text-white hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/916361388923"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-6 py-2.5 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.15em] font-medium hover:bg-primary/90 transition-colors animate-gold-pulse"
          >
            Book Now
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aurora Instagram"
            className="text-white hover:text-primary transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleMobileClick(link.mobileIndex)}
                  className="font-body text-sm uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+916361388923"
                className="flex items-center gap-2 text-primary font-body text-sm"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-body text-sm"
              >
                <Instagram size={16} /> @aaurora2024
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
