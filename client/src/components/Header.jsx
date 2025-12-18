import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact Us" },
    { path: "/about", label: "About Us" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-stone-50/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
              scrolled || !isHomePage ? "text-gray-900" : "text-white"
            }`}>
              FirstSketch
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? (scrolled || !isHomePage) ? "text-gray-900 font-semibold tracking-extra-wide" : "text-white font-semibold"
                    : (scrolled || !isHomePage) ? "text-gray-600 hover:text-gray-900 tracking-extra-wide" : "text-white/90 hover:text-white"
                }`}
              >
                <span className="relative">
                  {link.label}
                </span>
                {isActive(link.path) && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-300 ${
                    (scrolled || !isHomePage) ? "bg-gray-900" : "bg-white"
                  }`}></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 active:scale-95 ${
                (scrolled || !isHomePage)
                  ? "hover:bg-gray-100 text-gray-900" 
                  : "hover:bg-white/20 text-white"
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-stone-200 bg-stone-50 px-4 py-2 transition-colors duration-500">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium tracking-extra-wide transition-all duration-200 animate-slideIn ${
                isActive(link.path)
                  ? "text-gray-900 bg-gray-100 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{link.label}</span>
              {isActive(link.path) && (
                <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
