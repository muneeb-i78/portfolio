import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Copy,
  Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const fullText = "Let's build something amazing together...";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Terminal entrance
      gsap.fromTo(
        terminalRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: terminalRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'muneebijaz78@gmail.com',
      href: 'mailto:muneebijaz78@gmail.com',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+92 308 5097044',
      href: 'tel:+923085097044',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Rawalpindi, Pakistan',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      href: 'https://pk.linkedin.com/in/muneeb-ijaz-7205b0288',
      color: 'hover:bg-blue-600',
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:bg-slate-700',
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      href: 'mailto:muneebijaz78@gmail.com',
      color: 'hover:bg-red-600',
    },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal-style contact info */}
          <div
            ref={terminalRef}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {/* Terminal header */}
            <div className="bg-slate-900 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-sm text-slate-500 font-mono">
                contact.sh
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-green-400 mb-2">
                $ <span className="text-cyan-400">echo</span> "{typedText}"
                <span className="animate-pulse">|</span>
              </div>

              <div className="space-y-4 mt-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-3 group"
                  >
                    <span className="text-purple-400">→</span>
                    <span className="text-slate-400">{info.label}:</span>
                    <a
                      href={info.href}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex-1"
                    >
                      {info.value}
                    </a>
                    <button
                      onClick={() => copyToClipboard(info.value, info.label)}
                      className="p-1.5 text-slate-500 hover:text-cyan-400 
                                 hover:bg-slate-800 rounded transition-all"
                      title="Copy to clipboard"
                    >
                      {copied === info.label ? (
                        <Check size={14} className="text-green-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <div className="text-slate-500 mb-3"># Social Links</div>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 glass rounded-lg text-slate-300 
                                  hover:text-white ${social.color} transition-all duration-300`}
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">
              Send a Message
            </h3>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg
                             text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400
                             transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg
                             text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400
                             transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg
                           text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400
                           transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg
                           text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400
                           transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Muneeb Ijaz. Built with{' '}
            <span className="text-cyan-400">React</span> +{' '}
            <span className="text-cyan-400">Tailwind</span> +{' '}
            <span className="text-cyan-400">GSAP</span>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
