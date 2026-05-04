import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { educationThunks } from '../../features/adminDataSlice';

const empty = { degree: '', year: '', institute: '', description: '', order: 0 };

function EducationAdmin() {
  const dispatch = useDispatch();
  const education = useSelector((s) => s.adminData.education);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(educationThunks.fetch());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(educationThunks.create(form));
    setForm(empty);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(educationThunks.update({ id: editing._id, ...editing }));
    setEditing(null);
  };

  const FormFields = ({ data, onChange, onSubmit, onCancel, submitLabel }) => (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Degree</label>
          <input type="text" value={data.degree} onChange={(e) => onChange({ ...data, degree: e.target.value })} required />
        </div>
        <div className="admin-form-group">
          <label>Year</label>
          <input type="text" placeholder="e.g. 2014 - 2018" value={data.year} onChange={(e) => onChange({ ...data, year: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Order</label>
          <input type="number" value={data.order} onChange={(e) => onChange({ ...data, order: Number(e.target.value) })} />
        </div>
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Institute</label>
          <input type="text" value={data.institute} onChange={(e) => onChange({ ...data, institute: e.target.value })} />
        </div>
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Description (optional)</label>
          <textarea value={data.description} onChange={(e) => onChange({ ...data, description: e.target.value })} rows={2} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button type="submit" className="btn-admin-primary">{submitLabel}</button>
        {onCancel && <button type="button" className="btn-admin-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>Education</h2>

      <div className="admin-card">
        <h2>Add Education</h2>
        <FormFields data={form} onChange={setForm} onSubmit={handleAdd} submitLabel="Add" />
      </div>

      {editing && (
        <div className="admin-card">
          <h2>Edit Education</h2>
          <FormFields data={editing} onChange={setEditing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} submitLabel="Save" />
        </div>
      )}

      <div className="admin-card">
        <h2>All Education ({education.length})</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Degree</th><th>Year</th><th>Institute</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {education.map((e) => (
              <tr key={e._id}>
                <td>{e.degree}</td>
                <td>{e.year}</td>
                <td>{e.institute}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => setEditing(e)}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => dispatch(educationThunks.remove(e._id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {education.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8' }}>No entries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EducationAdmin;
