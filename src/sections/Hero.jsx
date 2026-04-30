import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Astronaut } from "../components/Astronaut";
import HeroText from "../components/HeroText";
import Loader from "../components/Loader";
import ParallaxBackground from "../components/parallaxBackground";

const ConfirmModal = ({ name, url, color, onConfirm, onCancel }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(3,4,18,0.7)", backdropFilter: "blur(12px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onCancel}
    >
      <motion.div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #161a31 0%, #06091f 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 60px rgba(122,87,219,0.15), 0 30px 80px rgba(0,0,0,0.6)`,
        }}
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-1">External Link</p>
              <p className="text-lg font-bold text-white leading-snug">Visit {name}?</p>
            </div>
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${color}18`, border: `1px solid ${color}40` }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke={color} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
          </div>

          {/* URL pill */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl mb-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0 text-neutral-600" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
            </svg>
            <p className="text-xs text-neutral-500 truncate font-mono">{url}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl text-sm text-neutral-500 hover:text-neutral-300 transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${color}cc, ${color})`,
                boxShadow: `0 0 20px ${color}40`,
              }}
            >
              Visit Site
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [modal, setModal] = useState(null);

  const handleClick = (e, name, url, color) => {
    e.preventDefault();
    setModal({ name, url, color });
  };

  const handleConfirm = () => {
    window.open(modal.url, "_blank", "noopener,noreferrer");
    setModal(null);
  };

  return (
    <section id="home" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      {modal && (
        <ConfirmModal
          {...modal}
          onConfirm={handleConfirm}
          onCancel={() => setModal(null)}
        />
      )}
      <div className="absolute bottom-16 right-6 z-10 flex flex-col items-end gap-3">
        <motion.a
          href="https://www.volgainfosys.com/"
          onClick={(e) => handleClick(e, "Volga Infosys", "https://www.volgainfosys.com/", "#7a57db")}
          className="flex flex-col items-end gap-1.5 px-4 py-3 rounded-2xl border border-lavender/20 bg-midnight/80 backdrop-blur-sm hover:border-lavender/50 transition-all duration-300 group cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lavender animate-pulse" />
            <span className="text-sm font-semibold text-white">Unity Developer</span>
          </div>
          <span className="text-xs text-neutral-400 group-hover:text-lavender transition-colors">Volga Infosys · Mar 2026–Present</span>
        </motion.a>
        <motion.a
          href="https://gitcservices.com/"
          onClick={(e) => handleClick(e, "GITCS", "https://gitcservices.com/", "#7a57db")}
          className="flex flex-col items-end gap-1.5 px-4 py-3 rounded-2xl border border-neutral-600/20 bg-midnight/80 backdrop-blur-sm hover:border-neutral-500/40 transition-all duration-300 group cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-500" />
            <span className="text-sm font-semibold text-neutral-300">AI Developer Intern</span>
          </div>
          <span className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">GITCS · Dec 2025–Apr 2026</span>
        </motion.a>
      </div>
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile && 0.26}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
