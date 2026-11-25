import { motion } from "motion/react";
import { mySocials } from "../constants";

const DISCIPLINES = [
  "XR Development",
  "Agentic AI",
  "Unity",
  "AR Foundation",
  "Full-Stack",
  "Spatial Computing",
];

const linkedIn = mySocials.find((s) => s.name.toLowerCase() === "linkedin")?.href;

const NAV = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
  ...(linkedIn ? [{ label: "LinkedIn", href: linkedIn, external: true }] : []),
];

const scrollToSection = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
});

// Underline that grows on hover
const linkClass =
  "bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-position:0_100%] [background-size:0_1px] [a:hover_&]:[background-size:100%_1px] pb-0.5 transition-[background-size] duration-300";

const Footer = () => (
  <footer className="relative bg-primary font-syne">
    {/* Ticker of disciplines (decorative) */}
    <div className="overflow-hidden border-y border-white/[0.07] py-3.5" aria-hidden="true">
      <div className="footer-ticker flex w-max">
        {[...DISCIPLINES, ...DISCIPLINES].map((d, i) => (
          <span
            key={i}
            className="whitespace-nowrap pr-[2.4em] text-xs font-semibold uppercase tracking-[0.24em] text-[#5f6479]"
          >
            {d}
          </span>
        ))}
      </div>
    </div>

    <div className="mx-auto max-w-7xl c-space">
      {/* Name + nav */}
      <div className="flex flex-wrap items-end justify-between gap-6 pt-10 pb-6 md:pt-14">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="m-0 text-[clamp(2rem,5.6vw,4rem)] font-bold leading-none tracking-[-0.02em] text-[#eceef3]"
          >
            Debojit Ghosh
          </motion.p>
          <motion.p {...fadeUp(0.12)} className="mt-2.5 text-sm font-medium text-[#7d8296]">
            XR Developer · Wavelaps
          </motion.p>
        </div>

        <motion.nav {...fadeUp(0.24)} className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {NAV.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : { onClick: (e) => scrollToSection(e, href) })}
              className="py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a9eb1] transition-colors hover:text-white"
            >
              <span className={linkClass}>{label}</span>
            </a>
          ))}
        </motion.nav>
      </div>

      {/* Base row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-7 text-xs text-[#555a6d]">
        <span>© {new Date().getFullYear()} Debojit Ghosh. All rights reserved.</span>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="py-2 transition-colors hover:text-white"
        >
          <span className={linkClass}>Back to top ↑</span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
