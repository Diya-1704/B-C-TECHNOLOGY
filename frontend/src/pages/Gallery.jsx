import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import axios from "axios";

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching gallery products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-mist min-h-screen pb-16">
      {/* Page Header */}
      <section className="bg-navy pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541888086925-ebbcbfbc9a29?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container-x relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Explore our premium collection of road construction machinery. Click on any equipment to view its details and spare parts.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 container-x">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-navy">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mb-4"></div>
            <p className="font-semibold">Loading Gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod, index) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link 
                  to={`/products/${prod.id}`}
                  className="group block relative h-72 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100"
                >
                  {/* Image */}
                  <img 
                    src={prod.main_image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  {/* Gradient Overlay (Always visible at bottom for text readability) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-brand text-xs font-bold uppercase tracking-widest mb-1">
                      {prod.category_name || "Machinery"}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mb-2 leading-tight">
                      {prod.name}
                    </h3>
                    
                    {/* View Details Button (Appears on Hover) */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden flex items-center gap-2 text-white font-semibold text-sm">
                      View Details <ArrowRight size={16} className="text-brand" />
                    </div>
                  </div>
                  
                  {/* Icon top right (Decorative) */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ImageIcon size={18} className="text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products available in the gallery yet.
          </div>
        )}
      </section>
    </div>
  );
}
