import emailjs from "@emailjs/browser";
import { useState } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "portfolio_upload");
    data.append("cloud_name", "dabqie86p");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dabqie86p/auto/upload",
      { method: "POST", body: data }
    );
    const result = await response.json();
    return result.secure_url;
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
      let fileUrl = "No attachment";

      if (file) {
        fileUrl = await uploadToCloudinary(file);
      }

      await emailjs.send(
        "service_8xpwu0b",
        "template_94s3ic2",
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
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Something went wrong!");
    }
  };

  return (
    <section id="contact" className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            From modern web applications to immersive XR experiences, I transform ideas into engaging, real-world digital products.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="Your Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="yourname@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="attachment" className="feild-label">Attachment <span className="text-neutral-500 text-xs">(optional, any format, max 100MB)</span></label>
            <label htmlFor="attachment" className="flex items-center gap-3 w-full min-h-10 rounded-md px-3 py-2 text-sm bg-white/10 border border-white/10 mt-2 cursor-pointer hover:bg-white/15 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="text-neutral-400 truncate">
                {file ? file.name : "Click to attach a file"}
              </span>
            </label>
            <input
              id="attachment"
              name="attachment"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
