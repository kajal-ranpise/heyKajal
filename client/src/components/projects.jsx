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
                className={`col-lg-6 col-md-6 portfolio-item isotope-item ${(item.category || []).join(" ")}`}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <Link to={`/project-details/${item.slug}`} className="project-card">
                  {/* Image */}
                  <div className="card-img-wrapper">
                    {item.imgUrl ? (
                      <img src={item.imgUrl} alt={item.title} loading="lazy" />
                    ) : (
                      <i className="bi bi-code-square card-img-placeholder" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="card-body">
                    <div className="card-title-row">
                      <h3 className="card-title">{item.title}</h3>
                      {item.year && (
                        <span className="card-year">{item.year}</span>
                      )}
                    </div>
                    {item.tech && item.tech.length > 0 && (
                      <div className="tech-badges">
                        {item.tech.map((t) => (
                          <span key={t} className="tech-badge">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
