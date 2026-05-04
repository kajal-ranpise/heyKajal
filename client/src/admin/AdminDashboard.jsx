import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { skillThunks, statThunks, educationThunks, experienceThunks, projectThunks, serviceThunks } from '../features/adminDataSlice';

function AdminDashboard() {
  const dispatch = useDispatch();
  const { skills, stats, education, experience, projects, services } = useSelector((s) => s.adminData);

  useEffect(() => {
    dispatch(skillThunks.fetch());
    dispatch(statThunks.fetch());
    dispatch(educationThunks.fetch());
    dispatch(experienceThunks.fetch());
    dispatch(projectThunks.fetch());
    dispatch(serviceThunks.fetch());
  }, [dispatch]);

  const counts = [
    { label: 'Skills', count: skills.length, to: '/admin/skills', color: '#3b82f6' },
    { label: 'Stats', count: stats.length, to: '/admin/stats', color: '#10b981' },
    { label: 'Education', count: education.length, to: '/admin/education', color: '#f59e0b' },
    { label: 'Experience', count: experience.length, to: '/admin/experience', color: '#8b5cf6' },
    { label: 'Projects', count: projects.length, to: '/admin/projects', color: '#ef4444' },
    { label: 'Services', count: services.length, to: '/admin/services', color: '#06b6d4' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>
        Dashboard Overview
      </h2>

      <div className="admin-dashboard-grid">
        {counts.map((c) => (
          <Link key={c.label} to={c.to} style={{ textDecoration: 'none' }}>
            <div className="admin-stat-card" style={{ borderTopColor: c.color }}>
              <h3 style={{ color: c.color }}>{c.count}</h3>
              <p>{c.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <h2>Quick Links</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { label: 'Edit About Info', to: '/admin/about' },
            { label: 'Manage Projects', to: '/admin/projects' },
            { label: 'Update Resume', to: '/admin/education' },
            { label: 'Manage Services', to: '/admin/services' },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="btn-admin-primary" style={{ textDecoration: 'none' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
