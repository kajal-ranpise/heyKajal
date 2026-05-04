import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { experienceThunks } from '../../features/adminDataSlice';

const empty = { title: '', company: '', year: '', responsibilities: [''], order: 0 };

function ExperienceAdmin() {
  const dispatch = useDispatch();
  const experience = useSelector((s) => s.adminData.experience);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(experienceThunks.fetch());
  }, [dispatch]);

  const updateResp = (data, setData, idx, val) => {
    const resp = [...data.responsibilities];
    resp[idx] = val;
    setData({ ...data, responsibilities: resp });
  };

  const addResp = (data, setData) =>
    setData({ ...data, responsibilities: [...data.responsibilities, ''] });

  const removeResp = (data, setData, idx) => {
    const resp = data.responsibilities.filter((_, i) => i !== idx);
    setData({ ...data, responsibilities: resp });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(experienceThunks.create({ ...form, responsibilities: form.responsibilities.filter(Boolean) }));
    setForm(empty);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(experienceThunks.update({
      id: editing._id,
      ...editing,
      responsibilities: editing.responsibilities.filter(Boolean),
    }));
    setEditing(null);
  };

  const ExperienceForm = ({ data, setData, onSubmit, onCancel, submitLabel }) => (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div className="admin-form-group">
          <label>Job Title</label>
          <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} required />
        </div>
        <div className="admin-form-group">
          <label>Company</label>
          <input type="text" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Year / Period</label>
          <input type="text" placeholder="e.g. 2021 - Present" value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Order</label>
          <input type="number" value={data.order} onChange={(e) => setData({ ...data, order: Number(e.target.value) })} />
        </div>
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Responsibilities</label>
          {data.responsibilities.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                value={r}
                onChange={(e) => updateResp(data, setData, i, e.target.value)}
                placeholder={`Responsibility ${i + 1}`}
              />
              <button type="button" className="btn-admin-danger" onClick={() => removeResp(data, setData, i)}>×</button>
            </div>
          ))}
          <button type="button" className="btn-admin-secondary" onClick={() => addResp(data, setData)}>
            + Add Responsibility
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" className="btn-admin-primary">{submitLabel}</button>
        {onCancel && <button type="button" className="btn-admin-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>Experience</h2>

      <div className="admin-card">
        <h2>Add Experience</h2>
        <ExperienceForm data={form} setData={setForm} onSubmit={handleAdd} submitLabel="Add" />
      </div>

      {editing && (
        <div className="admin-card">
          <h2>Edit Experience</h2>
          <ExperienceForm data={editing} setData={setEditing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} submitLabel="Save" />
        </div>
      )}

      <div className="admin-card">
        <h2>All Experience ({experience.length})</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Company</th><th>Year</th><th>Responsibilities</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {experience.map((exp) => (
              <tr key={exp._id}>
                <td><strong>{exp.title}</strong></td>
                <td>{exp.company}</td>
                <td>{exp.year}</td>
                <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {exp.responsibilities?.length} item(s)
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => setEditing({ ...exp, responsibilities: exp.responsibilities || [''] })}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => dispatch(experienceThunks.remove(exp._id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {experience.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8' }}>No entries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExperienceAdmin;
