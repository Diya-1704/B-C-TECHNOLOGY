import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Truck, Settings, HardHat, Headset } from "lucide-react";
import { SERVICES } from "../utils/constants";

const icons = [Truck, Settings, Wrench, HardHat, ShieldCheck, Headset];

export default function Services() {
  return (
    <div className="bg-mist pb-16 min-h-screen">
      <section className="bg-navy pt-36 pb-20 relative">
        <div className="container-x text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Our Services
          </motion.h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Comprehensive support to keep your road construction projects moving forward.
          </p>
        </div>
      </section>

      <section className="py-20 container-x">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border-t-4 border-transparent hover:border-brand group"
              >
                <div className="w-16 h-16 bg-navy/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand/10 transition-colors">
                  <Icon className="text-navy group-hover:text-brand transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-navy mb-3">{svc.title}</h3>
                <p className="text-gray-600 leading-relaxed">{svc.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

