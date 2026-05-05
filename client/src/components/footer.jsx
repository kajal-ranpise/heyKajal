import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://github.com/kajal-ranpise",
    icon: "bi-github",
    label: "GitHub",
    rel: "noreferrer",
    target: "_blank",
  },
  {
    href: "https://www.linkedin.com/in/kajal-ranpise",
    icon: "bi-linkedin",
    label: "LinkedIn",
    rel: "noreferrer",
    target: "_blank",
  },
  {
    href: "mailto:kajaldranpise@gmail.com",
    icon: "bi-envelope",
    label: "Email",
    rel: undefined,
    target: "_blank",
  },
];

function Footer() {
  return (
    <footer id="footer" className="footer light-background">
      <div className="container">
        <div className="copyright text-center">
          <p style={{ color: "var(--default-color)", fontSize: "14px" }}>
            © {new Date().getFullYear()}{" "}
            <strong className="px-1 sitename" style={{ color: "var(--accent-color)" }}>
              Kajal Ranpise
            </strong>{" "}
            · All Rights Reserved
          </p>
        </div>

        <div className="social-links d-flex justify-content-center" style={{ marginTop: "16px" }}>
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.rel}
              aria-label={link.label}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2 }}
            >
              <i className={`bi ${link.icon}`}></i>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
