import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DROPDOWN_ITEMS = [
  {
    label: "View in browser",
    href: "/resume/XR_resume_DebojitGhosh.pdf",
    target: "_blank",
    download: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Download PDF",
    href: "/resume/XR_resume_DebojitGhosh.pdf",
    target: "_self",
    download: "XR_resume_DebojitGhosh.pdf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
];

function ResumeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold overflow-hidden cursor-pointer"
        style={{
          background: open
            ? "linear-gradient(135deg, rgba(122,87,219,0.22) 0%, rgba(92,51,204,0.18) 100%)"
            : "rgba(122,87,219,0.07)",
          border: `1px solid ${open ? "rgba(122,87,219,0.55)" : "rgba(122,87,219,0.22)"}`,
          color: open ? "#c4b0f5" : "rgba(122,87,219,0.85)",
          transition: "background 0.2s, border-color 0.2s, color 0.2s",
        }}
      >
        {/* animated shimmer on hover */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(122,87,219,0.18) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: open ? ["200% 0", "-200% 0"] : "200% 0" }}
          transition={{ duration: 1.4, ease: "easeInOut", repeat: open ? Infinity : 0 }}
        />
        <span className="relative z-10">Résumé</span>
        <motion.svg
          viewBox="0 0 24 24" fill="none" className="relative z-10 w-3 h-3" stroke="currentColor" strokeWidth={2.5}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </motion.button>

      {/* Animated dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-52 z-50 rounded-xl"
            style={{
              background: "linear-gradient(160deg, #1c2040 0%, #080b22 100%)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,87,219,0.12)",
              padding: "1px",
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* gradient border shell */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #1c2040 0%, #080b22 100%)",
                outline: "1px solid transparent",
                backgroundClip: "padding-box",
                boxShadow: "inset 0 0 0 1px rgba(122,87,219,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              {/* ── Header ── */}
              <div className="px-4 pt-3.5 pb-3 flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(122,87,219,0.3), rgba(92,51,204,0.2))", border: "1px solid rgba(122,87,219,0.35)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-lavender" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white leading-tight">Debojit Ghosh</p>
                  <p className="text-[10px] text-lavender/60 leading-tight mt-0.5">XR Developer · Resume</p>
                </div>
              </div>

              {/* gradient divider */}
              <div className="mx-3 mb-1" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(122,87,219,0.5) 40%, rgba(202,47,140,0.3) 70%, transparent)" }} />

              {DROPDOWN_ITEMS.map(({ label, href, target, download, icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={target}
                  rel="noopener noreferrer"
                  {...(download ? { download } : {})}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-400 relative"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.18 }}
                  whileHover={{ x: 3 }}
                  style={{ cursor: "pointer" }}
                >
                  <motion.span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ background: "linear-gradient(90deg, rgba(122,87,219,0.14) 0%, transparent 80%)" }}
                  />
                  {/* left accent bar */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ background: "linear-gradient(to bottom, #7a57db, #ca2f8c)" }} />
                  <span className="relative z-10 text-lavender/50 group-hover:text-lavender transition-colors duration-150">{icon}</span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-150 font-medium">{label}</span>
                  <svg viewBox="0 0 24 24" fill="none" className="relative z-10 w-2.5 h-2.5 ml-auto text-transparent group-hover:text-lavender/50 transition-colors duration-150" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </motion.a>
              ))}
              <div className="h-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
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

          {/* Desktop nav */}
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

            {/* Résumé with animated dropdown */}
            <ResumeDropdown />
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
