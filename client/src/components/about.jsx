import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import profileImg from "../assets/img/profile-img.jpg";

const StatCounter = ({ end, duration = 1500, startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = end / (duration / 100);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 100);
    return () => clearInterval(timer);
  }, [end, duration, startCounting]);

  return <span>{count}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function About() {
  const about = useSelector((state) => state.publicData.about);
  const skills = useSelector((state) => state.publicData.skills);
  const stats = useSelector((state) => state.publicData.stats);

  const mid = Math.ceil(skills.length / 2);
  const firstCol = skills.slice(0, mid);
  const secondCol = skills.slice(mid);

  const [startStats, setStartStats] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="main about-page">
      {/* About Section */}
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2>About</h2>
          <p>{about.description || ""}</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 justify-content-center align-items-center">
            {/* Profile image */}
            <div className="col-lg-4 text-center">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.4 }}
              >
                <img src={profileImg} className="img-fluid" alt="Kajal Ranpise" />
              </motion.div>
            </div>

            {/* Info */}
            <div className="col-lg-8 content">
              <h2>{about.role || "Full Stack & Web App Developer"}</h2>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    {about.phone && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Phone:</strong> <span>{about.phone}</span>
                      </li>
                    )}
                    {about.location && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Location:</strong> <span>{about.location}</span>
                      </li>
                    )}
                    {about.role && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Role:</strong> <span>{about.role}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    {about.degree && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Degree:</strong> <span>{about.degree}</span>
                      </li>
                    )}
                    {about.email && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Email:</strong> <span>{about.email}</span>
                      </li>
                    )}
                    {about.availability && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Availability:</strong> <span>{about.availability}</span>
                      </li>
                    )}
                    {about.github && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>GitHub:</strong>{" "}
                        <span>
                          <a href={about.github} target="_blank" rel="noreferrer">
                            {about.github.replace(/^https?:\/\//, "")}
                          </a>
                        </span>
                      </li>
                    )}
                    {about.linkedin && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>LinkedIn:</strong>{" "}
                        <span>
                          <a href={about.linkedin} target="_blank" rel="noreferrer">
                            View Profile
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section id="skills" className="skills section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Skills &amp; Expertise</h2>
            <p>Technologies and tools I use to design, build, and optimize applications.</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row skills-content">
              {[firstCol, secondCol].map((col, colIdx) => (
                <div className="col-lg-6" key={colIdx}>
                  {col.map((skill, skillIdx) => (
                    <motion.div
                      key={skill._id}
                      className="progress"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={skillIdx}
                      style={{ marginBottom: "20px" }}
                    >
                      <span
                        className="skill"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "600",
                          fontSize: "14px",
                          marginBottom: "8px",
                          color: "var(--heading-color)",
                        }}
                      >
                        <span>{skill.name}</span>
                        <span style={{ color: "var(--accent-color)" }}>{skill.val}%</span>
                      </span>
                      <div
                        className="progress-bar-wrap"
                        style={{
                          background: "var(--border-color)",
                          height: "8px",
                          borderRadius: "50px",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={skill.val}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: skillIdx * 0.05 }}
                          style={{ height: "100%", borderRadius: "50px" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {stats.length > 0 && (
        <section id="stats" className="stats section" ref={statsRef}>
          <div className="container section-title" style={{ textAlign: "center" }}>
            <h2>Facts</h2>
            <p>People. Work. Growth. Always!</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat._id}
                  className="col-lg-3 col-md-6"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <div
                    className="stats-item text-center w-100 h-100"
                    style={{ padding: "32px 20px" }}
                  >
                    <h3 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "8px" }}>
                      <StatCounter end={stat.end} startCounting={startStats} />
                      {stat.suffix || "+"}
                    </h3>
                    <p style={{ margin: 0, fontWeight: "500", fontSize: "14px" }}>
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default About;
