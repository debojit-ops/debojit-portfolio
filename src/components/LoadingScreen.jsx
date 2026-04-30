import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Astronaut } from "./Astronaut";

const TAGLINES = [
  "Initializing XR Environment...",
  "Loading Reality...",
  "Calibrating Spatial Systems...",
  "Preparing Immersive Experience...",
];

const LINE1 = "Almost there,";
const LINE2 = "Good things take time";

const stars = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 4,
  size: Math.random() < 0.15 ? 3 : Math.random() < 0.35 ? 2 : 1,
}));

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current = Math.min(100, progressRef.current + Math.random() * 4 + 1);
      setProgress(Math.floor(progressRef.current));
      if (progressRef.current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 1200);
        }, 600);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(
      () => setTaglineIndex((i) => (i + 1) % TAGLINES.length),
      1800
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 35%, #1f1e39 0%, #06091f 55%, #030412 100%)",
          }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* DG monogram */}
          <motion.div
            className="absolute top-6 left-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span
              className="font-exo font-black text-sm tracking-[0.2em]"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DG
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">Portfolio</span>
          </motion.div>
          {/* Ambient glow blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-lavender/10 blur-[140px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-royal/10 blur-[120px]" />
            <div className="absolute top-0 right-0 w-[300px] h-[200px] rounded-full bg-aqua/5 blur-[80px]" />
          </div>

          {/* Stars */}
          <div className="pointer-events-none absolute inset-0">
            {stars.map((s) => (
              <motion.div
                key={s.id}
                className="absolute rounded-full bg-white"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
                animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* 3D Astronaut */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full border border-lavender/20"
              style={{ width: 220, height: 220 }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full border border-royal/10"
              style={{ width: 280, height: 280 }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <div style={{ width: 260, height: 260 }}>
              <Canvas camera={{ position: [0, 1, 3] }}>
                <ambientLight intensity={1.2} />
                <pointLight position={[5, 5, 5]} color="#ffffff" intensity={1} />
                <pointLight position={[-3, 2, 2]} color="#7a57db" intensity={1.5} />
                <Suspense fallback={null}>
                  <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
                    <Astronaut scale={0.28} position={[0.3, -1.2, 0]} />
                  </Float>
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Hero text */}
          <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
            {/* Line 1 — white, typewriter */}
            <div className="flex flex-wrap justify-center">
              {LINE1.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-black text-white"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 5.5rem)",
                    lineHeight: 1.1,
                    textShadow: "0 0 40px rgba(255,255,255,0.12)",
                    whiteSpace: "pre",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.01 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Line 2 — gradient, typewriter */}
            <div className="flex flex-wrap justify-center">
              {LINE2.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-black"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    lineHeight: 1.1,
                    background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 20px rgba(167,139,250,0.5))",
                    whiteSpace: "pre",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.3 + LINE1.length * 0.07 + 0.5 + i * 0.07,
                    duration: 0.01,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              {/* Animated dots after line 2 */}
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={`d2-${d}`}
                  className="font-black"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    lineHeight: 1.1,
                    background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    whiteSpace: "pre",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    delay: 0.3 + LINE1.length * 0.07 + 0.5 + LINE2.length * 0.07 + d * 0.4,
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  .
                </motion.span>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              className="mt-3 h-px bg-gradient-to-r from-transparent via-lavender/60 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 300 }}
              transition={{
                delay: 0.3 + (LINE1.length + LINE2.length) * 0.07 + 0.8,
                duration: 0.8,
                ease: "easeOut",
              }}
            />
          </div>

          {/* Bottom section */}
          <div className="mt-6 flex w-full max-w-sm flex-col items-center gap-2 px-6">
            {/* Tagline */}
            <div className="flex h-6 items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIndex}
                  className="text-center text-[0.75rem] uppercase tracking-[0.3em] text-lavender/80"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  {TAGLINES[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="relative w-full">
              <div className="w-full rounded-full bg-white/[0.06] overflow-hidden" style={{ height: 5 }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #5c33cc, #a78bfa, #ec4899)",
                    boxShadow: "0 0 12px rgba(167,139,250,0.9), 0 0 24px rgba(124,58,237,0.5)",
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Percentage */}
            <p className="font-exo text-xs tracking-widest text-lavender/50">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
