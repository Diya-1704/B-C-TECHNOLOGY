import { motion } from "framer-motion";

export default function RoadScene() {
  return (
    <div className="relative w-full h-[30vh] md:h-[35vh] overflow-hidden bg-navy-deep">
      {/* ---- Road surface (wipes in from left) ---- */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <svg
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="asphaltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A3366" />
              <stop offset="50%" stopColor="#0A1F44" />
              <stop offset="100%" stopColor="#06132C" />
            </linearGradient>
            <linearGradient id="laneGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="10%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Road body */}
          <rect x="0" y="30" width="1200" height="270" fill="url(#asphaltGrad)" />

          {/* Dashed white lane line (matching the logo) */}
          <line
            x1="0" y1="165" x2="1200" y2="165"
            stroke="url(#laneGrad)"
            strokeWidth="6"
            strokeDasharray="50 30"
          />
        </svg>
      </motion.div>

      {/* ---- Construction cones along road top ---- */}
      {[12, 32, 52, 72, 92].map((pct, i) => (
        <motion.div
          key={pct}
          initial={{ opacity: 0, y: -12, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.08, duration: 0.45, ease: "easeOut" }}
          className="absolute"
          style={{ left: `${pct}%`, top: "24%", transform: "translateX(-50%)" }}
        >
          <Cone />
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------- Construction cone -------------------- */
function Cone() {
  return (
    <svg viewBox="0 0 30 40" className="w-5 md:w-6 h-auto" aria-hidden="true">
      <polygon points="15,2 4,36 26,36" fill="#F28C28" stroke="#D97706" strokeWidth="1" />
      <rect x="8" y="20" width="14" height="4" fill="#FFFFFF" opacity="0.9" />
      <rect x="4" y="36" width="22" height="4" rx="1" fill="#D97706" />
    </svg>
  );
}
