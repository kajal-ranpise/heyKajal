import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const portfolioFilters = [
  { label: "All", filter: "*" },
  { label: "React", filter: ".filter-react" },
  { label: "Node", filter: ".filter-node" },
  { label: "PHP", filter: ".filter-php" },
  { label: "MySQL", filter: ".filter-mysql" },
  { label: "MongoDB", filter: ".filter-mongodb" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Projects() {
  const projects = useSelector((state) => state.publicData.projects);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const loadIsotope = async () => {
      const Isotope = (await import("isotope-layout")).default;
      const imagesLoaded = (await import("imagesloaded")).default;

      const grid = document.querySelector(".isotope-container");
      if (!grid) return;

      const iso = new Isotope(grid, {
        itemSelector: ".portfolio-item",
        layoutMode: "masonry",
      });

      imagesLoaded(grid, () => iso.layout());

      document.querySelectorAll(".portfolio-filters li").forEach((filter) => {
        filter.addEventListener("click", function () {
          document
            .querySelectorAll(".portfolio-filters li")
            .forEach((el) => el.classList.remove("filter-active"));
          this.classList.add("filter-active");
          iso.arrange({ filter: this.getAttribute("data-filter") });
        });
      });
    };

    loadIsotope();
  }, [projects]);

  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Projects</h2>
        <p>Ideas turned into reality — a showcase of my best work.</p>
      </div>

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry">
          {/* Filters */}
          <ul
            className="portfolio-filters isotope-filters"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {portfolioFilters.map((f, idx) => (
              <li
                key={f.filter}
                data-filter={f.filter}
                className={idx === 0 ? "filter-active" : ""}
              >
                {f.label}
              </li>
            ))}
          </ul>

          {/* Cards Grid */}
          <div className="row gy-4 isotope-container">
            {projects.map((item, idx) => (
              <motion.div
                key={item._id}
                className={`col-lg-4 col-md-6 portfolio-item isotope-item ${(item.category || []).join(" ")}`}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div
                  className="project-card"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Card Image */}
                  <div className="card-img-wrapper">
                    {item.imgUrl ? (
                      <img
                        src={item.imgUrl}
                        alt={item.title}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "40px",
                          color: "var(--accent-color)",
                          opacity: 0.4,
                        }}
                      >
                        <i className="bi bi-code-square"></i>
                      </div>
                    )}

                    {/* Hover overlay with action buttons */}
                    <div className="card-img-overlay">
                      {item.imgUrl && (
                        <a
                          href={item.imgUrl}
                          data-gallery={item.gallery || "portfolio"}
                          className="glightbox overlay-btn"
                          title="Preview"
                          aria-label="Preview image"
                        >
                          <i className="bi bi-zoom-in"></i>
                        </a>
                      )}
                      <Link
                        to={`/project-details/${item.slug}`}
                        className="overlay-btn"
                        title="View Details"
                        aria-label="View project details"
                      >
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>

                    {item.desc && (
                      <p className="card-desc">{item.desc}</p>
                    )}

                    {/* Tech Stack Badges */}
                    {item.tech && item.tech.length > 0 && (
                      <div className="tech-badges">
                        {item.tech.map((t) => (
                          <span key={t} className="tech-badge">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer row */}
                    <div className="card-footer-row">
                      <span className="card-meta-info">
                        {item.industry && (
                          <>
                            <i className="bi bi-briefcase me-1"></i>
                            {item.industry}
                          </>
                        )}
                        {item.year && !item.industry && (
                          <>
                            <i className="bi bi-calendar3 me-1"></i>
                            {item.year}
                          </>
                        )}
                      </span>
                      <Link
                        to={`/project-details/${item.slug}`}
                        className="details-link"
                      >
                        Details <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
