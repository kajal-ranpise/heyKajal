import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminAbout, saveAdminAbout, clearSuccessMsg } from '../../features/adminDataSlice';

const fields = [
  { key: 'name', label: 'Full Name' },
  { key: 'role', label: 'Role / Title' },
  { key: 'heroTitle', label: 'Hero Title' },
  { key: 'heroSubtitle', label: 'Hero Subtitle', textarea: true },
  { key: 'description', label: 'About Description', textarea: true },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'location', label: 'Location' },
  { key: 'degree', label: 'Degree' },
  { key: 'availability', label: 'Availability' },
  { key: 'dob', label: 'Date of Birth (YYYY-MM-DD)' },
  { key: 'github', label: 'GitHub URL' },
  { key: 'linkedin', label: 'LinkedIn URL' },
];

function AboutAdmin() {
  const dispatch = useDispatch();
  const { about, successMsg } = useSelector((s) => s.adminData);
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(fetchAdminAbout());
  }, [dispatch]);

  useEffect(() => {
    setForm(about || {});
  }, [about]);

  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => dispatch(clearSuccessMsg()), 3000);
      return () => clearTimeout(t);
    }
  }, [successMsg, dispatch]);

  const handleChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveAdminAbout(form));
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>
        About Info
      </h2>

      {successMsg && <div className="admin-success">{successMsg}</div>}

      <div className="admin-card">
        <h2>Edit About Details</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            {fields.map(({ key, label, textarea }) => (
              <div
                className="admin-form-group"
                key={key}
                style={textarea ? { gridColumn: '1 / -1' } : {}}
              >
                <label>{label}</label>
                {textarea ? (
                  <textarea
                    value={form[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    value={form[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="btn-admin-primary" style={{ marginTop: 8 }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default AboutAdmin;
