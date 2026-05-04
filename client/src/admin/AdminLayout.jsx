import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/adminAuthSlice';
import './admin.css';

const navItems = [
  { to: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
  { to: '/admin/about', icon: 'bi-person', label: 'About' },
  { to: '/admin/skills', icon: 'bi-bar-chart', label: 'Skills' },
  { to: '/admin/stats', icon: 'bi-trophy', label: 'Stats' },
  { to: '/admin/education', icon: 'bi-mortarboard', label: 'Education' },
  { to: '/admin/experience', icon: 'bi-briefcase', label: 'Experience' },
  { to: '/admin/projects', icon: 'bi-folder', label: 'Projects' },
  { to: '/admin/services', icon: 'bi-gear', label: 'Services' },
];

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <i className="bi bi-shield-lock me-2"></i> Admin Panel
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
            >
              <i className={`bi ${item.icon}`}></i>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Portfolio Admin</h1>
          <span>Kajal Ranpise</span>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
