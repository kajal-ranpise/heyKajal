import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const isImage = (url) => /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url);

function DocModal({ url, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(6px)",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--surface-color)",
            borderRadius: 16,
            width: "min(860px, 100%)",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-color)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <i
                className="bi bi-award"
                style={{ color: "var(--accent-color)", fontSize: "1.1rem" }}
              />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--heading-color)",
                }}
              >
                {title}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "var(--accent-color)",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: 8,
                  border: "1px solid var(--accent-color)",
                }}
              >
                <i className="bi bi-box-arrow-up-right" style={{ fontSize: "0.85rem" }} />
                Open
              </a>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--default-color)",
                  fontSize: "1.3rem",
                  lineHeight: 1,
                  padding: "4px 6px",
                  borderRadius: 6,
                }}
                aria-label="Close"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
          </div>

          {/* Document body */}
          <div style={{ flex: 1, overflow: "auto", background: "#1a1a2e" }}>
            {isImage(url) ? (
              <img
                src={url}
                alt={title}
                style={{ display: "block", maxWidth: "100%", margin: "0 auto" }}
              />
            ) : (
              <iframe
                src={url}
                title={title}
                style={{ width: "100%", height: "75vh", border: "none", display: "block" }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Achievements() {
  const about = useSelector((s) => s.publicData.about);
  const achievements = (about.achievements || []).filter((a) => a && a.title);
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="main">
      {viewer && (
        <DocModal
          url={viewer.url}
          title={viewer.title}
          onClose={() => setViewer(null)}
        />
      )}

      <section id="achievements" className="section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Achievements</h2>
          <p>Certifications, awards, and milestones earned along the way.</p>
        </div>

        <div className="container">
          {achievements.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--default-color)", opacity: 0.6 }}>
              No achievements to display yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  className="resume-item"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "var(--accent-color)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i className="bi bi-award" style={{ color: "#fff", fontSize: "1.3rem" }} />
                    </div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "1rem",
                        lineHeight: 1.45,
                        color: "var(--heading-color)",
                        alignSelf: "center",
                      }}
                    >
                      {ach.title}
                    </h4>
                  </div>

                  {(ach.documentUrl || ach.link) && (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {ach.documentUrl && (
                        <button
                          onClick={() => setViewer({ url: ach.documentUrl, title: ach.title })}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 14px",
                            borderRadius: 20,
                            background: "var(--accent-color)",
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <i className="bi bi-file-earmark-text" style={{ fontSize: "0.95rem" }} />
                          View Certificate
                        </button>
                      )}
                      {ach.link && (
                        <a
                          href={ach.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 14px",
                            borderRadius: 20,
                            border: "1.5px solid var(--accent-color)",
                            color: "var(--accent-color)",
                            fontSize: 12,
                            fontWeight: 600,
                            textDecoration: "none",
                            background: "transparent",
                          }}
                        >
                          <i className="bi bi-link-45deg" style={{ fontSize: "1rem" }} />
                          View Link
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Achievements;
