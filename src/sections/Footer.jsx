import { motion } from "motion/react";

const Footer = () => (
  <footer className="relative overflow-hidden bg-primary">
    {/* Gradient border top */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-lavender to-aqua" />

    <div className="relative py-16">
      {/* Watermark name */}
      <p
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none whitespace-nowrap font-black uppercase tracking-widest overflow-hidden"
        style={{
          fontSize: "clamp(4rem, 7vw, 8rem)",
          transform: "scaleY(0.7) scaleX(1.3)",
          letterSpacing: "-0.02em",
          background: "linear-gradient(90deg, #7a57db, #33c2cc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.18,
          transform: "scaleX(1.1)",
          maxWidth: "100%",
        }}
      >
        Debojit Ghosh
      </p>

      {/* Copyright */}
      <p className="relative z-10 text-center text-xs text-neutral-600/50">
        © {new Date().getFullYear()} Debojit Ghosh. All rights reserved.
      </p>
    </div>

    {/* Scroll to top */}
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-lavender flex items-center justify-center shadow-lg shadow-lavender/30 z-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src="assets/arrow-up.svg" className="w-4 h-4" alt="scroll to top" />
    </motion.button>
  </footer>
);

export default Footer;
