import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, MessageCircle } from "lucide-react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.data || []);
      } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category_name).filter(Boolean))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category_name === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-mist pb-16 min-h-screen">
      <section className="bg-navy pt-36 pb-20 relative">
        <div className="container-x text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Product Catalogue
          </motion.h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Explore our comprehensive range of road construction machinery.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search machinery (e.g. Hot Mix Plant)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-navy font-medium outline-none shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-12 container-x">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm ${
                category === cat ? "bg-brand text-white shadow-brand/30 scale-105" : "bg-white text-navy hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-navy font-semibold text-xl">Loading catalogue...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod, idx) => (
              <motion.div key={prod.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group flex flex-col">
                <div className="h-60 overflow-hidden relative">
                  <img src={prod.main_image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                    {prod.category_name}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-navy mb-3 group-hover:text-brand transition-colors">{prod.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-2">{prod.description}</p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <Link to={`/products/${prod.id}`} className="flex-1 bg-navy text-white text-center py-2.5 rounded-md font-semibold text-sm hover:bg-navy-deep transition">View Details</Link>
                    <a href={`https://wa.me/919924799233?text=Inquiry for ${prod.name}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] text-white text-center py-2.5 rounded-md font-semibold text-sm hover:bg-[#20b858] transition flex items-center justify-center gap-1"><MessageCircle size={16}/> Enquire</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center text-gray-500 text-lg mt-10">No products found matching your search.</div>
        )}
      </section>
    </div>
  );
}

