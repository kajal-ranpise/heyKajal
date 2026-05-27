import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const fadeUp = (delay = 0) => ({
  "data-aos": "fade-up",
  "data-aos-delay": String(delay),
});

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.publicData.projects);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const project = projects.find((p) => p.slug === id);

  if (!project) {
    return (
      <main className="main portfolio-details-page">
        <div className="container" style={{ paddingTop: 80 }}>
          <button className="pd-back-btn" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left" /> Back to Projects
          </button>
          <h2>Project Not Found</h2>
        </div>
      </main>
    );
  }

  const infoItems = [
    project.industry && { label: "Industry", value: project.industry },
    project.client   && { label: "Client",   value: project.client },
    project.year     && { label: "Year",      value: String(project.year) },
  ].filter(Boolean);

  const hasLinks = project.liveUrl || project.githubUrl;

  return (
    <main className="main portfolio-details-page">
      <section id="portfolio-details" className="portfolio-details section">

        {/* ── Header ── */}
        <div className="container" {...fadeUp(0)}>
          <button className="pd-back-btn" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left" /> Back to Projects
          </button>
          <div className="pd-title-block">
            <h2>{project.title}</h2>
            {project.year && <span className="pd-year-tag">{project.year}</span>}
          </div>
        </div>

        {/* ── Image + Sidebar ── */}
        <div className="container" {...fadeUp(80)}>
          <div className="row gy-3">

            {/* Image */}
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.imgUrl ? (
                  <div className="pd-image-wrapper">
                    <img src={project.imgUrl} alt={project.title} />
                  </div>
                ) : (
                  <div className="pd-image-placeholder">
                    <i className="bi bi-code-square" />
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-6 d-flex flex-column gap-3">

              {/* Project info */}
              {infoItems.length > 0 && (
                <div className="pd-card" {...fadeUp(160)}>
                  <h3 className="pd-card-label">Project Info</h3>
                  <ul className="pd-info-list">
                    {infoItems.map((item, i) => (
                      <li key={i}>
                        <span className="pd-info-key">{item.label}</span>
                        <span className="pd-info-val">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Live Demo & GitHub */}
              {hasLinks && (
                <div className="pd-card" {...fadeUp(200)}>
                  <h3 className="pd-card-label">Links</h3>
                  <div className="pd-links-row">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-primary">
                        <i className="bi bi-box-arrow-up-right" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-outline">
                        <i className="bi bi-github" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              {project.tech?.length > 0 && (
                <div className="pd-card" {...fadeUp(240)}>
                  <h3 className="pd-card-label">Technologies Used</h3>
                  <div className="tech-badges">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Short Description ── */}
        {project.desc && (
          <div className="container mt-3" {...fadeUp(100)}>
            <div className="pd-section-card pd-desc-card">
              <div className="pd-section-icon"><i className="bi bi-file-text" /></div>
              <div>
                <h3 className="pd-section-title">Short Description</h3>
                <p className="pd-section-text">{project.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Features + Responsibilities ── */}
        {(project.features?.length > 0 || project.responsibilities?.length > 0) && (
          <div className="container mt-3">
            <div className="row gy-3">
              {project.features?.length > 0 && (
                <div className="col-lg-6" {...fadeUp(120)}>
                  <div className="pd-card pd-list-card h-100">
                    <div className="pd-list-header">
                      <span className="pd-list-icon pd-icon-teal"><i className="bi bi-stars" /></span>
                      <h3 className="pd-section-title mb-0">Key Features</h3>
                    </div>
                    <ul className="pd-bullet-list">
                      {project.features.map((f, i) => (
                        <li key={i}><i className="bi bi-check2-circle" />{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {project.responsibilities?.length > 0 && (
                <div className="col-lg-6" {...fadeUp(180)}>
                  <div className="pd-card pd-list-card h-100">
                    <div className="pd-list-header">
                      <span className="pd-list-icon pd-icon-purple"><i className="bi bi-person-gear" /></span>
                      <h3 className="pd-section-title mb-0">Your Responsibilities</h3>
                    </div>
                    <ul className="pd-bullet-list">
                      {project.responsibilities.map((r, i) => (
                        <li key={i}><i className="bi bi-arrow-right-circle" />{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Challenges & Solutions ── */}
        {project.challenges?.length > 0 && (
          <div className="container mt-3" {...fadeUp(140)}>
            <div className="pd-card">
              <div className="pd-list-header">
                <span className="pd-list-icon pd-icon-orange"><i className="bi bi-lightning-charge" /></span>
                <h3 className="pd-section-title mb-0">Challenges &amp; Solutions</h3>
              </div>
              <div className="pd-cs-list">
                {project.challenges.map((item, i) => (
                  <div key={i} className="pd-cs-item">
                    <span className="pd-cs-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="pd-cs-body">
                      <div className="pd-cs-row pd-cs-challenge-row">
                        <span className="pd-cs-pill pd-cs-pill-orange">
                          <i className="bi bi-exclamation-circle" /> Challenge
                        </span>
                        <p>{item.challenge}</p>
                      </div>
                      <div className="pd-cs-row pd-cs-solution-row">
                        <span className="pd-cs-pill pd-cs-pill-teal">
                          <i className="bi bi-check2-circle" /> Solution
                        </span>
                        <p>{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Project Outcome ── */}
        {project.outcome && (
          <div className="container mt-3 mb-1" {...fadeUp(160)}>
            <div className="pd-section-card pd-outcome-card">
              <div className="pd-section-icon pd-icon-gold"><i className="bi bi-trophy" /></div>
              <div>
                <h3 className="pd-section-title">Project Outcome</h3>
                <p className="pd-section-text">{project.outcome}</p>
              </div>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}

export default ProjectDetails;
