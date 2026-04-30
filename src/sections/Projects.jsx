import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Particles } from "../components/Particles";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 12, stiffness: 60 });
  const springY = useSpring(y, { damping: 12, stiffness: 60 });
  const [preview, setPreview] = useState(null);
  const [activeTitle, setActiveTitle] = useState("");

  const handleMouseMove = (e) => {
    x.set(e.clientX + 24);
    y.set(e.clientY + 24);
  };

  const handlePreview = (image, title) => {
    setPreview(image);
    setActiveTitle(title);
  };

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <Particles className="absolute inset-0 -z-10" quantity={120} ease={80} color="#ffffff" refresh />
      {/* Header */}
      <div className="flex items-end gap-4 mb-3">
        <h2 className="text-heading">Selected Projects</h2>
        <span className="mb-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-lavender/10 border border-lavender/20 text-lavender/70 tracking-widest">
          {myProjects.length} WORKS
        </span>
      </div>

      {/* Subheading */}
      <p className="text-sm text-neutral-500 mb-10 max-w-lg">
        A collection of XR, AI, and full-stack builds — click any project to explore details.
      </p>

      {/* Top divider */}
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px w-full" />

      {/* Project list */}
      {myProjects.map((project, index) => (
        <Project
          key={project.id}
          index={index}
          {...project}
          setPreview={(img) => handlePreview(img, project.title)}
        />
      ))}

      {/* Cursor preview */}
      {preview && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none overflow-hidden rounded-xl shadow-2xl border border-white/8"
          style={{ x: springX, y: springY, width: 300, height: 190 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={preview}
            className="w-full h-full object-cover"
            alt="preview"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Title caption */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
            <p className="text-xs font-medium text-white/90 leading-snug line-clamp-1">
              {activeTitle}
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
