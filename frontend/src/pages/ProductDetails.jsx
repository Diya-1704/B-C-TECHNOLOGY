import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Phone, MessageCircle, FileText, Settings, Wrench } from "lucide-react";
import axios from "axios";
import { COMPANY_INFO } from "../utils/constants";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.data);
        }
      } catch (error) { 
        console.error("Error fetching details:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-24 text-xl font-bold">Loading Details...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center pt-24 text-xl font-bold">Product Not Found</div>;

  const waLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello, I am interested in ${encodeURIComponent(product.name)}. Please share price and details.`;
  const mailLink = `mailto:${COMPANY_INFO.email}?subject=Inquiry for ${product.name}&body=Hello B&C Technology, I want to know more about ${product.name}.`;

  return (
    <div className="bg-mist pb-16 min-h-screen">
      <section className="pt-32 pb-8 container-x">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand transition-colors mb-6 font-medium">
          <ArrowLeft size={18} /> Back to Catalogue
        </Link>

        {/* TOP SECTION: 2-Column Layout */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-16">
          <div className="grid md:grid-cols-2">
            
            {/* Left: Main Image */}
            <div className="p-6 md:p-10 bg-gray-50 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl overflow-hidden shadow-lg h-[350px] md:h-[450px]">
                <img src={product.main_image} alt={product.name} className="w-full h-full object-cover" />
              </motion.div>
            </div>
            
            {/* Right: Description & Inquiry Button */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="p-6 md:p-12 flex flex-col justify-center">
              <span className="text-brand font-bold uppercase tracking-widest text-sm mb-2">{product.category_name}</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4 leading-tight">{product.name}</h1>
              <div className="h-1 w-20 bg-brand mb-6"></div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>
              
              {product.features && product.features.length > 0 && (
                <ul className="space-y-2 mb-8">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-navy font-medium"><CheckCircle2 className="text-brand" size={18} /> {f}</li>
                  ))}
                </ul>
              )}

              <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-100">
                <p className="text-sm text-gray-500 font-semibold uppercase mb-1">Contact for Price</p>
                <p className="text-2xl font-bold text-navy">Request a Quote</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a href={waLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] text-white px-6 py-4 rounded-md font-bold hover:bg-[#20b858] transition-all flex items-center justify-center gap-2 shadow-lg">
                  <MessageCircle size={20} /> Enquire Now
                </a>
                <a href={mailLink} className="flex-1 bg-navy text-white px-6 py-4 rounded-md font-bold hover:bg-navy-deep transition-all flex items-center justify-center gap-2 shadow-lg">
                  <FileText size={20} /> Email
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION: RELATED SPARE PARTS */}
        {product.spares && product.spares.length > 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10 border-t pt-12">
              <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-2">Genuine Components</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-navy">RELATED SPARE PARTS</h3>
              <p className="text-gray-500 mt-2">Inquire about specific parts for this machinery.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {product.spares.map((spare, idx) => {
                const spareWaLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello, I need a quotation for the spare part: ${encodeURIComponent(spare.part_name)} for ${encodeURIComponent(product.name)}.`;
                return (
                  <motion.div key={spare.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
                    <div className="h-48 overflow-hidden bg-gray-50">
                      <img src={spare.image_path} alt={spare.part_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow text-center">
                      <h4 className="text-lg font-bold text-navy mb-2 flex-grow">{spare.part_name}</h4>
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2">{spare.description}</p>
                      <a href={spareWaLink} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center justify-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-md font-semibold hover:bg-brand hover:text-white transition-colors text-sm">
                        <MessageCircle size={16}/> Enquire Part
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12 border-t mt-12">
            <p className="text-gray-500 text-lg">No spare parts listed for this product yet. Please contact us for specific requirements.</p>
          </div>
        )}
      </section>
    </div>
  );
}
