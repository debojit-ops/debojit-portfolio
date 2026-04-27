import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const icons = {
  "XR Developer": (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  "Agentic AI Developer": (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  "Quantum Computing": (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  "Full-Stack Web Developer": (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
};

const cardColors = [
  { border: "border-lavender/20", glow: "rgba(122,87,219,0.08)", dot: "bg-lavender", badge: "bg-lavender/10 text-lavender/80 border-lavender/20" },
  { border: "border-aqua/20",     glow: "rgba(51,194,204,0.08)",  dot: "bg-aqua",     badge: "bg-aqua/10 text-aqua/80 border-aqua/20" },
  { border: "border-fuchsia/20",  glow: "rgba(202,47,140,0.08)", dot: "bg-fuchsia",  badge: "bg-fuchsia/10 text-fuchsia/80 border-fuchsia/20" },
  { border: "border-royal/20",    glow: "rgba(92,51,204,0.08)",  dot: "bg-royal",    badge: "bg-royal/10 text-lavender/80 border-royal/20" },
];

export const Timeline = ({ data }) => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (lineRef.current) setLineHeight(lineRef.current.getBoundingClientRect().height);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const fillOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section className="c-space section-spacing" ref={containerRef} id="academics">
      {/* Header */}
      <div className="flex items-end gap-4 mb-16">
        <h2 className="text-heading">Academic Journey</h2>
        <span className="mb-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-lavender/10 border border-lavender/20 text-lavender/70 tracking-widest">
          EXPERTISE
        </span>
      </div>

      <div className="relative" ref={lineRef}>
        {/* Track line */}
        <div className="absolute top-0 bottom-0 w-px bg-neutral-800/60" style={{ left: 13 }} />

        {/* Scroll-driven fill */}
        <div className="absolute top-0 bottom-0 overflow-hidden" style={{ left: 13, width: 1 }}>
          <motion.div
            className="absolute inset-x-0 top-0 w-full"
            style={{
              height: fillHeight,
              opacity: fillOpacity,
              background: "linear-gradient(to bottom, #7a57db, #5c33cc, #ca2f8c)",
              boxShadow: "0 0 8px rgba(122,87,219,0.8)",
            }}
          />
        </div>

        <div className="space-y-6">
          {data.map((item, index) => {
            const color = cardColors[index % cardColors.length];
            return (
              <motion.div
                key={index}
                className="relative flex gap-8 md:gap-12"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Timeline dot */}
                <div className="shrink-0 flex flex-col items-center" style={{ width: 28 }}>
                  <div
                    className={`relative z-10 mt-7 w-3.5 h-3.5 rounded-full ${color.dot} ring-[3px] ring-primary`}
                    style={{ boxShadow: `0 0 10px ${color.glow.replace("0.08", "0.9")}, 0 0 20px ${color.glow.replace("0.08", "0.4")}` }}
                  />
                </div>

                {/* Card */}
                <div
                  className={`flex-1 mb-2 rounded-2xl border ${color.border} p-6 transition-all duration-300 hover:-translate-y-0.5`}
                  style={{
                    background: `radial-gradient(ellipse at 0% 0%, ${color.glow} 0%, transparent 60%), linear-gradient(160deg, #161a31 0%, #06091f 100%)`,
                  }}
                >
                  {/* Card header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Icon badge */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg border ${color.border} text-neutral-400`}
                        style={{ background: color.glow }}
                      >
                        {icons[item.title] ?? (
                          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-neutral-100 leading-tight">{item.title}</p>
                        <p className="text-sm text-neutral-500 mt-0.5">{item.job}</p>
                      </div>
                    </div>

                    {/* Date badge */}
                    <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-mono border ${color.badge}`}>
                      {item.date}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-4 bg-gradient-to-r from-transparent ${color.border.replace("border-", "via-")} to-transparent`} />

                  {/* Content bullets */}
                  <ul className="space-y-2.5">
                    {item.contents.map((content, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${color.dot}`} />
                        <p className="text-sm text-neutral-400 leading-relaxed">{content}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
