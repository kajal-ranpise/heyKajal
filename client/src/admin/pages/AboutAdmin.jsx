import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminAbout, saveAdminAbout, clearSuccessMsg } from '../../features/adminDataSlice';
import S3ImageUpload from '../components/S3ImageUpload';
import S3FileUpload from '../components/S3FileUpload';
import ConfirmModal from '../components/ConfirmModal';

const EMPTY_ACHIEVEMENT = { title: '', documentUrl: '', link: '' };

const fields = [
  { key: 'name', label: 'Full Name' },
  { key: 'role', label: 'Role / Title' },
  { key: 'shortDescription', label: 'Short Description (italic, shown below title)', textarea: true },
  { key: 'longDescription', label: 'Long Description (paragraph, shown above details)', textarea: true },
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
  const [pending, setPending] = useState(null);

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
    setPending({ fn: () => { dispatch(saveAdminAbout(form)); setPending(null); }, msg: 'Save changes to About Info?' });
  };

  return (
    <div>
      {pending && (
        <ConfirmModal
          message={pending.msg}
          variant={pending.variant}
          onConfirm={pending.fn}
          onCancel={() => setPending(null)}
        />
      )}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>
        About Info
      </h2>

      {successMsg && <div className="admin-success">{successMsg}</div>}

      <div className="admin-card">
        <h2>Edit About Details</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Profile Image</label>
              <S3ImageUpload
                value={form.profileImg}
                onChange={(url) => handleChange('profileImg', url)}
                folder="profile"
                label="Profile Image"
              />
            </div>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Resume (PDF)</label>
              <S3FileUpload
                value={form.resumeUrl}
                onChange={(url) => handleChange('resumeUrl', url)}
                folder="resume"
                label="Resume PDF"
              />
            </div>
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

            {[
              { key: 'accomplishments', label: 'Key Accomplishments (one per line)' },
              { key: 'coreCompetencies', label: 'Core Competencies (one per line)' },
            ].map(({ key, label }) => (
              <div className="admin-form-group" key={key} style={{ gridColumn: '1 / -1' }}>
                <label>{label}</label>
                <textarea
                  value={Array.isArray(form[key]) ? form[key].join('\n') : (form[key] || '')}
                  onChange={(e) => handleChange(key, e.target.value.split('\n'))}
                  rows={4}
                  placeholder="One item per line"
                />
              </div>
            ))}

            {/* Achievements — title + optional document upload */}
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Achievements</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(Array.isArray(form.achievements) && form.achievements.length > 0 ? form.achievements : [EMPTY_ACHIEVEMENT]).map((ach, idx) => (
                  <div
                    key={idx}
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}
                  >
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Achievement title"
                        value={ach.title || ''}
                        onChange={(e) => {
                          const updated = [...(form.achievements || [EMPTY_ACHIEVEMENT])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          handleChange('achievements', updated);
                        }}
                        style={{ flex: 1 }}
                      />
                      {(form.achievements || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleChange('achievements', (form.achievements || []).filter((_, i) => i !== idx))}
                          style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, width: 30, height: 30, cursor: 'pointer', fontWeight: 700, fontSize: 16, flexShrink: 0 }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                        Document Upload
                      </div>
                      <S3FileUpload
                        value={ach.documentUrl || ''}
                        onChange={(url) => {
                          const updated = [...(form.achievements || [EMPTY_ACHIEVEMENT])];
                          updated[idx] = { ...updated[idx], documentUrl: url };
                          handleChange('achievements', updated);
                        }}
                        folder="achievements"
                        label="Certificate / Document"
                        accept=".pdf,.jpg,.jpeg,.png"
                        contentType=""
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                        URL
                      </div>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={ach.link || ''}
                        onChange={(e) => {
                          const updated = [...(form.achievements || [EMPTY_ACHIEVEMENT])];
                          updated[idx] = { ...updated[idx], link: e.target.value };
                          handleChange('achievements', updated);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleChange('achievements', [...(form.achievements || []), { ...EMPTY_ACHIEVEMENT }])}
                  style={{ alignSelf: 'flex-start', background: 'none', border: '1px dashed #94a3b8', borderRadius: 6, padding: '6px 14px', fontSize: '0.8rem', color: '#64748b', cursor: 'pointer' }}
                >
                  + Add Achievement
                </button>
              </div>
            </div>
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
