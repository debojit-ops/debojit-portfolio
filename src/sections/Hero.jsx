import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { motion } from "motion/react";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { Astronaut } from "../components/Astronaut";
import HeroText from "../components/HeroText";
import Loader from "../components/Loader";
import ParallaxBackground from "../components/parallaxBackground";


const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section id="home" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <motion.a
        href="https://www.volgainfosys.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-16 right-6 z-10 flex flex-col items-end gap-1.5 px-4 py-3 rounded-2xl border border-lavender/20 bg-midnight/80 backdrop-blur-sm hover:border-lavender/50 transition-all duration-300 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lavender animate-pulse" />
          <span className="text-sm font-semibold text-white">Unity Developer</span>
        </div>
        <span className="text-xs text-neutral-400 group-hover:text-lavender transition-colors">Volga Infosys · Mar 2026–Present</span>
      </motion.a>
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
