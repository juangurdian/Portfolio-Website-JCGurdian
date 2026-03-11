"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
          to_name: "JC Gurdian",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-neural-primary tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            Let&apos;s Build Something
          </h2>
          <p className="text-white/40 mt-3 max-w-lg">
            Have a project in mind? Let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono text-white/40 tracking-wider uppercase mb-2"
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
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neural-primary/50 transition-colors placeholder:text-white/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono text-white/40 tracking-wider uppercase mb-2"
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
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neural-primary/50 transition-colors placeholder:text-white/20"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-white/40 tracking-wider uppercase mb-2"
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
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neural-primary/50 transition-colors resize-none placeholder:text-white/20"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  status === "sending"
                    ? "bg-neural-primary/20 text-neural-primary/50 cursor-wait"
                    : status === "success"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : status === "error"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-neural-primary/10 text-neural-primary border border-neural-primary/30 hover:bg-neural-primary/20"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Message Sent!"
                    : status === "error"
                      ? "Failed — Try Again"
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
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neural-primary/10 border border-neural-primary/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-neural-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/30 tracking-wider uppercase">
                      Email
                    </p>
                    <a
                      href="mailto:juangurdian2003@gmail.com"
                      className="text-white hover:text-neural-primary transition-colors text-sm"
                    >
                      juangurdian2003@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neural-primary/10 border border-neural-primary/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-neural-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/30 tracking-wider uppercase">
                      Location
                    </p>
                    <span className="text-white text-sm">Nicaragua</span>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <p className="text-xs font-mono text-white/30 tracking-wider uppercase mb-3">
                  Social
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      icon: FaLinkedin,
                      href: "https://linkedin.com/in/juan-gurdian",
                      label: "LinkedIn",
                    },
                    {
                      icon: FaGithub,
                      href: "https://github.com/juangurdian",
                      label: "GitHub",
                    },
                    {
                      icon: FaInstagram,
                      href: "https://www.instagram.com/jcgurdian03/",
                      label: "Instagram",
                    },
                    {
                      icon: FaXTwitter,
                      href: "https://x.com",
                      label: "X",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-neural-primary hover:border-neural-primary/20 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="text-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Available for new projects
                </h3>
              </div>
              <p className="text-white/40 text-sm">
                I&apos;m currently open to new opportunities and collaborations — especially
                AI-powered projects and Latin American businesses. Let&apos;s build something
                together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
