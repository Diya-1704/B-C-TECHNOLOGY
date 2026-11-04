import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye, ShieldCheck, Award, Settings, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-mist pb-16">
      
      {/* Page Header - pt-36 ઉમેર્યું છે જેથી નેવિગેશન બાર નીચે ટેક્સ્ટ ના આવે */}
      <section className="bg-navy pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541888086925-ebbcbfbc9a29?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container-x relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            About B&C Technology
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Building the nation's infrastructure with world-class machinery and unmatched service.
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 container-x">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-navy mb-6 leading-tight">
              A Legacy of Excellence in Road Construction Equipment
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Based in Mehsana, Gujarat, B&C Technology has emerged as a premier name in the road construction and building equipment industry. With over 15 years of experience, we have consistently bridged the gap between world-class machinery and on-ground execution.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We specialize in the sales, supply, and servicing of Hot Mix Plants, Road Rollers, Asphalt Pavers, and a comprehensive range of spare parts. Our commitment to quality and customer satisfaction has made us the trusted partner for contractors across India.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 font-semibold text-navy">
                <CheckCircle2 className="text-brand" size={20} /> Genuine Parts
              </div>
              <div className="flex items-center gap-2 font-semibold text-navy">
                <CheckCircle2 className="text-brand" size={20} /> Expert Support
              </div>
              <div className="flex items-center gap-2 font-semibold text-navy">
                <CheckCircle2 className="text-brand" size={20} /> Timely Delivery
              </div>
              <div className="flex items-center gap-2 font-semibold text-navy">
                <CheckCircle2 className="text-brand" size={20} /> Quality Assured
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=800&auto=format&fit=crop" 
              alt="B&C Technology Team" 
              className="rounded-xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand text-white p-6 rounded-xl shadow-xl">
              <p className="text-4xl font-display font-bold">15+</p>
              <p className="text-sm font-medium mt-1">Years of Trust</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container-x">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">Our Core</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-navy">Vision & Mission</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-mist p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-navy rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Eye className="text-white" size={32} />
              </div>
              <h4 className="text-2xl font-display font-bold text-navy mb-4">Our Vision</h4>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and preferred partner in the road construction equipment industry, driving infrastructure development through innovation, reliability, and exceptional service.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-mist p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-brand rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="text-white" size={32} />
              </div>
              <h4 className="text-2xl font-display font-bold text-navy mb-4">Our Mission</h4>
              <p className="text-gray-600 leading-relaxed">
                To provide top-tier machinery, genuine spare parts, and prompt technical support to our clients, ensuring their projects are completed on time and with the highest standards of quality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUALITY ASSURANCE SECTION */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container-x relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">Commitment to Excellence</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white">Quality Assurance</h3>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto">
              We don't just supply equipment; we deliver reliability. Our quality assurance processes ensure every part and machine meets the highest industry standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Genuine Products", desc: "We source only 100% genuine OEM and certified aftermarket parts." },
              { icon: Settings, title: "Rigorous Testing", desc: "Every machine undergoes strict quality checks before dispatch." },
              { icon: Award, title: "Industry Standards", desc: "Our equipment adheres to ISO and global safety standards." },
              { icon: ThumbsUp, title: "Client Satisfaction", desc: "We ensure seamless operations and rapid after-sales support." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-navy-deep/80 backdrop-blur border border-white/10 p-8 rounded-xl hover:border-brand/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors">
                  <item.icon className="text-brand" size={28} />
                </div>
                <h4 className="text-xl font-display font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-block bg-brand text-white px-8 py-3.5 rounded-md font-semibold hover:bg-brand-dark transition shadow-lg shadow-brand/20">
              Get in Touch with Our Experts
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
