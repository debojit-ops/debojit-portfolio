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
        className="group relative py-7 cursor-pointer"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Hover background */}
        <div className="absolute inset-0 -mx-4 rounded-xl bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative flex items-center justify-between gap-6">
          {/* Left: index + title + tags */}
          <div className="flex items-start gap-6 min-w-0">
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
              <p className="text-xl font-semibold text-neutral-200 group-hover:text-white transition-colors duration-300 leading-snug">
                {title}
              </p>
              {description && (
                <p className="mt-1 text-sm text-neutral-500 line-clamp-1 group-hover:text-neutral-400 transition-colors duration-300">
                  {description}
                </p>
              )}
              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/8 text-neutral-400 group-hover:border-lavender/20 group-hover:text-neutral-300 transition-all duration-300"
                  >
                    {tag.path && (
                      <img
                        src={tag.path}
                        alt={tag.name}
                        className="w-3.5 h-3.5 rounded-sm object-contain"
                      />
                    )}
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: arrow */}
          <div className="shrink-0 flex items-center gap-2 text-sm text-neutral-600 group-hover:text-lavender transition-colors duration-300">
            <span className="hidden sm:block text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View
            </span>
            <motion.div
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-lavender/40 group-hover:bg-lavender/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src="assets/arrow-right.svg"
                className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                alt="open"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-lavender/30 to-transparent"
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
