import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home",     href: "#home"      },
  { label: "About",    href: "#about"     },
  { label: "Projects", href: "#work"      },
  { label: "Journey",  href: "#academics" },
  { label: "Contact",  href: "#contact"   },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);
  return active;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const offset = 70;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 w-full"
      animate={{
        backgroundColor: scrolled ? "rgba(6,9,31,0.85)" : "rgba(6,9,31,0)",
        borderBottomColor: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
            className="text-xl font-bold text-neutral-400 hover:text-white transition-colors duration-200"
          >
            Debojit Ghosh
          </a>

          {/* Desktop nav + resume — all right aligned */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className="relative px-3.5 py-1.5 text-sm rounded-lg transition-colors duration-200 group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/6 border border-white/8"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-200"}`}>
                    {label}
                  </span>
                </a>
              );
            })}

            <div className="w-px h-4 bg-white/10 mx-1" />

            <a
              href="/resume/XR_resume_DebojitGhosh.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-lavender/80 border border-lavender/20 bg-lavender/5 hover:bg-lavender/10 hover:border-lavender/40 hover:text-lavender transition-all duration-200"
            >
              Résumé
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <motion.div animate={isOpen ? "open" : "closed"} className="flex flex-col gap-1.5 w-4">
              <motion.span className="block h-px bg-current rounded-full" variants={{ open: { rotate: 45, y: 4 }, closed: { rotate: 0, y: 0 } }} transition={{ duration: 0.2 }} />
              <motion.span className="block h-px bg-current rounded-full" variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }} transition={{ duration: 0.2 }} />
              <motion.span className="block h-px bg-current rounded-full" variants={{ open: { rotate: -45, y: -4 }, closed: { rotate: 0, y: 0 } }} transition={{ duration: 0.2 }} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden border-t border-white/6 bg-midnight/95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="c-space py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = active === href.slice(1);
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors duration-200 ${isActive ? "bg-white/6 text-white border border-white/8" : "text-neutral-400 hover:text-white hover:bg-white/4"}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <span className={`w-1 h-1 rounded-full ${isActive ? "bg-lavender" : "bg-neutral-700"}`} />
                    {label}
                  </motion.a>
                );
              })}
              <a
                href="/resume/XR_resume_DebojitGhosh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-lavender border border-lavender/20 bg-lavender/5"
              >
                View Résumé
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
