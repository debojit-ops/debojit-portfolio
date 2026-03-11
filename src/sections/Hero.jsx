import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { Astronaut } from "../components/Astronaut";
import HeroText from "../components/HeroText";
import Loader from "../components/Loader";
import ParallaxBackground from "../components/parallaxBackground";


const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
<<<<<<< HEAD
    <section id="home" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
=======
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
>>>>>>> a52eb62ad0ce0f30fda993a20fc3e6072087b92d
      <HeroText />
      <ParallaxBackground />
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
