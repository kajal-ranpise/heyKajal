import React, { useState, useEffect, useRef } from "react";
import profileImg from "../assets/img/profile-img.jpg";
import { useSelector } from "react-redux";


const StatCounter = ({ end, duration = 1500, startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let start = 0;
    const intervalTime = 100;
    const increment = end / (duration / intervalTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [end, duration, startCounting]);

  return <span>{count}</span>;
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
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4">
              <img src={profileImg} className="img-fluid" alt="Profile" />
            </div>
            <div className="col-lg-8 content">
              <h2>{about.role || "Full Stack & Web App Developer"}</h2>

              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    {about.phone && (
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Phone:</strong> <span>{about.phone}</span>
                      </li>
                    )}
                    {about.location && (
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Location:</strong> <span>{about.location}</span>
                      </li>
                    )}
                    {about.role && (
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Role:</strong> <span>{about.role}</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="col-lg-6">
                  <ul>
                    {about.degree && (
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Degree:</strong> <span>{about.degree}</span>
                      </li>
                    )}
                    {about.email && (
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Email:</strong> <span>{about.email}</span>
                      </li>
                    )}
                    {about.availability && (
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Availability:</strong>{" "}
                        <span>{about.availability}</span>
                      </li>
                    )}
                    {about.github && (
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
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
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>LinkedIn:</strong>{" "}
                        <span>
                          <a
                            href={about.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View LinkedIn Profile
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
      {/* /About Section */}

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

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row skills-content skills-animation">
              {[firstCol, secondCol].map((colSkills, colIndex) => (
                <div className="col-lg-6" key={colIndex}>
                  {colSkills.map((skill) => (
                    <div
                      className="progress"
                      key={skill._id}
                      style={{ marginBottom: "15px", position: "relative" }}
                    >
                      <span
                        className="skill"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "500",
                          marginBottom: "5px",
                          position: "relative",
                          zIndex: 2,
                          color: "#000",
                        }}
                      >
                        <span>{skill.name}</span>
                        <i className="val">{skill.val}%</i>
                      </span>
                      <div
                        className="progress-bar-wrap"
                        style={{
                          background: "#e0e0e0",
                          height: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={skill.val}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${skill.val}%`,
                            height: "100%",
                            borderRadius: "5px",
                            background: `color-mix(in srgb, var(--accent-color) 90%, white 20%)`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* /Skills Section */}

      {/* Stats Section */}
      {stats.length > 0 && (
        <section id="stats" className="stats section" ref={statsRef}>
          <div
            className="container section-title"
            style={{ textAlign: "center" }}
          >
            <h2>Facts</h2>
            <p>People. Work. Growth. Always!</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              {stats.map((stat) => (
                <div className="col-lg-3 col-md-6" key={stat._id}>
                  <div
                    className="stats-item text-center w-100 h-100"
                    style={{
                      padding: "30px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h3 style={{ fontSize: "2rem", color: "#007bff" }}>
                      <StatCounter
                        end={stat.end}
                        startCounting={startStats}
                      />
                    </h3>
                    <p style={{ margin: 0, fontWeight: "500" }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* /Stats Section */}
    </main>
  );
}

export default About;
