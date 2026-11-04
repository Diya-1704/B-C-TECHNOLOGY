import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, User, MessageSquare, Send, Navigation, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import { COMPANY_INFO } from "../utils/constants";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", product: "", message: "" });
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.data || []);
      } catch (error) { console.error("Error fetching products:", error); }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", product: "", message: "" });
      } else { alert("Something went wrong. Please try again or WhatsApp us."); }
    } catch (error) { alert("Network error. Please make sure backend server is running."); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-mist pb-16 min-h-screen">
      <section className="bg-navy pt-36 pb-20 relative">
        <div className="container-x text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Contact Us</motion.h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Get in touch with our experts for machinery inquiries, spare parts, or technical support.</p>
        </div>
      </section>

      <section className="py-16 container-x">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-2xl font-display font-bold text-navy mb-6">Get In Touch</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center shrink-0"><MapPin className="text-brand" size={24} /></div>
                <div>
                  <h4 className="font-semibold text-navy">Our Location</h4>
                  <p className="text-gray-600 text-sm mt-1">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center shrink-0"><Phone className="text-brand" size={24} /></div>
                <div>
                  <h4 className="font-semibold text-navy">Phone / WhatsApp</h4>
                  {/* Name removed, only number shown */}
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-brand font-semibold hover:underline">{COMPANY_INFO.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center shrink-0"><Mail className="text-brand" size={24} /></div>
                <div>
                  <h4 className="font-semibold text-navy">Email Us</h4>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-600 text-sm mt-1 hover:text-brand">{COMPANY_INFO.email}</a>
                </div>
              </div>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 h-[300px] overflow-hidden relative group">
              <iframe src="https://maps.google.com/maps?q=B%20%26%20C%20Technology%2C%20Sarvamangal%20Heights%2C%20Maan%20Pharma%20Road%2C%20Dediyasan%20GIDC%2C%20Mehsana%2C%20Gujarat%20384002&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" className="rounded-lg"></iframe>
              <a href="https://maps.app.goo.gl/nsWT6zXMfgtgopMT7?g_st=aw" target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 bg-white text-navy px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-semibold hover:bg-brand hover:text-white transition-colors"><Navigation size={16} /> Get Directions</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 size={64} className="text-green-500 mb-6" />
                <h3 className="text-2xl font-bold text-navy mb-2">Inquiry Sent Successfully!</h3>
                <p className="text-gray-600 mb-4">Thank you for contacting B&C Technology.</p>
                <p className="text-brand font-semibold">Our team will contact you within 24 hours.</p>
                <button onClick={() => setIsSuccess(false)} className="mt-8 text-gray-500 hover:text-navy underline text-sm">Send another message</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-display font-bold text-navy mb-6">Send an Inquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={18} /><input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-brand outline-none" placeholder="Your Name" /></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="relative"><Phone className="absolute left-3 top-3 text-gray-400" size={18} /><input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-brand outline-none" placeholder="Your Phone" /></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={18} /><input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-brand outline-none" placeholder="you@company.com" /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Interested In</label>
                    <select required name="product" value={formData.product} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-brand outline-none bg-white">
                      <option value="">Select a Product</option>
                      {products.map(prod => (<option key={prod.id} value={prod.name}>{prod.name}</option>))}
                      <option value="Spare Parts">Spare Parts (General)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <div className="relative"><MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} /><textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-brand outline-none resize-none" placeholder="How can we help you?"></textarea></div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-brand text-white px-6 py-3.5 rounded-md font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/20 disabled:opacity-70">
                    {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : <>Send Inquiry <Send size={18} /></>}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

