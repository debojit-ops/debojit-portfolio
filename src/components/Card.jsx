import { motion } from "motion/react";

// Drag only with a real mouse/trackpad. On touch screens a draggable chip
// (touch-action: none) swallows the swipe, so the page would not scroll.
const canDrag =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const Card = ({ style, text, image, containerRef }) => {
  const dragProps = canDrag
    ? { drag: true, dragConstraints: containerRef, dragElastic: 1 }
    : {};

  return image && !text ? (
    <motion.img
      className={`absolute w-15 ${canDrag ? "cursor-grab" : ""}`}
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      {...dragProps}
    />
  ) : (
    <motion.div
      className={`absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] ${canDrag ? "cursor-grab" : ""}`}
      style={style}
      whileHover={{ scale: 1.05 }}
      {...dragProps}
    >
      {text}
    </motion.div>
  );
};

export default Card;
