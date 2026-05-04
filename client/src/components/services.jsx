import { useEffect } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";

const BLOB_PATHS = [
  "M300,521C376.1,518,466,530,510.7,468C554.3,408,508,329,491,256C475,184,480,97,416,59C349,19,262,41,194,79C130,114,98,180,77,249C52,329,14,422,67,486C119,550,217,524,300,521",
  "M300,541C380,534,466,522,516,461C563,404,559,319,529,251C499,183,448,122,381,89C310,55,230,57,164,89C95,123,45,188,30,259C15,336,46,419,102,479C155,537,227,550,300,541",
  "M300,532C375,529,459,538,505,470C551,402,534,314,504,244C473,172,419,108,348,82C275,55,193,62,133,103C69,146,29,218,29,293C29,375,62,457,126,502C188,547,262,534,300,532",
  "M300,520C370,520,450,520,495,470C540,420,550,330,520,260C490,190,420,130,350,100C280,70,200,70,140,110C80,150,40,230,40,310C40,390,70,470,130,510C190,550,260,520,300,520",
  "M300,540C380,530,470,520,515,455C560,390,560,280,510,210C460,140,370,90,280,90C190,90,100,140,60,210C20,280,30,370,90,440C150,510,220,550,300,540",
  "M300,530C380,520,470,520,520,450C570,380,580,270,530,200C480,130,390,80,300,80C210,80,120,130,80,200C40,270,50,360,100,430C150,500,220,540,300,530",
];

const COLOR_CLASSES = [
  "item-cyan",
  "item-orange",
  "item-teal",
  "item-red",
  "item-indigo",
  "item-pink",
];

function Services() {
  const services = useSelector((state) => state.publicData.services);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="main services-page">
      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>
            End-to-end web solutions that blend creativity, functionality, and
            scalability
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {services.map((service, idx) => {
              const colorClass =
                service.colorClass || COLOR_CLASSES[idx % COLOR_CLASSES.length];
              const blobPath = BLOB_PATHS[idx % BLOB_PATHS.length];
              return (
                <div
                  key={service._id}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={(idx + 1) * 100}
                >
                  <div
                    className={`service-item ${colorClass} position-relative`}
                  >
                    <div className="icon">
                      <svg width="100" height="100" viewBox="0 0 600 600">
                        <path fill="#f5f5f5" d={blobPath} />
                      </svg>
                      <i className={`bi ${service.icon || "bi-code-slash"}`}></i>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;
