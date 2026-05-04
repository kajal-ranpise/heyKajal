import React from "react";

function Footer() {
  return (
    <footer id="footer" className="footer light-background">
      <div className="container">
        <div className="copyright text-center">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Kajal</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </div>

        <div className="social-links d-flex justify-content-center">
          {/* <a href="#"><i className="bi bi-twitter-x"></i></a> */}
     {/*      <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a> */}
          <a href="https://github.com/kajal-ranpise"  target="_blank"><i className="bi bi-github"></i></a>
          <a href="https://www.linkedin.com/in/kajal-ranpise"  target="_blank"><i className="bi bi-linkedin"></i></a>
          <a href="mailto:kajaldranpise@gmail.com" target="_blank"><i class="bi bi-envelope"></i></a>
        </div>

      {/*   <div className="credits">
          Designed by{" "}
          <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
