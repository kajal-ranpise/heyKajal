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
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SectionTitle = ({ children, style, icon }) => (
  <motion.h3
    className="resume-title"
    style={{ display: "flex", alignItems: "center", gap: 8, ...style }}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {icon && (
      <i
        className={`bi ${icon}`}
        style={{
          color: "var(--accent-color)",
          fontSize: "1rem",
          flexShrink: 0,
        }}
      />
    )}
    {children}
  </motion.h3>
);

const ResumeCard = ({ children, custom = 0, style }) => (
  <motion.div
    className="resume-item"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={custom}
    style={style}
  >
    {children}
  </motion.div>
);

function Resume() {
  const about = useSelector((s) => s.publicData.about);
  const education = useSelector((s) => s.publicData.education);
  const experience = useSelector((s) => s.publicData.experience);
  const skillCategories = useSelector((s) => s.publicData.skillCategories);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const contact = [
    about.location && { label: about.location, icon: <GoLocation size={15} /> },
    about.phone && { label: about.phone, icon: <AiOutlinePhone size={15} /> },
    about.email && { label: about.email, icon: <AiOutlineMail size={15} /> },
    about.linkedin && {
      label: "LinkedIn",
      url: about.linkedin,
      icon: <FaLinkedin size={15} />,
    },
    about.github && {
      label: "GitHub",
      url: about.github,
      icon: <FaGithub size={15} />,
    },
  ].filter(Boolean);

  const accomplishments = (about.accomplishments || []).filter(Boolean);
  const achievements = (about.achievements || []).filter((a) => a && a.title);
  const competencies = (about.coreCompetencies || []).filter(Boolean);

  return (
    <main className="main resume-page">
      <section id="resume" className="resume section">
        {/* Page header */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Resume</h2>
          <p>Turning ideas into scalable web solutions — here's my journey.</p>
          {about.resumeUrl && (
            <div className="resume-btn-wrap">
              <a
                href={about.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn-resume-dl"
              >
                <span className="btn-resume-dl__icon">
                  <i className="bi bi-download" />
                </span>
                <span className="btn-resume-dl__text">Download Resume</span>
                <span className="btn-resume-dl__shine" />
              </a>
            </div>
          )}
        </div>

        <div className="container">
          <div className="row g-4">
            {/* ── LEFT COLUMN ── */}
            <div className="col-lg-5">
              {/* Summary */}
              <SectionTitle icon="bi-person-lines-fill">Summary</SectionTitle>
              <ResumeCard custom={0} style={{ marginBottom: 32 }}>
                <h4 style={{ marginBottom: 6 }}>{about.name || ""}</h4>
                {about.role && (
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--accent-color)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {about.role}
                  </p>
                )}
                {about.description && (
                  <p
                    style={{
                      margin: "0 0 14px",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--default-color)",
                    }}
                  >
                    {about.description}
                  </p>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {contact.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "5px 0",
                        fontSize: 13,
                        color: "var(--default-color)",
                        borderBottom: "1px solid var(--border-color)",
                      }}
                    >
                      <span
                        style={{ color: "var(--accent-color)", flexShrink: 0 }}
                      >
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
              </ResumeCard>

              {/* Skill Categories */}
              {skillCategories.length > 0 && (
                <>
                  <SectionTitle icon="bi-code-slash">Skills</SectionTitle>
                  <ResumeCard custom={1} style={{ marginBottom: 32 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      {skillCategories.map((cat) => (
                        <div
                          key={cat._id}
                          style={{
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                            alignItems: "baseline",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "0.88rem",
                              color: "var(--heading-color)",
                              minWidth: 120,
                              flexShrink: 0,
                            }}
                          >
                            {cat.category}
                          </span>
                          <span
                            style={{
                              color: "var(--accent-color)",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            —
                          </span>
                          <span
                            style={{
                              fontSize: "0.88rem",
                              color: "var(--default-color)",
                              lineHeight: 1.7,
                            }}
                          >
                            {Array.isArray(cat.skills)
                              ? cat.skills.join(", ")
                              : cat.skills}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ResumeCard>
                </>
              )}

              {/* Core Competencies */}
              {competencies.length > 0 && (
                <>
                  <SectionTitle icon="bi-stars">Core Competencies</SectionTitle>
                  <ResumeCard custom={2} style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {competencies.map((item, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: "var(--accent-color)",
                            color: "#fff",
                            padding: "5px 14px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </ResumeCard>
                </>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <>
                  <SectionTitle icon="bi-trophy">Achievements</SectionTitle>
                  <ResumeCard custom={3}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {achievements.map((ach, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "7px 0",
                            borderBottom:
                              idx < achievements.length - 1
                                ? "1px solid var(--border-color)"
                                : "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <i
                              className="bi bi-award"
                              style={{
                                color: "var(--accent-color)",
                                fontSize: "1rem",
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: 14,
                                color: "var(--default-color)",
                              }}
                            >
                              {ach.title}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              flexShrink: 0,
                              marginLeft: 12,
                            }}
                          >
                            {ach.documentUrl && (
                              <a
                                href={ach.documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View certificate"
                                style={{
                                  color: "var(--accent-color)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                  textDecoration: "none",
                                  fontSize: 13,
                                }}
                              >
                                <i
                                  className="bi bi-file-earmark-text"
                                  style={{ fontSize: "1.05rem" }}
                                />
                                <span style={{ fontSize: 12 }}>Doc</span>
                              </a>
                            )}
                            {ach.link && (
                              <a
                                href={ach.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View link"
                                style={{
                                  color: "var(--accent-color)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                  textDecoration: "none",
                                  fontSize: 13,
                                }}
                              >
                                <i
                                  className="bi bi-link-45deg"
                                  style={{ fontSize: "1.1rem" }}
                                />
                                <span style={{ fontSize: 12 }}>Link</span>
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ResumeCard>
                </>
              )}
            </div>

            {/* ── RIGHT COLUMN ── */}

            <div className="col-lg-7">
              {/* Key Accomplishments */}
              {accomplishments.length > 0 && (
                <>
                  <SectionTitle
                    icon="bi-rocket-takeoff"
                    style={{ marginTop: 32 }}
                  >
                    Key Accomplishments
                  </SectionTitle>
                  <ResumeCard custom={1}>
                    <ul style={{ margin: 0, listStyle: "none", padding: 0 }}>
                      {accomplishments.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            padding: "4px 0",
                          }}
                        >
                          <i
                            className="bi bi-check2-circle"
                            style={{
                              color: "var(--accent-color)",
                              fontSize: "1rem",
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </ResumeCard>
                </>
              )}
              {/* Professional Experience */}
              {experience.length > 0 && (
                <>
                  <SectionTitle icon="bi-briefcase">
                    Professional Experience
                  </SectionTitle>
                  {experience.map((exp, idx) => (
                    <ResumeCard
                      key={exp._id}
                      custom={idx}
                      style={{ marginBottom: 12 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: 6,
                          marginBottom: 4,
                        }}
                      >
                        <h4 style={{ margin: 0 }}>{exp.title}</h4>
                        <h5 style={{ margin: 0 }}>{exp.year}</h5>
                      </div>
                      <em style={{ marginBottom: 10 }}>{exp.company}</em>
                      {exp.responsibilities?.length > 0 && (
                        <ul style={{ marginTop: 8 }}>
                          {exp.responsibilities.map((res, i) => (
                            <li key={i}>{res}</li>
                          ))}
                        </ul>
                      )}
                    </ResumeCard>
                  ))}
                </>
              )}

              {/* Education */}
              {education.length > 0 && (
                <>
                  <SectionTitle icon="bi-mortarboard" style={{ marginTop: 32 }}>
                    Education
                  </SectionTitle>
                  {education.map((edu, idx) => (
                    <ResumeCard
                      key={edu._id}
                      custom={idx}
                      style={{ marginBottom: 12 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: 6,
                          marginBottom: 4,
                        }}
                      >
                        <h4 style={{ margin: 0 }}>{edu.degree}</h4>
                        <h5 style={{ margin: 0 }}>{edu.year}</h5>
                      </div>
                      <em>{edu.institute}</em>
                      {edu.description && (
                        <p
                          style={{
                            marginTop: 6,
                            marginBottom: 0,
                            fontSize: 13,
                            color: "var(--default-color)",
                          }}
                        >
                          {edu.description}
                        </p>
                      )}
                    </ResumeCard>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Resume;
