import { motion } from "motion/react";
import { FlipWords } from "./FlipWords";

const HeroText = () => {
  const words = ["Immersive", "Modern", "Scalable", "Interactive"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi I'm Debojit
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Developer <br /> Dedicated to Crafting
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            XR Solutions
          </motion.p>
        </div>
        <motion.a
          href="/XR_resume_DebojitGhosh.pdf"
          download="Debojit_Ghosh_Resume.pdf"
          className="relative inline-block px-4 py-4 mt-8 text-lg font-bold tracking-wider text-center text-white transition-all duration-200 rounded-lg cursor-pointer overflow-hidden hover:-translate-y-1 uppercase font-exo w-[220px]"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-lavender via-royal to-fuchsia bg-[length:200%_200%] animate-[gradient-flow_4s_ease_infinite]"></span>
          <span className="relative z-10 block h-7">
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0">
              <span className="whitespace-nowrap">Download Resume</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '3s'}}>
              <span className="whitespace-nowrap">Steal My Resume</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '6s'}}>
              <span className="whitespace-nowrap">Hire Me Maybe?</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '9s'}}>
              <span className="whitespace-nowrap">Peek My Resume</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '12s'}}>
              <span className="whitespace-nowrap">Resume Inside 👀</span>
            </span>
          </span>
        </motion.a>
      </div>
      {/* Mobile View */}
      <div className="flex- flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi,I'm Debojit
        </motion.p>
        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-7xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-black text-neutral300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Applications
          </motion.p>
        </div>
        <motion.a
          href="/XR_resume_DebojitGhosh.pdf"
          download="Debojit_Ghosh_Resume.pdf"
          className="relative inline-block px-4 py-4 mt-6 text-base font-bold tracking-wider text-center text-white transition-all duration-200 rounded-lg cursor-pointer overflow-hidden hover:-translate-y-1 uppercase font-exo w-[200px]"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-lavender via-royal to-fuchsia bg-[length:200%_200%] animate-[gradient-flow_4s_ease_infinite]"></span>
          <span className="relative z-10 block h-6">
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0">
              <span className="whitespace-nowrap">Download Resume</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '3s'}}>
              <span className="whitespace-nowrap">Steal My Resume</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '6s'}}>
              <span className="whitespace-nowrap">Hire Me Maybe?</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '9s'}}>
              <span className="whitespace-nowrap">Peek My Resume</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-[text-fade_15s_ease-in-out_infinite] opacity-0" style={{animationDelay: '12s'}}>
              <span className="whitespace-nowrap">Resume Inside 👀</span>
            </span>
          </span>
        </motion.a>
      </div>
    </div>
  );
};

export default HeroText;
