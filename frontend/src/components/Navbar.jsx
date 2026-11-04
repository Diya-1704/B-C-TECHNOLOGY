import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, COMPANY_INFO } from "../utils/constants";
import axios from "axios";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowProducts(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchDropdownProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.data || []);
      } catch (error) { console.error("Error fetching dropdown products:", error); }
    };
    fetchDropdownProducts();
  }, []);

  const headerBg = (!isHomePage || isScrolled) ? "bg-navy shadow-lg py-3" : "bg-transparent py-5";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container-x flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 z-50">
          {!logoError ? (
            <img src="/logos/bc-logo.png.png" alt="B&C Technology" onError={() => setLogoError(true)} className="h-10 md:h-14 w-auto bg-white p-1 rounded shadow-sm object-contain" />
          ) : (
            <div className="h-10 md:h-12 px-3 flex items-center justify-center bg-white rounded shadow-sm"><span className="font-display font-bold text-navy text-lg tracking-wider">B&C TECH</span></div>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-8 h-full">
          {NAV_LINKS.map((link) => {
            if (link.name === "Products") {
              return (
                <div key={link.name} className="relative py-4" onMouseEnter={() => setShowProducts(true)} onMouseLeave={() => setShowProducts(false)}>
                  <Link to={link.path} className={`text-sm font-medium transition-colors hover:text-brand flex items-center gap-1 ${location.pathname.startsWith("/products") ? "text-brand" : "text-white"}`}>
                    {link.name} <ChevronDown size={14} />
                  </Link>
                  
                  <AnimatePresence>
                    {showProducts && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute top-full left-0 w-[320px] bg-white rounded-md shadow-2xl overflow-hidden border-t-4 border-brand py-2 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        {products.map((prod) => (
                          <Link key={prod.id} to={`/products/${prod.id}`} className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-mist hover:text-brand transition-colors border-b border-gray-50 last:border-0 font-medium">
                            <ChevronRight size={16} className="text-gray-400" />
                            {prod.name}
                          </Link>
                        ))}
                        <Link to="/products" className="block px-6 py-4 text-sm font-bold text-white bg-navy hover:bg-navy-deep transition-colors text-center mt-2">View All Products &rarr;</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors hover:text-brand ${location.pathname === link.path ? "text-brand" : "text-white"}`}>{link.name}</Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-white hover:text-brand transition"><Phone size={18} /><span className="font-semibold">{COMPANY_INFO.phone}</span></a>
          <Link to="/contact" className="bg-brand text-white px-5 py-2.5 rounded-md font-medium hover:bg-brand-dark transition shadow-lg shadow-brand/20">Get a Quote</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white z-50 p-2">{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 bg-navy-deep border-t border-white/10 shadow-2xl lg:hidden h-screen overflow-y-auto pb-20">
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <div key={link.name}>
                  <Link to={link.path} className="text-white text-lg font-medium hover:text-brand py-3 border-b border-white/10 block">{link.name}</Link>
                  {link.name === "Products" && (
                    <div className="pl-4 py-2 flex flex-col gap-1">
                      {products.map(prod => (
                        <Link key={prod.id} to={`/products/${prod.id}`} className="text-white/70 text-sm py-1 hover:text-brand flex items-center gap-2">
                           <ChevronRight size={14} /> {prod.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className="mt-4 bg-brand text-white text-center px-5 py-3 rounded-md font-medium hover:bg-brand-dark transition">Get a Quote</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
