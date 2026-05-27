import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skillCategoryThunks } from '../../features/adminDataSlice';
import ConfirmModal from '../components/ConfirmModal';

const empty = { category: '', skills: '', order: 0 };

const toPayload = (data) => ({
  ...data,
  skills: data.skills
    ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [],
});

const fromRecord = (r) => ({
  ...r,
  skills: Array.isArray(r.skills) ? r.skills.join(', ') : r.skills || '',
});

function SkillCategoriesAdmin() {
  const dispatch = useDispatch();
  const skillCategories = useSelector((s) => s.adminData.skillCategories);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    dispatch(skillCategoryThunks.fetch());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    setPending({ fn: () => { dispatch(skillCategoryThunks.create(toPayload(form))); setForm(empty); setPending(null); }, msg: 'Add this skill category?' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setPending({ fn: () => { dispatch(skillCategoryThunks.update({ id: editing._id, ...toPayload(editing) })); setEditing(null); setPending(null); }, msg: 'Save changes to this category?' });
  };

  const handleDelete = (id) => {
    setPending({ fn: () => { dispatch(skillCategoryThunks.remove(id)); setPending(null); }, msg: 'Delete this skill category? This cannot be undone.', variant: 'danger' });
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
        Skill Categories
      </h2>

      <div className="admin-card">
        <h2>Add Category</h2>
        <form onSubmit={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <div className="admin-form-group">
              <label>Category Name</label>
              <input
                type="text"
                placeholder="e.g. Frontend"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Skills (comma-separated)</label>
              <input
                type="text"
                placeholder="React.js, Next.js, Redux, JavaScript (ES6+)"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="btn-admin-primary" style={{ marginTop: 4 }}>
            Add Category
          </button>
        </form>
      </div>

      {editing && (
        <div className="admin-card">
          <h2>Edit Category</h2>
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div className="admin-form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Order</label>
                <input
                  type="number"
                  value={editing.order}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                />
              </div>
              <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={editing.skills}
                  onChange={(e) => setEditing({ ...editing, skills: e.target.value })}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button type="submit" className="btn-admin-primary">Save</button>
              <button type="button" className="btn-admin-secondary" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <h2>All Categories ({skillCategories.length})</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Category</th><th>Skills</th><th>Order</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {skillCategories.map((cat) => (
              <tr key={cat._id}>
                <td><strong>{cat.category}</strong></td>
                <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{Array.isArray(cat.skills) ? cat.skills.join(', ') : cat.skills}</td>
                <td>{cat.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => setEditing(fromRecord(cat))}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => handleDelete(cat._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {skillCategories.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8' }}>No categories yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SkillCategoriesAdmin;
