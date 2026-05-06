import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import heroBg from "../assets/img/hero-bg.jpg";

const ROLES = [
  "Full Stack Developer",
  "MERN Stack Expert",
  "AI Solutions Builder",
  "React & Node.js Dev",
];

const TECH = [
  { name: "React",   symbol: "⚛",  color: "#61dafb", bg: "rgba(97,218,251,0.12)"  },
  { name: "Node.js", symbol: "⬡",  color: "#68a063", bg: "rgba(104,160,99,0.12)"  },
  { name: "Express", symbol: "Ex", color: "#c9d1d9", bg: "rgba(201,209,217,0.10)" },
  { name: "MongoDB", symbol: "🍃", color: "#47a248", bg: "rgba(71,162,72,0.12)"   },
  { name: "MySQL",   symbol: "🐬", color: "#00758f", bg: "rgba(0,117,143,0.12)"   },
];

function useTypewriter(words, typingSpeed = 65, deletingSpeed = 35, pause = 1800) {
  const [index, setIndex]     = useState(0);
  const [text, setText]       = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const speed = deleting ? deletingSpeed : typingSpeed;
    const t = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

function Hero() {
  const about = useSelector((state) => state.publicData.about);
  const stats = useSelector((state) => state.publicData.stats);
  const role  = useTypewriter(ROLES);

  return (
    <section id="hero" className="hero hero-v2 section">

      {/* Ambient floating orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      {/* Full-bleed profile photo — right side */}
      <div
        className="hero-bg-photo"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      {/* Gradient overlay: opaque dark left → transparent right */}
      <div className="hero-bg-overlay" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-v3-content">

          <motion.span className="hero-badge" {...fadeUp(0.1)}>
            <span className="hero-badge-dot" aria-hidden="true" />
            ✦ Available for opportunities
          </motion.span>

          <motion.h1 className="hero-v3-name" {...fadeUp(0.22)}>
            <span className="wave-hand" aria-label="waving hand">👋🏻</span> &nbsp;<span className="hero-hi">Hi, I'm</span> <br />
            <span className="gradient-text">
              {about.name || "Kajal Ranpise"}
            </span>
          </motion.h1>

          <motion.div className="hero-v2-typewriter" {...fadeUp(0.34)}>
            <span>{role}</span>
            <span className="tw-cursor" aria-hidden="true">|</span>
          </motion.div>

          <motion.p className="hero-v2-desc" {...fadeUp(0.44)}>
            {about.bio ||
              about.description ||
              "I build intelligent and scalable web applications using React.js, Node.js, and modern cloud technologies."}
          </motion.p>

          {/* Tech stack badges */}
          <motion.div className="hero-tech-stack" {...fadeUp(0.54)}>
            {TECH.map((t) => (
              <div
                key={t.name}
                className="hero-tech-icon"
                style={{ color: t.color, background: t.bg, borderColor: t.color + "40" }}
                title={t.name}
              >
                <span>{t.symbol}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="hero-cta" {...fadeUp(0.62)}>
            <Link to="/contact" className="btn-hire">
              Hire Me <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/projects" className="btn-outline-hero">
              View Work
            </Link>
            {about.resumeUrl && (
              <a
                href={about.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-hero"
                download="Resume.pdf"
              >
                <i className="bi bi-download" /> &nbsp; Resume
              </a>
            )}
          </motion.div>

          <motion.div className="hero-social" {...fadeUp(0.70)}>
            <a href="https://github.com/kajal-ranpise" target="_blank" rel="noreferrer" aria-label="GitHub">
              <i className="bi bi-github" />
            </a>
            <a href="https://www.linkedin.com/in/kajal-ranpise" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin" />
            </a>
            <a href="mailto:kajaldranpise@gmail.com" aria-label="Email">
              <i className="bi bi-envelope" />
            </a>
          </motion.div>

          {stats.length > 0 && (
            <motion.div className="hero-v2-stats" {...fadeUp(0.78)}>
              {stats.map((stat, i) => (
                <Fragment key={stat._id}>
                  {i > 0 && <div className="hv2-stat-sep" />}
                  <div className="hv2-stat">
                    <span className="hv2-stat-num">{stat.end}{stat.suffix || "+"}</span>
                    <span className="hv2-stat-lbl">{stat.label}</span>
                  </div>
                </Fragment>
              ))}
            </motion.div>
          )}

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
