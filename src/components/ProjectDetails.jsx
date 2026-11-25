import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  extraLinks,
  noLink,
  closeModal,
}) => {
  useEffect(() => {
    // Lock page scroll on <html>: with html overflow-x set in CSS, body's
    // overflow no longer applies to the page viewport.
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [closeModal]);

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
          className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl overflow-y-auto roomy:overflow-hidden border border-white/8 shadow-2xl [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lavender/30"
          style={{ background: "linear-gradient(160deg, #161a31 0%, #06091f 100%)" }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header: image, with the title overlaid on roomy screens and stacked below it on phones */}
          <div className="relative shrink-0">
          <div className="relative w-full aspect-video roomy:aspect-[16/7] short:aspect-auto short:h-28 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06091f] via-[#06091f]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06091f]/40 to-transparent" />
          </div>

            {/* Title: below the image on phones, over it on roomy screens */}
            <div className="px-6 pt-1 roomy:absolute roomy:bottom-0 roomy:left-0 roomy:p-6">
              <motion.h3
                className="text-xl sm:text-2xl roomy:text-3xl font-bold text-white leading-tight"
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
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              <img src="assets/close.svg" className="w-4 h-4 opacity-70" alt="close" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="p-6 space-y-6 roomy:flex-1 roomy:min-h-0 roomy:overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lavender/30">

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
            <div className="pt-5 border-t border-white/8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 min-w-0">
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
              <div className="flex items-center gap-2.5 shrink-0">
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold text-lavender/90 border border-lavender/30 bg-lavender/8 hover:bg-lavender/15 hover:border-lavender/50 hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: "0 0 18px rgba(122,87,219,0.15)" }}
                  >
                    View Project
                    <img src="assets/arrow-up.svg" className="w-3.5 h-3.5 opacity-70" alt="" />
                  </a>
                )}
                {extraLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold text-lavender/90 border border-lavender/30 bg-lavender/8 hover:bg-lavender/15 hover:border-lavender/50 hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: "0 0 18px rgba(122,87,219,0.15)" }}
                  >
                    {link.title || link.label}
                    <img src="assets/arrow-up.svg" className="w-3.5 h-3.5 opacity-70" alt="" />
                  </a>
                ))}
                {!href && !extraLinks?.length && !noLink && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-lavender/60 border border-dashed border-lavender/25 rounded-full bg-lavender/5">
                    Under NDA · Not publicly available
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
