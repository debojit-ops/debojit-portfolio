import { useState } from "react";
import { motion } from "motion/react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  index,
  title,
  description,
  subDescription,
  href,
  noLink,
  image,
  tags,
  setPreview,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="group relative cursor-pointer my-2"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Card border + bg */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent opacity-100 group-hover:border-lavender/20 group-hover:from-lavender/[0.04] transition-all duration-300 pointer-events-none"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
        />
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "0 0 30px rgba(122,87,219,0.08)" }}
        />

        <div className="relative flex items-center justify-between gap-6 px-5 py-6">
          {/* Left: index + title + tags */}
          <div className="flex items-start gap-5 min-w-0">
            {/* Index */}
            <div className="shrink-0 flex flex-col items-center self-stretch pt-1">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full border border-neutral-800 group-hover:border-lavender/40 bg-white/[0.02] group-hover:bg-lavender/8 transition-all duration-300">
                <span className="text-[10px] font-mono font-semibold text-neutral-600 group-hover:text-lavender/80 transition-colors duration-300 leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 w-px mt-1.5 bg-gradient-to-b from-neutral-800 via-neutral-800/40 to-transparent group-hover:from-lavender/30 group-hover:via-lavender/10 transition-colors duration-300" />
            </div>

            {/* Title + tags */}
            <div className="min-w-0">
              <p className="text-lg font-semibold text-neutral-200 group-hover:text-white transition-colors duration-300 leading-snug">
                {title}
              </p>
              {description && (
                <p className="mt-1 text-sm text-neutral-600 line-clamp-1 group-hover:text-neutral-400 transition-colors duration-300">
                  {description}
                </p>
              )}
              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] bg-white/[0.04] border border-white/[0.07] text-neutral-500 group-hover:border-lavender/15 group-hover:text-neutral-400 transition-all duration-300"
                  >
                    {tag.path && (
                      <img
                        src={tag.path}
                        alt={tag.name}
                        className="w-3 h-3 rounded-sm object-contain opacity-70"
                      />
                    )}
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: open button */}
          <div className="shrink-0">
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] group-hover:border-lavender/25 group-hover:bg-lavender/[0.07] transition-all duration-300"
              whileHover={{ scale: 1.04 }}
            >
              <span className="hidden sm:block text-[11px] tracking-widest uppercase text-neutral-600 group-hover:text-lavender/70 transition-colors duration-300">
                Open
              </span>
              <img
                src="assets/arrow-right.svg"
                className="w-3.5 h-3.5 opacity-25 group-hover:opacity-80 transition-opacity duration-300"
                alt="open"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/60 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-lavender/20 to-transparent"
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.06 + 0.3, ease: "easeInOut" }}
        />
      </div>

      {isOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          noLink={noLink}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Project;
