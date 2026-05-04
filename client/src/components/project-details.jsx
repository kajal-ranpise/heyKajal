import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function ProjectDetails() {
  const { id } = useParams();
  const projects = useSelector((state) => state.publicData.projects);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const project = projects.find((p) => p.slug === id);

  if (!project) {
    return (
      <main className="main portfolio-details-page">
        <div className="container section-title">
          <h2>Project Not Found</h2>
        </div>
      </main>
    );
  }

  const infoItems = [
    project.industry && { label: "Industry", value: project.industry },
    project.tech && project.tech.length > 0 && {
      label: "Tech Stack",
      value: project.tech.join(", "),
    },
    project.client && { label: "Client", value: project.client },
    project.year && { label: "Year", value: project.year },
  ].filter(Boolean);

  return (
    <main className="main portfolio-details-page">
      <section id="portfolio-details" className="portfolio-details section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{project.title}</h2>
          <p>Deep dive into the work behind the project.</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-8">
              {project.imgUrl ? (
                <Swiper
                  modules={[Pagination, Autoplay]}
                  loop={true}
                  speed={600}
                  autoplay={{ delay: 5000 }}
                  pagination={{ clickable: true }}
                  className="portfolio-details-slider"
                >
                  <SwiperSlide>
                    <img src={project.imgUrl} alt={project.title} />
                  </SwiperSlide>
                </Swiper>
              ) : (
                <div
                  style={{
                    background: "#f0f0f0",
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ color: "#999" }}>No image available</span>
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div
                className="portfolio-info"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3>Project information</h3>
                <ul>
                  {infoItems.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.label}</strong>: {item.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="portfolio-description"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                {project.features && project.features.length > 0 && (
                  <>
                    <h4>Key Features</h4>
                    <ul>
                      {project.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;
