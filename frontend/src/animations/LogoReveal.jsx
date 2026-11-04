import { motion } from "framer-motion";
import { useState } from "react";

export default function LogoReveal({ visible = true, reducedMotion = false }) {
  const [imgError, setImgError] = useState(false);

  if (!visible) return null;

  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-8 max-w-4xl w-full">
      
      {/* Logo Image Container */}
      <div className="relative overflow-hidden rounded-xl bg-white p-4 md:p-6 shadow-[0_0_50px_rgba(255,255,255,0.15)] min-w-[280px] md:min-w-[400px] min-h-[120px] flex items-center justify-center">
        
        {/* The actual logo */}
        {!imgError ? (
          <img
            src="/logos/bc-logo.png"
            alt="B&C Technology Logo"
            onError={() => setImgError(true)}
            className="w-[280px] md:w-[400px] h-auto object-contain"
          />
        ) : (
          /* Fallback text if image is missing */
          <div className="text-center py-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-navy tracking-widest">
              B&C TECHNOLOGY
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 mt-2 tracking-widest uppercase">
              (Please add bc-logo.png in public/logos folder)
            </p>
          </div>
        )}

        {/* Shiny metallic sweep animation */}
        {!reducedMotion && (
          <motion.div
            initial={{ x: "-150%", skewX: -20 }}
            animate={{ x: "150%", skewX: -20 }}
            transition={{
              duration: 1.5,
              delay: 1.2,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
              width: "40%",
            }}
          />
        )}
      </div>

      {/* Sub-text: Construction Equipment Supply and Service */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-6 flex flex-col items-center gap-1 text-center"
      >
        <h2 className="text-sm md:text-lg font-semibold tracking-[0.2em] text-silver uppercase font-display">
          Construction Equipment
        </h2>
        <h3 className="text-xs md:text-sm font-medium tracking-[0.3em] text-silver/80 uppercase font-body">
          Supply and Service
        </h3>
      </motion.div>

      {/* Tagline below the text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-5 text-xs md:text-base text-white/60 font-light tracking-widest italic text-center"
      >
        "Building Roads. Connecting Progress."
      </motion.p>
    </div>
  );
}
