import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Astronaut } from "./Astronaut";

const TAGLINES = [
  "Initializing XR Environment...",
  "Loading Reality...",
  "Calibrating Spatial Systems...",
  "Preparing Immersive Experience...",
];

const FIRST_NAME = "DEBOJIT".split("");
const LAST_NAME = "GHOSH".split("");

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 4,
  size: Math.random() < 0.3 ? 2 : 1,
}));

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const progressRef = useRef(0);

  // Progress ticker
  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current = Math.min(
        100,
        progressRef.current + Math.random() * 6 + 2
      );
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

  // Tagline cycler
  useEffect(() => {
    const interval = setInterval(
      () => setTaglineIndex((i) => (i + 1) % TAGLINES.length),
      1800
    );
    return () => clearInterval(interval);
  }, []);

  const letterBaseDelay = 0.3;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, #1f1e39 0%, #06091f 55%, #030412 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
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
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                }}
                animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.4, 0.8] }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* 3D Astronaut */}
          <div className="relative flex items-center justify-center">
            {/* Concentric rings */}
            <motion.div
              className="absolute rounded-full border border-lavender/20"
              style={{ width: 320, height: 320 }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full border border-royal/10"
              style={{ width: 400, height: 400 }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />

            <div style={{ width: 380, height: 380 }}>
              <Canvas camera={{ position: [0, 1, 3] }}>
                <ambientLight intensity={1.2} />
                <pointLight position={[5, 5, 5]} color="#ffffff" intensity={1} />
                <pointLight
                  position={[-3, 2, 2]}
                  color="#7a57db"
                  intensity={1.5}
                />
                <Suspense fallback={null}>
                  <Float
                    speed={2}
                    rotationIntensity={0.4}
                    floatIntensity={0.8}
                  >
                    <Astronaut scale={0.38} position={[0.4, -1.5, 0]} />
                  </Float>
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Name */}
          <div className="mt-4 flex flex-col items-center gap-2">
            {/* Single-row: DEBOJIT · GHOSH */}
            <div className="flex items-center gap-3">
              {/* DEBOJIT */}
              <div className="flex">
                {FIRST_NAME.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-exo font-black text-white"
                    style={{
                      fontSize: "2.8rem",
                      letterSpacing: "0.15em",
                      textShadow:
                        "0 0 18px rgba(122,87,219,0.9), 0 0 40px rgba(122,87,219,0.45), 0 0 80px rgba(122,87,219,0.2)",
                    }}
                    initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: letterBaseDelay + i * 0.07,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Vertical slash divider */}
              <motion.span
                className="font-exo font-thin text-lavender/40 select-none"
                style={{ fontSize: "2.2rem", lineHeight: 1 }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{
                  delay: letterBaseDelay + FIRST_NAME.length * 0.07 + 0.05,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                /
              </motion.span>

              {/* GHOSH */}
              <div className="flex">
                {LAST_NAME.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-exo font-black"
                    style={{
                      fontSize: "2.8rem",
                      letterSpacing: "0.15em",
                      background: "linear-gradient(90deg, #7a57db 0%, #5c33cc 45%, #ca2f8c 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 12px rgba(122,87,219,0.6))",
                    }}
                    initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "drop-shadow(0 0 12px rgba(122,87,219,0.6))" }}
                    transition={{
                      delay:
                        letterBaseDelay +
                        FIRST_NAME.length * 0.07 +
                        0.15 +
                        i * 0.07,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Subtitle tag */}
            <motion.p
              className="font-exo text-xs uppercase tracking-[0.35em] text-lavender/50"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay:
                  letterBaseDelay +
                  (FIRST_NAME.length + LAST_NAME.length) * 0.07 +
                  0.2,
                duration: 0.5,
              }}
            >
              XR · AI · Full-Stack
            </motion.p>

            {/* Divider */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-lavender/50 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 220 }}
              transition={{
                delay:
                  letterBaseDelay +
                  (FIRST_NAME.length + LAST_NAME.length) * 0.07 +
                  0.35,
                duration: 0.7,
                ease: "easeOut",
              }}
            />
          </div>

          {/* Bottom section */}
          <div className="mt-10 flex w-full max-w-xs flex-col items-center gap-3 px-4">
            {/* Tagline */}
            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIndex}
                  className="text-center text-xs uppercase tracking-[0.2em] text-neutral-500"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {TAGLINES[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="w-full rounded-full bg-white/5" style={{ height: 3 }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #5c33cc, #7a57db, #ca2f8c)",
                  boxShadow: "0 0 10px rgba(122,87,219,0.8)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Percentage */}
            <p className="text-xs text-neutral-600">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
