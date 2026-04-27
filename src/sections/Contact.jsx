import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { mySocials } from "../constants";

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/8 text-neutral-200 placeholder-neutral-600 outline-none focus:border-lavender/40 focus:bg-white/8 transition-all duration-200";

const EMAIL_DOMAINS = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];

const EmailInput = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleChange = (e) => {
    onChange(e);
    setActiveIndex(-1);
    const val = e.target.value;
    const atIndex = val.indexOf("@");
    if (atIndex !== -1) {
      const afterAt = val.slice(atIndex + 1).toLowerCase();
      setSuggestions(
        EMAIL_DOMAINS
          .filter((d) => d.startsWith(afterAt) && d !== afterAt)
          .map((d) => val.slice(0, atIndex + 1) + d)
      );
    } else {
      setSuggestions([]);
    }
  };

  const handlePick = (full) => {
    onChange({ target: { name: "email", value: full } });
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handlePick(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative">
      <input
        id="email" name="email" type="email" className={inputClass}
        placeholder="you@email.com" autoComplete="off"
        value={value} onChange={handleChange} onKeyDown={handleKeyDown} required
      />
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            className="absolute z-50 left-0 right-0 mt-1.5 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #161a31 0%, #0a0d20 100%)",
              border: "1px solid rgba(122,87,219,0.2)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(122,87,219,0.06)",
            }}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-3 pt-2 pb-1 border-b border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-neutral-700">Quick fill</span>
            </div>
            {suggestions.map((full, i) => {
              const domain = full.split("@")[1];
              const user = full.split("@")[0];
              const isActive = i === activeIndex;
              return (
                <li
                  key={full}
                  onMouseDown={(e) => { e.preventDefault(); handlePick(full); }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-100 last:rounded-b-xl"
                  style={{ background: isActive ? "rgba(122,87,219,0.1)" : "transparent" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all duration-100"
                    style={{
                      background: isActive ? "rgba(122,87,219,0.2)" : "rgba(255,255,255,0.04)",
                      color: isActive ? "#7a57db" : "#4a4a6a",
                      border: isActive ? "1px solid rgba(122,87,219,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {domain[0].toUpperCase()}
                  </div>
                  <span className="text-sm flex-1">
                    <span className="text-neutral-700">{user}@</span>
                    <span style={{ color: isActive ? "#a78bfa" : "#52526e" }}>{domain}</span>
                  </span>
                  {isActive && (
                    <kbd className="text-[10px] text-lavender/50 border border-lavender/20 rounded px-1.5 py-0.5 font-mono shrink-0">↵</kbd>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "message" && value.length === 1) value = value.toUpperCase();
    setFormData({ ...formData, [name]: value });
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "portfolio_upload");
    data.append("cloud_name", "dabqie86p");
    const res = await fetch("https://api.cloudinary.com/v1_1/dabqie86p/auto/upload", {
      method: "POST", body: data,
    });
    return (await res.json()).secure_url;
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fileUrl = file ? await uploadToCloudinary(file) : "No attachment";
      await emailjs.send(
        "service_8xpwu0b", "template_94s3ic2",
        {
          from_name: formData.name,
          to_name: "Debojit",
          from_email: formData.email,
          reply_to: formData.email,
          to_email: "debojitghosh223@gmail.com",
          message: `${formData.message}\n\nAttachment: ${fileUrl}`,
        },
        "arL-vIrp-Dx0nOAA0"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      setFile(null);
      e.target.reset();
      showAlertMessage("success", "Your message has been sent!");
    } catch {
      setIsLoading(false);
      showAlertMessage("danger", "Something went wrong!");
    }
  };

  return (
    <section id="contact" className="relative c-space mt-20 md:mt-30 pb-10">
      <Particles className="absolute inset-0 -z-50" quantity={80} ease={80} color="#ffffff" refresh />
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      {/* Header */}
      <div className="flex items-end gap-4 mb-12">
        <h2 className="text-heading">Get In Touch</h2>
        <span className="mb-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-lavender/10 border border-lavender/20 text-lavender/70 tracking-widest">
          CONTACT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl">

        {/* Left info panel */}
        <motion.div
          className="lg:col-span-2 flex flex-col gap-8"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-2xl font-semibold text-white leading-snug mb-3">
              Let's build something<br />
              <span style={{
                background: "linear-gradient(90deg, #7a57db, #ca2f8c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>immersive together.</span>
            </p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Whether it's an XR experience, an AI system, or a full-stack product — I'm open to collaborations, freelance work, and full-time opportunities.
            </p>
          </div>

          {/* Info items */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
                label: "Email",
                value: "debojitghosh223@gmail.com",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
                label: "Location",
                value: "India · Open to Remote",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg border border-lavender/20 bg-lavender/5 flex items-center justify-center text-lavender/70 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-0.5">{label}</p>
                  <p className="text-sm text-neutral-300">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs text-neutral-600 mb-3 uppercase tracking-widest">Find me on</p>
            <div className="flex gap-3">
              {mySocials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-white/8 bg-white/5 flex items-center justify-center hover:border-lavender/30 hover:bg-lavender/10 transition-all duration-200"
                >
                  <img src={s.icon} alt={s.name} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="rounded-2xl border border-white/8 p-6 md:p-8"
            style={{ background: "linear-gradient(160deg, #161a31 0%, #06091f 100%)" }}
          >
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-neutral-500 uppercase tracking-widest">Full Name</label>
                  <input
                    id="name"
                    name="name" type="text" className={`${inputClass} capitalize`}
                    placeholder="Your Name" autoComplete="name"
                    value={formData.name} onChange={handleChange} required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-neutral-500 uppercase tracking-widest">Email</label>
                  <EmailInput value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-neutral-500 uppercase tracking-widest">Message</label>
                <textarea
                  name="message" rows="5" className={inputClass}
                  placeholder="Tell me about your project or idea..."
                  value={formData.message} onChange={handleChange} required
                />
              </div>

              {/* Attachment */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-neutral-500 uppercase tracking-widest">
                  Attachment <span className="normal-case text-neutral-700">(optional)</span>
                </label>
                <label
                  htmlFor="attachment"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-white/10 bg-white/3 hover:border-lavender/30 hover:bg-lavender/5 transition-all duration-200 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-neutral-500 shrink-0" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
                  <span className="text-sm text-neutral-500 truncate">
                    {file ? file.name : "Click to attach a file"}
                  </span>
                </label>
                <input id="attachment" name="attachment" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-royal to-lavender hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-lavender/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
