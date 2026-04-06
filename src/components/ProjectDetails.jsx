import { useEffect } from "react";
import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="relative w-[95vw] max-w-4xl max-h-[90vh] flex flex-col border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500 z-10"
        >
          <img src="assets/close.svg" className="w-6 h-6" />
        </button>

        {/* Image with title overlay */}
        <div className="relative shrink-0">
          <img src={image} alt={title} className="w-full rounded-t-2xl object-cover h-80 md:h-96" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent rounded-t-2xl" />
          <h5 className="absolute bottom-4 left-5 text-2xl font-bold text-white drop-shadow-lg">{title}</h5>
        </div>

        {/* Scrollable content */}
        <div className="p-5 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-lavender [&::-webkit-scrollbar-thumb]:to-royal">

          {/* Bullet points */}
          <div className="space-y-3 mb-5">
            {subDescription.map((subDesc, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lavender shrink-0" />
                <p className="font-normal text-neutral-300 leading-relaxed">{subDesc}</p>
              </div>
            ))}
          </div>

          {/* Tags + link */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300"
                >
                  {tag.path && <img src={tag.path} alt={tag.name} className="w-4 h-4 rounded-sm" />}
                  {tag.name}
                </div>
              ))}
            </div>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation shrink-0 ml-3"
              >
                View Project{" "}
                <img src="assets/arrow-up.svg" className="size-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-lavender border border-dashed border-lavender/40 rounded-full bg-lavender/5 shrink-0 ml-3">
                Project under NDA · Not publicly displayable
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
