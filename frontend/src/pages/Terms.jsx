import { motion } from "framer-motion";
import { ShieldCheck, FileText, Truck, Wrench } from "lucide-react";

export default function Terms() {
  return (
    <div className="bg-mist pb-16 min-h-screen">
      <section className="bg-navy pt-36 pb-20 relative">
        <div className="container-x text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Terms & Conditions</motion.h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Please read our terms and conditions carefully before making any inquiry or purchase.</p>
        </div>
      </section>

      <section className="py-16 container-x">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-8">
            
            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2"><FileText className="text-brand" size={24} /> 1. General Information</h2>
              <p className="text-gray-600 leading-relaxed">Welcome to <strong>B&C Technology</strong>. We are a leading supplier, dealer, and service provider for road construction machinery, building equipment, and genuine spare parts. Based in Mehsana, Gujarat, we serve clients across India and globally. By using our website or contacting us for an inquiry, you agree to the terms outlined below.</p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2"><ShieldCheck className="text-brand" size={24} /> 2. Products & Services</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
                <li>We deal in Hot/Batch Mix Plants, Drum Mix Plants, Wet Mix Plants, Concrete Batching Plants, Transit Mixers, Pavers, Road Rollers, Bitumen Sprayers, and various construction equipment.</li>
                <li>Our state-of-the-art, computer-controlled storage facilities ensure over <strong>15,000 spare and wear parts</strong> are always ready for rapid dispatch.</li>
                <li>All product images, specifications, and descriptions provided on the website are for general guidance. Actual products may vary based on the make, model, and manufacturer.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2"><Truck className="text-brand" size={24} /> 3. Pricing & Quotations</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
                <li>Prices displayed on the website are not mentioned (Contact for Price). All prices are subject to change without prior notice based on market conditions and manufacturer policies.</li>
                <li>All formal quotations are valid for a specific period mentioned in the quote. Please confirm the price before finalizing any order.</li>
                <li>We are not responsible for any typographical errors in pricing or specifications.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2"><Wrench className="text-brand" size={24} /> 4. Orders & Delivery</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
                <li>Delivery timelines are estimated and depend on the product type, stock availability, and destination. Rapid dispatch is available via courier, ship, or air.</li>
                <li>B&C Technology is not liable for delays caused by unforeseen circumstances (force majeure), including natural disasters, transport strikes, or government restrictions.</li>
                <li>Risk of loss or damage to the goods passes to the buyer upon delivery.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2"><ShieldCheck className="text-brand" size={24} /> 5. Warranty & Returns</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
                <li>All machinery and spare parts carry the standard manufacturer warranty (if applicable).</li>
                <li>Spare parts are non-returnable once installed or used. Returns are only accepted for manufacturing defects reported within the specified warranty period.</li>
                <li>We provide 100% genuine OEM and certified aftermarket parts. We do not entertain claims for counterfeit parts purchased elsewhere.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2"><FileText className="text-brand" size={24} /> 6. Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">Any personal information (Name, Phone Number, Email, Company Name) shared with us through our contact forms or WhatsApp is used strictly for communication and providing you with quotations. We do not sell or share your data with third parties.</p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2"><Wrench className="text-brand" size={24} /> 7. Customer Support</h2>
              <p className="text-gray-600 leading-relaxed">For any technical support, breakdown assistance, or AMC (Annual Maintenance Contracts), you can reach out to our experts.</p>
              <div className="mt-4 bg-mist p-4 rounded-lg border border-gray-200">
                {/* Contact person removed, only number and email */}
                <p className="text-sm text-gray-700"><strong>Phone:</strong> 99247 99233</p>
                <p className="text-sm text-gray-700"><strong>Email:</strong> bandtechnology1@gmail.com</p>
              </div>
            </div>

            <div className="pt-6 border-t text-sm text-gray-500">
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              <p>By using our services, you acknowledge that you have read and agreed to these Terms & Conditions.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

