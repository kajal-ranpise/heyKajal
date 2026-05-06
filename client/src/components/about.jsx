import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import profileImg from "../assets/img/profile-img.jpg";

/* const StatCounter = ({ end, suffix = "+", duration = 2000 }) => {
  const numEnd = Number(end) || 0;
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numEnd));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, numEnd, duration]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0 }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}; */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function About() {
  const about = useSelector((state) => state.publicData.about);
  const skills = useSelector((state) => state.publicData.skills);
  const stats = useSelector((state) => state.publicData.stats);
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
                <img
                  src={profileImg}
                  className="img-fluid"
                  alt="Kajal Ranpise"
                />
              </motion.div>
            </div>

            {/* Info */}
            <div className="col-lg-8 content">
              <h2>{about.role || "Full Stack & Web App Developer"}</h2>
              {about.shortDescription && (
                <p className="fst-italic">{about.shortDescription}</p>
              )}

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
                    {about.email && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Email:</strong> <span>{about.email}</span>
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

                    {about.availability && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>Availability:</strong>{" "}
                        <span>{about.availability}</span>
                      </li>
                    )}
                    {about.github && (
                      <li>
                        <i className="bi bi-chevron-right"></i>
                        <strong>GitHub:</strong>{" "}
                        <span>
                          <a
                            href={about.github}
                            target="_blank"
                            rel="noreferrer"
                          >
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
                          <a
                            href={about.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Profile
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {about.longDescription && <p>{about.longDescription}</p>}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section id="skills" className="skills section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Skills &amp; Expertise</h2>
            <p>
              Technologies and tools I use to design, build, and optimize
              applications.
            </p>
          </div>

          <div className="container">
            <motion.div
              className="skill-bubbles"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill._id}
                  className="skill-bubble"
                  style={{ animationDelay: `${(idx % 6) * 0.55}s` }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.35, y: 30 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileHover={{
                    scale: 1.13,
                    y: -7,
                    transition: { duration: 0.22 },
                  }}
                  aria-label={`${skill.name} ${skill.val}%`}
                >
                  <motion.div
                    className="skill-bubble-fill"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${skill.val}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: idx * 0.06,
                    }}
                  />
                  <div className="skill-bubble-content">
                    <span className="skill-bubble-name">{skill.name}</span>
                    <span className="skill-bubble-val">{skill.val}%</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {stats.length > 0 && (
        <section id="stats" className="stats section">
          <div
            className="container section-title"
            style={{ textAlign: "center" }}
          >
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
                    <h3
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "800",
                        marginBottom: "8px",
                      }}
                    >
                      {stat.end}
                      {/* <StatCounter end={stat.end} suffix={stat.suffix || "+"} /> */}
                    </h3>
                    <p
                      style={{ margin: 0, fontWeight: "500", fontSize: "14px" }}
                    >
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
