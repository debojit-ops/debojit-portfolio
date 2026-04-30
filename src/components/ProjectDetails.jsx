import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  noLink,
  closeModal,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ backgroundColor: "rgba(3,4,18,0.65)", backdropFilter: "blur(10px)" }}
        onClick={closeModal}
      >
        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden border border-white/8 shadow-2xl"
          style={{ background: "linear-gradient(160deg, #161a31 0%, #06091f 100%)" }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image — fixed aspect ratio */}
          <div className="relative shrink-0 w-full aspect-[16/7] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06091f] via-[#06091f]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06091f]/40 to-transparent" />

            {/* Title over image */}
            <div className="absolute bottom-0 left-0 p-6">
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {title}
              </motion.h3>
              {description && (
                <motion.p
                  className="mt-1.5 text-sm text-neutral-400 max-w-lg"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.4 }}
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              <img src="assets/close.svg" className="w-4 h-4 opacity-70" alt="close" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lavender/30">

            {/* Bullet points */}
            <ul className="space-y-3">
              {subDescription.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                >
                  <motion.span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-lavender shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.25, ease: "backOut" }}
                  />
                  <p className="text-sm text-neutral-300 leading-relaxed">{point}</p>
                </motion.li>
              ))}
            </ul>

            {/* Footer: tags + link */}
            <div className="pt-5 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-neutral-400"
                  >
                    {tag.path && (
                      <img src={tag.path} alt={tag.name} className="w-3.5 h-3.5 rounded-sm object-contain" />
                    )}
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-lavender/90 border border-lavender/30 bg-lavender/8 hover:bg-lavender/15 hover:border-lavender/50 hover:-translate-y-0.5 transition-all duration-200"
                  style={{ boxShadow: "0 0 18px rgba(122,87,219,0.15)" }}
                >
                  View Project
                  <img src="assets/arrow-up.svg" className="w-3.5 h-3.5 opacity-70" alt="" />
                </a>
              ) : noLink ? null : (
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-lavender/60 border border-dashed border-lavender/25 rounded-full bg-lavender/5">
                  Under NDA · Not publicly available
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
