import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import RoadScene from "./RoadScene";
import LogoReveal from "./LogoReveal";

const STORAGE_KEY = "bc_intro_seen_v3";

export default function IntroAnimation({ onComplete }) {
  const [show, setShow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [roadVisible, setRoadVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  // Decide whether to show the intro
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    if (sessionStorage.getItem(STORAGE_KEY)) {
      onComplete?.();
      return;
    }
    setShow(true);
  }, [onComplete]);

  // Orchestrate the timeline
  useEffect(() => {
    if (!show) return;
    const timers = [];

    if (reducedMotion) {
      timers.push(setTimeout(() => setRoadVisible(true), 100));
      timers.push(setTimeout(() => setLogoVisible(true), 350));
      timers.push(setTimeout(() => setShow(false), 2400));
    } else {
      timers.push(setTimeout(() => setRoadVisible(true), 300));
      timers.push(setTimeout(() => setLogoVisible(true), 1200));
      timers.push(setTimeout(() => setShow(false), 4200));
    }

    return () => timers.forEach(clearTimeout);
  }, [show, reducedMotion]);

  const handleExitComplete = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    onComplete?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-navy-deep"
          role="dialog"
          aria-label="B and C Technology introduction"
        >
          {/* Skip button */}
          <button
            type="button"
            onClick={() => setShow(false)}
            className="absolute right-4 top-4 md:right-8 md:top-8 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs md:text-sm text-white/80 backdrop-blur-sm transition hover:border-brand hover:bg-brand/20 hover:text-white"
            aria-label="Skip introduction"
          >
            <X size={14} />
            Skip Intro
          </button>

          {/* Radial gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 45%, #24365E 0%, #101C33 60%, #0A1220 100%)",
            }}
          />

          {/* Blueprint grid overlay */}
          {!reducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.07 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(192,197,206,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(192,197,206,0.6) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          )}

          {/* Horizon glow above the road */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.5 }}
            className="absolute inset-x-0 bottom-[30vh] md:bottom-[35vh] h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(242,140,40,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Logo — centered in the space above the road */}
          <div className="absolute inset-x-0 top-0 bottom-[30vh] md:bottom-[35vh] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={logoVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <LogoReveal visible={logoVisible} reducedMotion={reducedMotion} />
            </motion.div>
          </div>

          {/* Road scene at the bottom */}
          {roadVisible && (
            <div className="absolute inset-x-0 bottom-0">
              <RoadScene />
            </div>
          )}

          {/* Cinematic vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(10,18,32,0.8) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
