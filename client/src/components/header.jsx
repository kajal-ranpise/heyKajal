import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/resume", label: "Resume" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="header d-flex align-items-center light-background sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">Kajal</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div className="header-social-links">
           {/*          <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
          <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
          <a href="#" className="instagram"><i className="bi bi-instagram"></i></a> */}
          <a href="https://github.com/kajal-ranpise" target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a>
          <a href="https://www.linkedin.com/in/kajal-ranpise" className="linkedin"><i className="bi bi-linkedin"></i></a>
          <a href="mailto:kajaldranpise@gmail.com" target="_blank" rel="noreferrer"><i className="bi bi-envelope"></i></a>
        </div>
      </div>
    </header>
  );
}

export default Header;