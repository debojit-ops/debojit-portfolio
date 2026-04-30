import { motion, AnimatePresence } from "motion/react";
const Alert = ({ type, text }) => {
  const isError = type === "danger";
  return (
    <AnimatePresence>
      <motion.div
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{
          background: isError
            ? "rgba(239,68,68,0.12)"
            : "rgba(122,87,219,0.12)",
          border: isError
            ? "1px solid rgba(239,68,68,0.5)"
            : "1px solid rgba(122,87,219,0.5)",
          boxShadow: isError
            ? "0 0 20px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 0 20px rgba(122,87,219,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon */}
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: isError ? "rgba(239,68,68,0.15)" : "rgba(122,87,219,0.15)",
            border: isError ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(122,87,219,0.3)",
          }}
        >
          {isError ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="#ef4444" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="#a78bfa" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-0.5"
            style={{ color: isError ? "rgba(239,68,68,0.9)" : "rgba(167,139,250,0.9)" }}>
            {isError ? "Error" : "Success"}
          </p>
          <p className="text-xs text-neutral-400">{text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
