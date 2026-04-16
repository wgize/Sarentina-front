import { useState, useEffect, useRef } from "react";
import { Menu, X, Coffee, ShoppingCart, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useSearch } from "@/contexts/SearchContext";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#menu", label: "Menú" },
  { href: "#ambiente", label: "Ambiente" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const { state, dispatch } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevCartCount = useRef(state.items.length);

  useEffect(() => {
    if (state.items.length > prevCartCount.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
    }
    prevCartCount.current = state.items.length;
  }, [state.items.length]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const wasEmpty = !searchQuery.trim();
    setSearchQuery(value);
    if (wasEmpty && value.trim()) {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const toggleSearch = () => {
    if (searchOpen) {
      closeSearch();
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#1C1008]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#C8A96E] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Coffee className="w-5 h-5 text-[#1C1008]" />
            </div>
            <span className="text-[#C8A96E] font-bold text-xl tracking-wide font-serif">
              La Sarentina
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}

            {/* Search bar */}
            <div className="flex items-center gap-1">
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  searchOpen ? "w-44 opacity-100" : "w-0 opacity-0",
                )}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                  placeholder="Buscar en el menú…"
                  className="w-full px-3 py-1.5 text-sm bg-white/10 border border-[#C8A96E]/35 rounded-full text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 focus:outline-none focus:border-[#C8A96E]/70 transition-colors"
                />
              </div>
              <button
                onClick={toggleSearch}
                className="p-2 text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors"
                aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
              >
                {searchOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart
                className={`w-5 h-5 ${cartBounce ? "animate-cart-bounce" : ""}`}
              />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A96E] text-[#1C1008] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>

            <a
              href="#contacto"
              className="ml-1 px-5 py-2 bg-[#C8A96E] text-[#1C1008] rounded-full text-sm font-semibold hover:bg-[#D4B87A] transition-colors tracking-wide"
            >
              Reservar
            </a>
          </div>

          {/* Mobile — lupa + carrito + hamburguesa */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleSearch}
              className="p-2 text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors"
              aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
            >
              {searchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors"
              aria-label="Carrito"
            >
              <ShoppingCart
                className={`w-5 h-5 ${cartBounce ? "animate-cart-bounce" : ""}`}
              />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A96E] text-[#1C1008] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>

            <button
              className="p-1 text-[#C8A96E]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar — se despliega al pulsar la lupa */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-[#1C1008]/97 backdrop-blur-md",
          searchOpen ? "max-h-16 border-t border-[#C8A96E]/15" : "max-h-0",
        )}
      >
        <div className="px-4 py-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A96E]/50 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Escape" && closeSearch()}
              placeholder="Buscar en el menú…"
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/10 border border-[#C8A96E]/30 rounded-full text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 focus:outline-none focus:border-[#C8A96E]/60 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav menu — hamburguesa */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-[#1C1008]/97 backdrop-blur-md",
          isOpen ? "max-h-80 border-t border-[#C8A96E]/20" : "max-h-0",
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors text-sm font-medium tracking-wide uppercase py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="mt-2 px-5 py-2.5 bg-[#C8A96E] text-[#1C1008] rounded-full text-sm font-semibold text-center hover:bg-[#D4B87A] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Reservar
          </a>
        </div>
      </div>
    </nav>
  );
}
