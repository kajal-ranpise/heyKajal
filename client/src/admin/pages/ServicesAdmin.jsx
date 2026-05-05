import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serviceThunks } from '../../features/adminDataSlice';

const COLOR_CLASSES = ['item-cyan', 'item-orange', 'item-teal', 'item-red', 'item-indigo', 'item-pink'];
const ICONS = [
  'bi-laptop', 'bi-server', 'bi-code-slash', 'bi-database',
  'bi-diagram-3', 'bi-cloud-upload', 'bi-shield-lock', 'bi-gear',
  'bi-phone', 'bi-globe', 'bi-graph-up', 'bi-people',
];

const empty = { title: '', description: '', colorClass: 'item-cyan', icon: 'bi-code-slash', order: 0 };

const ServiceForm = ({ data, setData, onSubmit, onCancel, submitLabel }) => (
  <form onSubmit={onSubmit}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
      <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
        <label>Title</label>
        <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} required />
      </div>
      <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
        <label>Description</label>
        <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={3} required />
      </div>
      <div className="admin-form-group">
        <label>Color Class</label>
        <select value={data.colorClass} onChange={(e) => setData({ ...data, colorClass: e.target.value })}>
          {COLOR_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="admin-form-group">
        <label>Icon (Bootstrap Icon class)</label>
        <select value={data.icon} onChange={(e) => setData({ ...data, icon: e.target.value })}>
          {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
        </select>
      </div>
      <div className="admin-form-group">
        <label>Order</label>
        <input type="number" value={data.order} onChange={(e) => setData({ ...data, order: Number(e.target.value) })} />
      </div>
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      <button type="submit" className="btn-admin-primary">{submitLabel}</button>
      {onCancel && <button type="button" className="btn-admin-secondary" onClick={onCancel}>Cancel</button>}
    </div>
  </form>
);

function ServicesAdmin() {
  const dispatch = useDispatch();
  const services = useSelector((s) => s.adminData.services);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(serviceThunks.fetch());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(serviceThunks.create(form));
    setForm(empty);
    setShowForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(serviceThunks.update({ id: editing._id, ...editing }));
    setEditing(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Services</h2>
        <button className="btn-admin-primary" onClick={() => { setShowForm(!showForm); setEditing(null); }}>
          {showForm ? 'Cancel' : '+ Add Service'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card">
          <h2>Add Service</h2>
          <ServiceForm data={form} setData={setForm} onSubmit={handleAdd} submitLabel="Add Service" />
        </div>
      )}

      {editing && (
        <div className="admin-card">
          <h2>Edit Service</h2>
          <ServiceForm data={editing} setData={setEditing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} submitLabel="Save" />
        </div>
      )}

      <div className="admin-card">
        <h2>All Services ({services.length})</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Icon</th><th>Color</th><th>Order</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>
                  <strong>{s.title}</strong>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{s.description?.substring(0, 60)}…</p>
                </td>
                <td><i className={`bi ${s.icon}`} style={{ fontSize: '1.2rem' }}></i> <span style={{ fontSize: '0.8rem' }}>{s.icon}</span></td>
                <td><span style={{ padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', fontSize: '0.8rem' }}>{s.colorClass}</span></td>
                <td>{s.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => { setEditing(s); setShowForm(false); }}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => dispatch(serviceThunks.remove(s._id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8' }}>No services yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServicesAdmin;
