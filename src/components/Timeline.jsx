import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const icons = {
  "XR Developer": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  "Agentic AI Developer": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  "Quantum Computing": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  "Full-Stack Web Developer": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
};

const CARD_THEMES = [
  {
    border: "rgba(122,87,219,0.5)",
    borderHover: "rgba(122,87,219,0.9)",
    glow: "rgba(122,87,219,0.15)",
    glowHover: "rgba(122,87,219,0.28)",
    iconBg: "rgba(122,87,219,0.15)",
    iconColor: "#a78bfa",
    dot: "#7a57db",
    badge: "rgba(122,87,219,0.12)",
    badgeText: "#a78bfa",
    badgeBorder: "rgba(122,87,219,0.35)",
    shadow: "0 0 40px rgba(122,87,219,0.15)",
    shadowHover: "0 0 60px rgba(122,87,219,0.3)",
  },
  {
    border: "rgba(202,47,140,0.45)",
    borderHover: "rgba(202,47,140,0.85)",
    glow: "rgba(202,47,140,0.12)",
    glowHover: "rgba(202,47,140,0.24)",
    iconBg: "rgba(202,47,140,0.15)",
    iconColor: "#f472b6",
    dot: "#ca2f8c",
    badge: "rgba(202,47,140,0.12)",
    badgeText: "#f472b6",
    badgeBorder: "rgba(202,47,140,0.35)",
    shadow: "0 0 40px rgba(202,47,140,0.12)",
    shadowHover: "0 0 60px rgba(202,47,140,0.25)",
  },
  {
    border: "rgba(51,194,204,0.4)",
    borderHover: "rgba(51,194,204,0.8)",
    glow: "rgba(51,194,204,0.10)",
    glowHover: "rgba(51,194,204,0.22)",
    iconBg: "rgba(51,194,204,0.15)",
    iconColor: "#5eead4",
    dot: "#33c2cc",
    badge: "rgba(51,194,204,0.12)",
    badgeText: "#5eead4",
    badgeBorder: "rgba(51,194,204,0.35)",
    shadow: "0 0 40px rgba(51,194,204,0.10)",
    shadowHover: "0 0 60px rgba(51,194,204,0.22)",
  },
  {
    border: "rgba(92,51,204,0.45)",
    borderHover: "rgba(92,51,204,0.85)",
    glow: "rgba(92,51,204,0.12)",
    glowHover: "rgba(92,51,204,0.25)",
    iconBg: "rgba(92,51,204,0.18)",
    iconColor: "#818cf8",
    dot: "#5c33cc",
    badge: "rgba(92,51,204,0.12)",
    badgeText: "#818cf8",
    badgeBorder: "rgba(92,51,204,0.35)",
    shadow: "0 0 40px rgba(92,51,204,0.12)",
    shadowHover: "0 0 60px rgba(92,51,204,0.25)",
  },
];

const BentoCard = ({ item, index, featured = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 55%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const t = CARD_THEMES[index % CARD_THEMES.length];

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 h-full"
    >
      {/* Glowing border via box-shadow + border */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none z-20"
        style={{
          border: `1px solid ${t.border}`,
          boxShadow: t.shadow,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20"
        style={{
          border: `1px solid ${t.borderHover}`,
          boxShadow: t.shadowHover,
        }}
      />

      {/* Card background */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at 10% 10%, ${t.glow} 0%, transparent 65%), linear-gradient(160deg, #161a31 0%, #06091f 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at 10% 10%, ${t.glowHover} 0%, transparent 65%)`,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 p-6 flex flex-col h-full ${featured ? "gap-5" : "gap-4"}`}>

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
            style={{
              background: t.iconBg,
              border: `1px solid ${t.border}`,
              color: t.iconColor,
              boxShadow: `0 0 16px ${t.glow}`,
            }}
          >
            {icons[item.title]}
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all duration-300"
            style={{
              background: t.badge,
              border: `1px solid ${t.badgeBorder}`,
              color: t.badgeText,
            }}
          >
            {item.date}
          </span>
        </div>

        {/* Title + subtitle */}
        <div>
          <h3
            className={`font-bold text-white leading-snug mb-1 transition-colors duration-300 ${featured ? "text-xl" : "text-base"}`}
          >
            {item.title}
          </h3>
          <p className="text-xs transition-colors duration-300" style={{ color: t.iconColor, opacity: 0.7 }}>
            {item.job}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full transition-all duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${t.border}, transparent)` }}
        />

        {/* Bullets */}
        <ul className="space-y-2 flex-1">
          {(featured ? item.contents : item.contents.slice(0, 3)).map((content, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: t.dot, boxShadow: `0 0 6px ${t.glow}` }}
              />
              <p className="text-xs text-neutral-400 group-hover:text-neutral-300 leading-relaxed transition-colors duration-300">
                {content}
              </p>
            </li>
          ))}
          {!featured && item.contents.length > 3 && (
            <li className="text-[10px] pl-4 transition-colors duration-300" style={{ color: t.badgeText, opacity: 0.5 }}>
              +{item.contents.length - 3} more
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export const Timeline = ({ data }) => (
  <section className="c-space section-spacing" id="academics">

    {/* Header */}
    <div className="flex items-end gap-4 mb-3">
      <h2 className="text-heading">Academic Journey</h2>
      <span className="mb-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-lavender/10 border border-lavender/20 text-lavender/70 tracking-widest">
        EXPERTISE
      </span>
    </div>
    <p className="text-sm text-neutral-500 mb-12 max-w-lg">
      Areas of focus spanning immersive tech, intelligent systems, and modern web development.
    </p>

    {/* Bento grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <BentoCard item={data[0]} index={0} featured />
      </div>
      <div className="md:col-span-1">
        <BentoCard item={data[1]} index={1} />
      </div>
      <div className="md:col-span-1">
        <BentoCard item={data[2]} index={2} />
      </div>
      <div className="md:col-span-2">
        <BentoCard item={data[3]} index={3} featured />
      </div>
    </div>
  </section>
);
