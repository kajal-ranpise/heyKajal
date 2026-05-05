import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="main contact-page">
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Let's create something amazing together — drop me a message!</p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {/* Info column */}
            <div className="col-lg-5">
              <div className="info-wrap">
                {[
                  {
                    icon: "bi-geo-alt",
                    title: "Location",
                    text: "Pune, Maharashtra, India",
                    delay: 1,
                  },
                  {
                    icon: "bi-telephone",
                    title: "Phone",
                    text: "+91 7040147091",
                    delay: 2,
                  },
                  {
                    icon: "bi-envelope",
                    title: "Email",
                    text: "kajaldranpise@gmail.com",
                    delay: 3,
                  },
                ].map((info) => (
                  <motion.div
                    key={info.title}
                    className="info-item d-flex"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={info.delay}
                  >
                    <i className={`bi ${info.icon} flex-shrink-0`}></i>
                    <div>
                      <h3>{info.title}</h3>
                      <p>{info.text}</p>
                    </div>
                  </motion.div>
                ))}

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.524959504441!2d73.83707227494386!3d18.52043098739844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0a8c9a2e69b%3A0xdaa8b7a1c1c1f8e7!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1702110000000!5m2!1sen!2sin"
                  style={{
                    border: 0,
                    width: "100%",
                    height: "240px",
                    borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map — Pune"
                />
              </div>
            </div>

            {/* Form column */}
            <motion.div
              className="col-lg-7"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <form
                action="https://formspree.io/f/xpwylbvg"
                method="POST"
                className="php-email-form"
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label htmlFor="name-field" className="pb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name-field"
                      className="form-control"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email-field" className="pb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email-field"
                      className="form-control"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="subject-field" className="pb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject-field"
                      className="form-control"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="message-field" className="pb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message-field"
                      rows="8"
                      className="form-control"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>

                  <div className="col-md-12 text-center">
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
