import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import grainImage from "@/assets/images/grain.jpg";
import { motion } from "framer-motion";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          title="Get in Touch"
          eyebrow="Contact"
          description="Let&apos;s discuss your next project or just say hello!"
        />

        <div className="mt-12 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 -z-10" style={{
              backgroundImage: `url(${grainImage.src})`,
            }}></div>
            <h3 className="text-white text-2xl font-serif mb-6">Send me a message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/60 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-300/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-300/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/60 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-300/50 transition-colors resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </Card>

          <div className="space-y-8">
            <Card className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 -z-10" style={{
                backgroundImage: `url(${grainImage.src})`,
              }}></div>
              <h3 className="text-white text-2xl font-serif mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full flex items-center justify-center">
                    <svg className="size-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60">Email</p>
                    <a href="mailto:juangurdian2003@gmail.com" className="text-white hover:text-emerald-300 transition-colors">juangurdian2003@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full flex items-center justify-center">
                    <svg className="size-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60">Social Media</p>
                    <div className="flex gap-4 mt-1">
                      <a href="https://linkedin.com/in/juan-gurdian" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-300 transition-colors">LinkedIn</a>
                      <a href="https://github.com/juangurdian" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-300 transition-colors">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 -z-10" style={{
                backgroundImage: `url(${grainImage.src})`,
              }}></div>
              <h3 className="text-white text-2xl font-serif mb-6">Availability</h3>
              <div className="flex items-center gap-4">
                <div className="size-3 bg-green-500 rounded-full relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <p className="text-white">Available for new projects</p>
              </div>
              <p className="text-white/60 mt-4">I'm currently open to new opportunities and collaborations. Feel free to reach out!</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
