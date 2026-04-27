import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 12, stiffness: 60 });
  const springY = useSpring(y, { damping: 12, stiffness: 60 });
  const [preview, setPreview] = useState(null);

  const handleMouseMove = (e) => {
    x.set(e.clientX + 24);
    y.set(e.clientY + 24);
  };

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      {/* Header */}
      <div className="flex items-end gap-4 mb-12">
        <h2 className="text-heading">Selected Projects</h2>
        <span className="mb-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-lavender/10 border border-lavender/20 text-lavender/70 tracking-widest">
          {myProjects.length} WORKS
        </span>
      </div>

      {/* Divider */}
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px w-full" />

      {/* Project list */}
      {myProjects.map((project, index) => (
        <Project
          key={project.id}
          index={index}
          {...project}
          setPreview={setPreview}
        />
      ))}

      {/* Cursor preview */}
      {preview && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none overflow-hidden rounded-xl shadow-2xl"
          style={{ x: springX, y: springY, width: 320, height: 200 }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={preview}
            className="w-full h-full object-cover"
            alt="preview"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
