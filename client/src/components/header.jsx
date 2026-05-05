import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/resume", label: "Resume" },
  { path: "/services", label: "Services" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

function Header() {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`header d-flex align-items-center light-background sticky-top ${scrolled ? "scrolled" : ""}`}
      >
        <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
            <motion.h1
              className="sitename"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Kajal
            </motion.h1>
          </Link>

          {/* Desktop Nav */}
          <nav id="navmenu" className="navmenu d-none d-xl-block">
            <ul>
              {menuItems.map((item, idx) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Right: social + dark toggle + hamburger */}
          <div className="header-social-links d-flex align-items-center">
            <a
              href="https://github.com/kajal-ranpise"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/kajal-ranpise"
              className="linkedin"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="mailto:kajaldranpise@gmail.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
            >
              <i className="bi bi-envelope"></i>
            </a>

            <motion.button
              className="theme-toggle"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              whileTap={{ scale: 0.88 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.i
                  key={theme}
                  className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`}
                  initial={{ rotate: -80, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 80, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </motion.button>

            {/* Hamburger — mobile only */}
            <motion.button
              className="d-xl-none ms-2"
              style={{
                background: "none",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--default-color)",
                fontSize: "18px",
                flexShrink: 0,
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
              whileTap={{ scale: 0.9 }}
            >
              <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"}`}></i>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 9996,
              }}
            />

            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "min(300px, 85vw)",
                height: "100dvh",
                background: "var(--surface-color)",
                zIndex: 9997,
                padding: "72px 24px 32px",
                boxShadow: "-8px 0 40px rgba(0,0,0,0.18)",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    style={{
                      display: "block",
                      padding: "14px 0",
                      fontSize: "16px",
                      fontFamily: "var(--nav-font)",
                      fontWeight: location.pathname === item.path ? "700" : "500",
                      color:
                        location.pathname === item.path
                          ? "var(--accent-color)"
                          : "var(--heading-color)",
                      borderBottom: "1px solid var(--border-color)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Social links in drawer */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "auto",
                  paddingTop: "24px",
                }}
              >
                <a
                  href="https://github.com/kajal-ranpise"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--default-color)", fontSize: "20px" }}
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/kajal-ranpise"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--default-color)", fontSize: "20px" }}
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="mailto:kajaldranpise@gmail.com"
                  style={{ color: "var(--default-color)", fontSize: "20px" }}
                >
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
