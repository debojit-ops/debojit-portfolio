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
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onCancel}
    >
      <motion.div
        className="relative z-10 flex flex-col gap-4 px-8 py-7 rounded-2xl border border-white/10 bg-navy shadow-2xl min-w-[300px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-neutral-400 uppercase tracking-widest">External Link</p>
        <p className="text-white font-semibold text-lg">Visit {name}?</p>
        <p className="text-xs text-neutral-500 break-all">{url}</p>
        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-white/10 text-sm text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ backgroundColor: color }}
          >
            Visit
          </button>
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
