import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const portfolioFilters = [
  { label: "All", filter: "*" },
  { label: "React", filter: ".filter-react" },
  { label: "Node", filter: ".filter-node" },
  { label: "PHP", filter: ".filter-php" },
  { label: "MySql", filter: ".filter-mysql" },
  { label: "MongoDB", filter: ".filter-mongodb" },
];

function Projects() {
  const projects = useSelector((state) => state.publicData.projects);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const loadIsotope = async () => {
      const Isotope = (await import("isotope-layout")).default;
      const imagesLoaded = (await import("imagesloaded")).default;

      let grid = document.querySelector(".isotope-container");
      if (grid) {
        let iso = new Isotope(grid, {
          itemSelector: ".portfolio-item",
          layoutMode: "masonry",
        });

        imagesLoaded(grid, () => {
          iso.layout();
        });

        let filters = document.querySelectorAll(".portfolio-filters li");
        filters.forEach((filter) => {
          filter.addEventListener("click", function () {
            filters.forEach((el) => el.classList.remove("filter-active"));
            this.classList.add("filter-active");
            iso.arrange({ filter: this.getAttribute("data-filter") });
          });
        });
      }
    };

    loadIsotope();
  }, [projects]);

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Projects</h2>
        <p>A showcase of ideas turned into reality.</p>
      </div>

      <div className="container">
        <div
          className="isotope-layout"
          data-default-filter="*"
          data-layout="masonry"
          data-sort="original-order"
        >
          {/* Filters */}
          <ul
            className="portfolio-filters isotope-filters"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {portfolioFilters.map((filter, idx) => (
              <li
                key={filter.filter}
                data-filter={filter.filter}
                className={idx === 0 ? "filter-active" : ""}
              >
                {filter.label}
              </li>
            ))}
          </ul>

          {/* Portfolio Grid */}
          <div
            className="row gy-4 isotope-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {projects.map((item) => (
              <div
                key={item._id}
                className={`col-lg-4 col-md-6 portfolio-item isotope-item ${
                  (item.category || []).join(" ")
                }`}
              >
                {item.imgUrl && (
                  <img
                    src={item.imgUrl}
                    className="img-fluid"
                    alt={item.title}
                  />
                )}
                <div
                  className="portfolio-info"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    padding: "15px",
                    borderRadius: "8px",
                  }}
                >
                  <h4 style={{ color: "#ffcc00" }}>{item.title}</h4>
                  {item.desc && (
                    <p style={{ color: "#f0f0f0" }}>{item.desc}</p>
                  )}

                  {item.industry && (
                    <p>
                      <strong style={{ color: "#00ffff" }}>Industry:</strong>{" "}
                      <span style={{ color: "#ffffff" }}>{item.industry}</span>
                    </p>
                  )}

                  {item.tech && item.tech.length > 0 && (
                    <p>
                      <strong style={{ color: "#00ffff" }}>Tech:</strong>{" "}
                      <span style={{ color: "#ffffff" }}>
                        {item.tech.join(", ")}
                      </span>
                    </p>
                  )}

                  {item.features && item.features.length > 0 && (
                    <p>
                      <strong style={{ color: "#00ffff" }}>Features:</strong>{" "}
                      <span style={{ color: "#ffffff" }}>
                        {item.features.join(", ")}
                      </span>
                    </p>
                  )}

                  {item.client && (
                    <p>
                      <strong style={{ color: "#00ffff" }}>Client:</strong>{" "}
                      <span style={{ color: "#ffffff" }}>{item.client}</span>
                    </p>
                  )}

                  {item.year && (
                    <p>
                      <strong style={{ color: "#00ffff" }}>Year:</strong>{" "}
                      <span style={{ color: "#ffffff" }}>{item.year}</span>
                    </p>
                  )}

                  {item.imgUrl && (
                    <a
                      href={item.imgUrl}
                      title={item.title}
                      data-gallery={item.gallery}
                      className="glightbox preview-link"
                      style={{ color: "#ffcc00" }}
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                  )}
                  <Link
                    to={`/project-details/${item.slug}`}
                    title="More Details"
                    className="details-link"
                    style={{ color: "#ffcc00", marginLeft: "10px" }}
                  >
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
