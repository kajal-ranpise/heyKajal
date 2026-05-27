import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectThunks } from '../../features/adminDataSlice';
import S3ImageUpload from '../components/S3ImageUpload';
import ConfirmModal from '../components/ConfirmModal';

const CATEGORIES = ['filter-react', 'filter-node', 'filter-php', 'filter-mysql', 'filter-mongodb'];

const EMPTY_CHALLENGE = { challenge: '', solution: '' };

const empty = {
  slug: '', title: '', desc: '', industry: '', tech: '', category: [],
  imgUrl: '', liveUrl: '', githubUrl: '', features: '',
  responsibilities: '', challenges: [EMPTY_CHALLENGE], outcome: '',
  client: '', year: '', order: 0,
};

const toggleCategory = (data, setData, cat) => {
  const cats = data.category.includes(cat)
    ? data.category.filter((c) => c !== cat)
    : [...data.category, cat];
  setData({ ...data, category: cats });
};

const Field = ({ label, children, span }) => (
  <div className="admin-form-group" style={span ? { gridColumn: '1 / -1' } : {}}>
    <label>{label}</label>
    {children}
  </div>
);

const ProjectForm = ({ data, setData, onSubmit, onCancel, submitLabel }) => {
  const challenges = data.challenges || [EMPTY_CHALLENGE];

  const addPair = () =>
    setData({ ...data, challenges: [...challenges, { challenge: '', solution: '' }] });

  const removePair = (idx) =>
    setData({ ...data, challenges: challenges.filter((_, i) => i !== idx) });

  const updatePair = (idx, field, value) =>
    setData({
      ...data,
      challenges: challenges.map((c, i) => (i === idx ? { ...c, [field]: value } : c)),
    });

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>

        {/* Basic info */}
        <Field label="Slug (unique ID)">
          <input type="text" value={data.slug} onChange={(e) => setData({ ...data, slug: e.target.value })} required />
        </Field>
        <Field label="Title">
          <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} required />
        </Field>
        <Field label="Short Description" span>
          <textarea value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} rows={2} />
        </Field>

        {/* Meta */}
        <Field label="Industry">
          <input type="text" value={data.industry} onChange={(e) => setData({ ...data, industry: e.target.value })} />
        </Field>
        <Field label="Client">
          <input type="text" value={data.client} onChange={(e) => setData({ ...data, client: e.target.value })} />
        </Field>
        <Field label="Year">
          <input type="number" value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} />
        </Field>
        <Field label="Order">
          <input type="number" value={data.order} onChange={(e) => setData({ ...data, order: Number(e.target.value) })} />
        </Field>

        {/* Image */}
        <Field label="Project Image" span>
          <S3ImageUpload
            value={data.imgUrl}
            onChange={(url) => setData({ ...data, imgUrl: url })}
            folder="projects"
            label="Project Image"
          />
        </Field>

        {/* Links */}
        <Field label="Live Demo URL">
          <input type="url" placeholder="https://..." value={data.liveUrl} onChange={(e) => setData({ ...data, liveUrl: e.target.value })} />
        </Field>
        <Field label="GitHub URL">
          <input type="url" placeholder="https://github.com/..." value={data.githubUrl} onChange={(e) => setData({ ...data, githubUrl: e.target.value })} />
        </Field>

        {/* Arrays */}
        <Field label="Tech Stack (comma-separated)" span>
          <input type="text" placeholder="React, Node.js, MySQL" value={data.tech} onChange={(e) => setData({ ...data, tech: e.target.value })} />
        </Field>
        <Field label="Key Features (comma-separated)" span>
          <input type="text" placeholder="Feature 1, Feature 2, ..." value={data.features} onChange={(e) => setData({ ...data, features: e.target.value })} />
        </Field>
        <Field label="Your Responsibilities (comma-separated)" span>
          <textarea
            placeholder="Built the REST API, Designed the database schema, ..."
            value={data.responsibilities}
            onChange={(e) => setData({ ...data, responsibilities: e.target.value })}
            rows={2}
          />
        </Field>

        {/* Challenges & Solutions — dynamic pairs */}
        <Field label="Challenges & Solutions" span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {challenges.map((pair, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr auto',
                  gap: 8,
                  alignItems: 'flex-start',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '10px 12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                    Challenge
                  </div>
                  <input
                    type="text"
                    placeholder="What was the challenge?"
                    value={pair.challenge}
                    onChange={(e) => updatePair(idx, 'challenge', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34b7a7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                    Solution
                  </div>
                  <input
                    type="text"
                    placeholder="How was it solved?"
                    value={pair.solution}
                    onChange={(e) => updatePair(idx, 'solution', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                {challenges.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePair(idx)}
                    style={{
                      marginTop: 22,
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: 6,
                      width: 30,
                      height: 30,
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPair}
              style={{
                alignSelf: 'flex-start',
                background: 'none',
                border: '1px dashed #94a3b8',
                borderRadius: 6,
                padding: '6px 14px',
                fontSize: '0.8rem',
                color: '#64748b',
                cursor: 'pointer',
              }}
            >
              + Add Challenge
            </button>
          </div>
        </Field>

        <Field label="Project Outcome" span>
          <textarea
            placeholder="Describe the result, impact, or metrics achieved..."
            value={data.outcome}
            onChange={(e) => setData({ ...data, outcome: e.target.value })}
            rows={2}
          />
        </Field>

        {/* Categories */}
        <Field label="Filter Categories" span>
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
        </Field>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" className="btn-admin-primary">{submitLabel}</button>
        {onCancel && <button type="button" className="btn-admin-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

const toArray = (val) => val ? val.split(',').map((s) => s.trim()).filter(Boolean) : [];

const toPayload = (data) => ({
  ...data,
  tech: toArray(data.tech),
  features: toArray(data.features),
  responsibilities: toArray(data.responsibilities),
  challenges: (data.challenges || []).filter((c) => c.challenge || c.solution),
  year: data.year ? Number(data.year) : undefined,
});

const fromRecord = (p) => ({
  ...p,
  tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech || '',
  features: Array.isArray(p.features) ? p.features.join(', ') : p.features || '',
  responsibilities: Array.isArray(p.responsibilities) ? p.responsibilities.join(', ') : p.responsibilities || '',
  challenges: Array.isArray(p.challenges) && p.challenges.length > 0
    ? p.challenges.map((c) =>
        typeof c === 'object' && (c.challenge !== undefined || c.solution !== undefined)
          ? { challenge: c.challenge || '', solution: c.solution || '' }
          : { challenge: String(c), solution: '' }
      )
    : [EMPTY_CHALLENGE],
  year: p.year || '',
  liveUrl: p.liveUrl || '',
  githubUrl: p.githubUrl || '',
  outcome: p.outcome || '',
});

function ProjectsAdmin() {
  const dispatch = useDispatch();
  const projects = useSelector((s) => s.adminData.projects);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    dispatch(projectThunks.fetch());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    setPending({ fn: () => { dispatch(projectThunks.create(toPayload(form))); setForm(empty); setShowForm(false); setPending(null); }, msg: 'Add this project?' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setPending({ fn: () => { dispatch(projectThunks.update({ id: editing._id, ...toPayload(editing) })); setEditing(null); setPending(null); }, msg: 'Save changes to this project?' });
  };

  const handleDelete = (id) => {
    setPending({ fn: () => { dispatch(projectThunks.remove(id)); setPending(null); }, msg: 'Delete this project? This cannot be undone.', variant: 'danger' });
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
                <td>
                  <strong>{p.title}</strong><br />
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.slug}</span>
                </td>
                <td>{p.industry}</td>
                <td style={{ fontSize: '0.8rem' }}>{Array.isArray(p.tech) ? p.tech.join(', ') : p.tech}</td>
                <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.category?.join(', ')}</td>
                <td>{p.year}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => { setEditing(fromRecord(p)); setShowForm(false); }}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => handleDelete(p._id)}>Delete</button>
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
