import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AOS from "aos";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Resume() {
  const about = useSelector((state) => state.publicData.about);
  const education = useSelector((state) => state.publicData.education);
  const experience = useSelector((state) => state.publicData.experience);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const contact = [
    about.location && { label: about.location, icon: <GoLocation size={16} /> },
    about.phone && { label: about.phone, icon: <AiOutlinePhone size={16} /> },
    about.email && { label: about.email, icon: <AiOutlineMail size={16} /> },
    about.linkedin && { label: "LinkedIn", url: about.linkedin, icon: <FaLinkedin size={16} /> },
    about.github && { label: "GitHub", url: about.github, icon: <FaGithub size={16} /> },
  ].filter(Boolean);

  return (
    <main className="main resume-page">
      <section id="resume" className="resume section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Resume</h2>
          <p>Turning ideas into scalable web solutions — here's my journey.</p>
        </div>

        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-6">
              <motion.h3
                className="resume-title"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Summary
              </motion.h3>

              <motion.div
                className="resume-item pb-0"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <h4>{about.name || ""}</h4>
                {about.description && (
                  <p>
                    <em>{about.description}</em>
                  </p>
                )}
                <ul style={{ listStyleType: "none", padding: 0, margin: "12px 0 0" }}>
                  {contact.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "6px 0",
                        fontSize: "14px",
                        color: "var(--default-color)",
                        borderBottom: "1px solid var(--border-color)",
                      }}
                    >
                      <span style={{ color: "var(--accent-color)", flexShrink: 0 }}>
                        {item.icon}
                      </span>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--accent-color)" }}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.h3
                className="resume-title"
                style={{ marginTop: "32px" }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Education
              </motion.h3>

              {education.map((edu, idx) => (
                <motion.div
                  key={edu._id}
                  className="resume-item"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <h4>{edu.degree}</h4>
                  <h5>{edu.year}</h5>
                  <em>{edu.institute}</em>
                  {edu.description && <p style={{ marginTop: "8px", marginBottom: 0 }}>{edu.description}</p>}
                </motion.div>
              ))}
            </div>

            {/* Right Column */}
            <div className="col-lg-6">
              <motion.h3
                className="resume-title"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Professional Experience
              </motion.h3>

              {experience.map((exp, idx) => (
                <motion.div
                  key={exp._id}
                  className="resume-item"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <h4>{exp.title}</h4>
                  <h5>{exp.year}</h5>
                  <em>{exp.company}</em>
                  <ul style={{ marginTop: "10px" }}>
                    {exp.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Resume;
