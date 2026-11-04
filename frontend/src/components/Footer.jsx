import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Download } from "lucide-react";
import { COMPANY_INFO, NAV_LINKS } from "../utils/constants";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [products, setProducts] = useState([]);

  // ડેટાબેઝમાંથી પ્રોડક્ટ્સ ફેચ કરો
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        if (res.data.success) {
          setProducts(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching footer products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <footer className="bg-[#0A1F44] text-white/70 pt-16 pb-8 border-t-[4px] border-brand">
      <div className="container-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          {!logoError ? (
             <img src="/logos/bc-logo.png.png" alt="B&C Technology" onError={() => setLogoError(true)} className="h-16 md:h-20 w-auto bg-white p-2 rounded-md mb-6 object-contain" />
          ) : (
            <div className="h-16 px-4 flex items-center justify-center bg-white rounded-md mb-6 w-fit"><span className="font-display font-bold text-navy text-xl tracking-wider">B&C TECH</span></div>
          )}
          <p className="text-sm leading-relaxed mb-6 text-white/60">Leading supplier of road construction machinery, building equipment, and genuine spare parts. Committed to building the nation's infrastructure.</p>
          
          <div className="flex items-center gap-3 mb-6">
            <a href="https://www.facebook.com/share/1ZSUvWpTtK/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/b_and_c_technology_mehsana?igsi=b2YxMGRxMTVreXht" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://maps.app.goo.gl/nsWT6zXMfgtgopMT7?g_st=aw" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-colors" aria-label="Google Maps">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
          </div>
          
          <a href="/brochure.pdf.pdf" download="B&C_Technology_Brochure.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand/30 group">
            <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> View / Download Brochure
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-display font-semibold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(link => (<li key={link.name}><Link to={link.path} className="hover:text-brand transition-colors text-sm text-white/60">{link.name}</Link></li>))}
            <li><Link to="/terms" className="hover:text-brand transition-colors text-sm text-white/60">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Dynamic Products List */}
        <div>
          <h4 className="text-white font-display font-semibold text-lg mb-6">Our Products</h4>
          <ul className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {products.map(prod => (
              <li key={prod.id}>
                <Link to={`/products/${prod.id}`} className="hover:text-brand transition-colors text-sm text-white/60 block py-1">
                  {prod.name}
                </Link>
              </li>
            ))}
            {products.length === 0 && <li className="text-white/40 text-sm">Loading...</li>}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-display font-semibold text-lg mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3"><MapPin className="text-brand shrink-0 mt-1" size={18} /><span className="text-white/60">{COMPANY_INFO.address}</span></li>
            <li className="flex items-center gap-3"><Phone className="text-brand shrink-0" size={18} /><a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-brand text-white/60">{COMPANY_INFO.phone}</a></li>
            <li className="flex items-center gap-3"><Mail className="text-brand shrink-0" size={18} /><a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-brand text-white/60">{COMPANY_INFO.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
        <p>© {new Date().getFullYear()} B&C Technology. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/terms" className="hover:text-brand transition-colors">Terms & Conditions</Link>
          <span>|</span>
          <p>Designed for Premium Industrial Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
