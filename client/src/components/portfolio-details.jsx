import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import app1 from "../assets/img/portfolio/app-1.jpg";
import product1 from "../assets/img/portfolio/product-1.jpg";
import branding1 from "../assets/img/portfolio/branding-1.jpg";
import books1 from "../assets/img/portfolio/books-1.jpg";


function PortfolioDetails() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="main portfolio-details-page">
      {/* Portfolio Details Section */}
      <section id="portfolio-details" className="portfolio-details section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Portfolio Details</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {/* Left - Swiper Slider */}
            <div className="col-lg-8">
              <Swiper
                modules={[Pagination, Autoplay]}
                loop={true}
                speed={600}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                className="portfolio-details-slider"
              >
                <SwiperSlide>
                  <img src={app1} alt="App 1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product1} alt="Product 1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={branding1} alt="Branding 1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={books1} alt="Books 1" />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Right - Project Info */}
            <div className="col-lg-4">
              <div
                className="portfolio-info"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3>Project information</h3>
                <ul>
                  <li>
                    <strong>Category</strong>: Web design
                  </li>
                  <li>
                    <strong>Client</strong>: ASU Company
                  </li>
                  <li>
                    <strong>Project date</strong>: 01 March, 2020
                  </li>
                  <li>
                    <strong>Project URL</strong>:{" "}
                    <a href="#">www.example.com</a>
                  </li>
                </ul>
              </div>
              <div
                className="portfolio-description"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2>Exercitationem repudiandae officiis neque suscipit</h2>
                <p>
                  Autem ipsum nam porro corporis rerum. Quis eos dolorem eos
                  itaque inventore commodi labore quia quia. Exercitationem
                  repudiandae officiis neque suscipit non officia eaque itaque
                  enim. Voluptatem officia accusantium nesciunt est omnis
                  tempora consectetur dignissimos. Sequi nulla at esse enim cum
                  deserunt eius.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Portfolio Details Section */}
    </main>
  );
}

export default PortfolioDetails;
