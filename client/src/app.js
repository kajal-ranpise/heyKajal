import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {
  fetchAbout,
  fetchSkills,
  fetchStats,
  fetchEducation,
  fetchExperience,
  fetchProjects,
  fetchServices,
} from "./features/publicDataSlice";
import Header from "./components/header";
import Footer from "./components/footer";
import Profile from "./components/profile";
import ProjectDetails from "./components/project-details";
import About from "./components/about";
import Resume from "./components/resume";
import Services from "./components/services";
import Projects from "./components/projects";
import Contact from "./components/contact";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import PrivateRoute from "./admin/PrivateRoute";
import AboutAdmin from "./admin/pages/AboutAdmin";
import SkillsAdmin from "./admin/pages/SkillsAdmin";
import StatsAdmin from "./admin/pages/StatsAdmin";
import EducationAdmin from "./admin/pages/EducationAdmin";
import ExperienceAdmin from "./admin/pages/ExperienceAdmin";
import ProjectsAdmin from "./admin/pages/ProjectsAdmin";
import ServicesAdmin from "./admin/pages/ServicesAdmin";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import GLightbox from "glightbox";
import Swiper from "swiper";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 60 });
    GLightbox();
    new Swiper(".swiper", { loop: true });
    dispatch(fetchAbout());
    dispatch(fetchSkills());
    dispatch(fetchStats());
    dispatch(fetchEducation());
    dispatch(fetchExperience());
    dispatch(fetchProjects());
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Admin routes — no Header/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="stats" element={<StatsAdmin />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
        </Route>

        {/* Public portfolio routes */}
        <Route
          path="*"
          element={
            <div className="d-flex flex-column min-vh-100">
              <Header />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project-details/:id" element={<ProjectDetails />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
