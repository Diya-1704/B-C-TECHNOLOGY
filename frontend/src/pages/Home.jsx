import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { SERVICES, STATS } from "../utils/constants";
import Counter from "../components/Counter";

const heroSlides = [
  {
    title: (<>Powering <span className="text-brand">Road & Infrastructure</span> Development</>),
    subtitle: "Your trusted partner for premium road construction machinery, building equipment, genuine spare parts, and expert services in Gujarat.",
  },
  {
    title: (<>Premium <span className="text-brand">Machinery & Genuine</span> Spare Parts</>),
    subtitle: "Bridging the gap between world-class equipment and on-ground execution. We supply top-tier plants, pavers, rollers, and parts to keep your projects moving.",
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setFeaturedProducts(res.data.data || []); console.log("Home Data Loaded");
      } catch (error) { console.error("Error fetching products:", error); }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredProducts]);

  const nextProduct = () => setCurrentProductIndex((prev) => (prev + 1) % featuredProducts.length);
  const prevProduct = () => setCurrentProductIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  return (
    <div className="bg-mist">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-32">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.jpg.jpeg')" }}>
          <div className="absolute inset-0 bg-navy/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/50 to-transparent" />
        </div>

        <div className="container-x relative z-10 text-center md:text-left mt-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-brand/20 border border-brand/30 text-brand text-xs font-semibold tracking-widest uppercase mb-6">Welcome to B&C Technology</span>
            <div className="relative grid mb-8">
              {heroSlides.map((slide, index) => (
                <motion.div key={index} className="col-start-1 row-start-1" initial={false} animate={{ opacity: currentHeroSlide === index ? 1 : 0, y: currentHeroSlide === index ? 0 : 10, zIndex: currentHeroSlide === index ? 10 : 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} style={{ pointerEvents: currentHeroSlide === index ? 'auto' : 'none' }}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">{slide.title}</h1>
                  <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">{slide.subtitle}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/products" className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all hover:gap-3 shadow-xl shadow-brand/20">Explore Products <ArrowRight size={20} /></Link>
              <Link to="/contact" className="w-full sm:w-auto bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-md font-semibold hover:bg-white/20 transition-all flex items-center justify-center">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-20 -mt-16 container-x">
        <div className="bg-white rounded-xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          {STATS.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-display font-bold text-navy mb-2"><Counter end={stat.value} suffix={stat.suffix} /></h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT SHORT SECTION */}
      <section className="py-24 container-x">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <img src="/images/about-bg.jpg.jpeg" alt="Construction" className="rounded-xl shadow-2xl w-full h-[500px] object-cover" />
            <div className="absolute -bottom-8 -right-8 bg-brand text-white p-6 rounded-xl shadow-xl hidden md:block"><p className="text-4xl font-display font-bold">100%</p><p className="text-sm font-medium mt-1">Quality Assured</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">About Our Company</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6 leading-tight">Building Strong Foundations for Tomorrow</h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">Based in Mehsana, Gujarat, B&C Technology is a premier supplier of road construction machinery and building equipment. We bridge the gap between world-class machinery and on-ground execution.</p>
            <ul className="space-y-3 mb-8">
              {["Genuine Spare Parts", "Expert Technical Support", "Premium Brand Machinery"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-navy font-medium"><CheckCircle2 className="text-brand" size={20} /> {item}</li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center gap-2 text-navy font-bold hover:text-brand transition-colors group">Read Our Story <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </motion.div>
        </div>
      </section>

      {/* 🔴 PREMIUM PRODUCT SLIDER SECTION (Mobile Fixed) 🔴 */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-x">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">Our Solutions</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-navy">Featured Machinery</h3>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="relative max-w-6xl mx-auto px-4 md:px-0">
              
              {/* Slider Container - Height adjusted for mobile */}
              <div className="bg-navy rounded-2xl overflow-hidden shadow-2xl relative min-h-[650px] md:min-h-0 md:h-[500px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProductIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col md:grid md:grid-cols-2"
                  >
                    {/* Left: Image */}
                    <div className="h-[250px] md:h-full relative overflow-hidden shrink-0">
                      <img 
                        src={featuredProducts[currentProductIndex].main_image} 
                        alt={featuredProducts[currentProductIndex].name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/90 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent md:hidden" />
                    </div>

                    {/* Right: Info */}
                    <div className="p-6 md:p-16 flex flex-col justify-center bg-navy relative z-10 flex-grow">
                      <span className="text-brand font-bold uppercase tracking-widest text-sm mb-2">Premium Equipment</span>
                      <h4 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                        {featuredProducts[currentProductIndex].name}
                      </h4>
                      <div className="h-1 w-16 bg-brand mb-4 md:mb-6"></div>
                      <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-4 md:line-clamp-3">
                        {featuredProducts[currentProductIndex].description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-auto">
                        <Link 
                          to={`/products/${featuredProducts[currentProductIndex].id}`} 
                          className="bg-brand text-white px-6 md:px-8 py-3 md:py-3.5 rounded-md font-semibold text-center hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          View Details <ArrowRight size={18} />
                        </Link>
                        <a 
                          href={`https://wa.me/919924799233?text=Inquiry for ${featuredProducts[currentProductIndex].name}`}
                          target="_blank" rel="noreferrer"
                          className="bg-white/10 border border-white/20 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-md font-semibold text-center hover:bg-white hover:text-navy transition-all flex items-center justify-center text-sm md:text-base"
                        >
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <button onClick={prevProduct} className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-16 bg-white/80 md:bg-white text-navy p-2 md:p-3 rounded-full shadow-xl hover:bg-brand hover:text-white transition-colors z-20">
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
              <button onClick={nextProduct} className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-16 bg-white/80 md:bg-white text-navy p-2 md:p-3 rounded-full shadow-xl hover:bg-brand hover:text-white transition-colors z-20">
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center flex-wrap gap-2 mt-6">
                {featuredProducts.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentProductIndex(idx)}
                    className={`h-3 rounded-full transition-all ${currentProductIndex === idx ? "bg-brand w-8" : "bg-gray-300 hover:bg-gray-400 w-3"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-navy">Loading products...</div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 container-x">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-navy">Comprehensive Services</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.slice(0, 4).map((svc, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-transparent hover:border-brand transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand/10 transition-colors"><CheckCircle2 className="text-navy group-hover:text-brand transition-colors" size={28} /></div>
              <h4 className="text-xl font-display font-semibold text-navy mb-3">{svc.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="container-x relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Looking for Machinery or Spare Parts?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Contact our experts today for the best prices, technical advice, and reliable supply.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-md font-semibold hover:bg-brand-dark transition shadow-xl">Send an Enquiry</Link>
            <a href="https://wa.me/919924799233" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-white text-navy px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition shadow-xl">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

