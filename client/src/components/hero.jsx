import React from "react";
import heroBg from "../assets/img/hero-bg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Hero() {
  const about = useSelector((state) => state.publicData.about);

  return (
    <section id="hero" className="hero section">
      <img src={heroBg} alt="Hero Background" data-aos="fade-in" />

      <div
        className="container text-center"
        data-aos="zoom-out"
        data-aos-delay="100"
      >
        <div className="row">
          <div className="col-lg-8">
            <h2>{about.name || "Kajal Ranpise Test"}</h2>
            <p>
              {about.heroSubtitle ||
                "Full Stack Developer | MERN Stack | AI Enthusiast | Building Scalable Web & AI Solutions"}
            </p>
            <Link to="/about" className="btn-get-started">
              About Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
