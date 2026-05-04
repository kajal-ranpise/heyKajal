import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectThunks } from '../../features/adminDataSlice';

const CATEGORIES = ['filter-react', 'filter-node', 'filter-php', 'filter-mysql', 'filter-mongodb'];

const empty = {
  slug: '', title: '', desc: '', industry: '', tech: '', category: [],
  imgUrl: '', features: '', client: '', year: '', order: 0,
};

function ProjectsAdmin() {
  const dispatch = useDispatch();
  const projects = useSelector((s) => s.adminData.projects);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(projectThunks.fetch());
  }, [dispatch]);

  const toggleCategory = (data, setData, cat) => {
    const cats = data.category.includes(cat)
      ? data.category.filter((c) => c !== cat)
      : [...data.category, cat];
    setData({ ...data, category: cats });
  };

  const toPayload = (data) => ({
    ...data,
    tech: data.tech ? data.tech.split(',').map((s) => s.trim()).filter(Boolean) : [],
    features: data.features ? data.features.split(',').map((s) => s.trim()).filter(Boolean) : [],
    year: data.year ? Number(data.year) : undefined,
  });

  const fromRecord = (p) => ({
    ...p,
    tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech || '',
    features: Array.isArray(p.features) ? p.features.join(', ') : p.features || '',
    year: p.year || '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(projectThunks.create(toPayload(form)));
    setForm(empty);
    setShowForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(projectThunks.update({ id: editing._id, ...toPayload(editing) }));
    setEditing(null);
  };

  const ProjectForm = ({ data, setData, onSubmit, onCancel, submitLabel }) => (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div className="admin-form-group">
          <label>Slug (unique ID)</label>
          <input type="text" value={data.slug} onChange={(e) => setData({ ...data, slug: e.target.value })} required />
        </div>
        <div className="admin-form-group">
          <label>Title</label>
          <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} required />
        </div>
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Description</label>
          <textarea value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} rows={2} />
        </div>
        <div className="admin-form-group">
          <label>Industry</label>
          <input type="text" value={data.industry} onChange={(e) => setData({ ...data, industry: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Tech Stack (comma-separated)</label>
          <input type="text" placeholder="React, Node.js, MySQL" value={data.tech} onChange={(e) => setData({ ...data, tech: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Client</label>
          <input type="text" value={data.client} onChange={(e) => setData({ ...data, client: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Year</label>
          <input type="number" value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Image URL / path</label>
          <input type="text" value={data.imgUrl} onChange={(e) => setData({ ...data, imgUrl: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Order</label>
          <input type="number" value={data.order} onChange={(e) => setData({ ...data, order: Number(e.target.value) })} />
        </div>
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Features (comma-separated)</label>
          <input type="text" value={data.features} onChange={(e) => setData({ ...data, features: e.target.value })} />
        </div>
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Filter Categories</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {CATEGORIES.map((cat) => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={data.category.includes(cat)}
                  onChange={() => toggleCategory(data, setData, cat)}
                />
                {cat.replace('filter-', '')}
              </label>
            ))}
          </div>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Projects</h2>
        <button className="btn-admin-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <div className="admin-card">
          <h2>Add Project</h2>
          <ProjectForm data={form} setData={setForm} onSubmit={handleAdd} submitLabel="Add Project" />
        </div>
      )}

      {editing && (
        <div className="admin-card">
          <h2>Edit Project</h2>
          <ProjectForm data={editing} setData={setEditing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} submitLabel="Save" />
        </div>
      )}

      <div className="admin-card">
        <h2>All Projects ({projects.length})</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Industry</th><th>Tech</th><th>Categories</th><th>Year</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td><strong>{p.title}</strong><br /><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.slug}</span></td>
                <td>{p.industry}</td>
                <td style={{ fontSize: '0.8rem' }}>{Array.isArray(p.tech) ? p.tech.join(', ') : p.tech}</td>
                <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.category?.join(', ')}</td>
                <td>{p.year}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => { setEditing(fromRecord(p)); setShowForm(false); }}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => dispatch(projectThunks.remove(p._id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8' }}>No projects yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsAdmin;
