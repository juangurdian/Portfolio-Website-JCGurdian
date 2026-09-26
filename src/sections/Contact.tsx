"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiEnvelope, HiMapPin, HiDocumentText } from "react-icons/hi2";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Juan Gurdian",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="section-header">Get in Touch</span>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="text-stone-400 mt-4 max-w-lg">
            Open to Tampa hybrid/onsite and US remote AI engineering roles where I can own systems end to end.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-elevated border border-surface-border rounded-lg px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-stone-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-elevated border border-surface-border rounded-lg px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-stone-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-surface-elevated border border-surface-border rounded-lg px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none placeholder:text-stone-600"
                  placeholder="Tell me about the role or project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  status === "sending"
                    ? "bg-accent/20 text-accent/50 cursor-wait"
                    : status === "success"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : status === "error"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-accent text-stone-950 hover:bg-accent-light"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Message Sent!"
                    : status === "error"
                      ? "Failed. Try Again"
                      : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card p-6 md:p-8">
              <h3 className="text-lg font-serif font-semibold text-stone-100 mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <HiEnvelope className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                      Email
                    </p>
                    <a
                      href="mailto:juangurdian2003@gmail.com"
                      className="text-stone-100 hover:text-accent transition-colors text-sm"
                    >
                      juangurdian2003@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <HiMapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                      Location
                    </p>
                    <span className="text-stone-100 text-sm">Tampa, FL</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <HiDocumentText className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                      Resume
                    </p>
                    <a
                      href="/resume.pdf"
                      className="text-stone-100 hover:text-accent transition-colors text-sm"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-6 pt-6 border-t border-surface-border">
                <p className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-3">
                  Connect
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://linkedin.com/in/juan-gurdian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-stone-400 hover:text-accent hover:border-accent/30 transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-base" />
                  </a>
                  <a
                    href="https://github.com/juangurdian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-stone-400 hover:text-accent hover:border-accent/30 transition-all"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-base" />
                  </a>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <h3 className="text-lg font-serif font-semibold text-stone-100">
                  Available for new roles
                </h3>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                Looking for early/mid AI Engineer roles in Tampa (hybrid/onsite) or US remote 
                where I can own systems end to end.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
