import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skillThunks } from '../../features/adminDataSlice';

const empty = { name: '', val: 50, order: 0 };

function SkillsAdmin() {
  const dispatch = useDispatch();
  const skills = useSelector((s) => s.adminData.skills);
  const [newSkill, setNewSkill] = useState(empty);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(skillThunks.fetch());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(skillThunks.create(newSkill));
    setNewSkill(empty);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(skillThunks.update({ id: editing._id, ...editing }));
    setEditing(null);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>
        Skills
      </h2>

      <div className="admin-card">
        <h2>Add Skill</h2>
        <form onSubmit={handleAdd}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Skill Name</label>
              <input
                type="text"
                placeholder="e.g. React"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Value (0-100)</label>
              <input
                type="number"
                min="0" max="100"
                value={newSkill.val}
                onChange={(e) => setNewSkill({ ...newSkill, val: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-group">
              <label>Order</label>
              <input
                type="number"
                value={newSkill.order}
                onChange={(e) => setNewSkill({ ...newSkill, order: Number(e.target.value) })}
              />
            </div>
            <button type="submit" className="btn-admin-primary" style={{ alignSelf: 'flex-end', marginBottom: 0 }}>
              Add
            </button>
          </div>
        </form>
      </div>

      {editing && (
        <div className="admin-card">
          <h2>Edit Skill</h2>
          <form onSubmit={handleUpdate}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Value</label>
                <input
                  type="number" min="0" max="100"
                  value={editing.val}
                  onChange={(e) => setEditing({ ...editing, val: Number(e.target.value) })}
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
              <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-end' }}>
                <button type="submit" className="btn-admin-primary">Save</button>
                <button type="button" className="btn-admin-secondary" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <h2>All Skills ({skills.length})</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, background: '#e2e8f0', borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${s.val}%`, background: '#3b82f6', height: '100%', borderRadius: 4 }} />
                    </div>
                    {s.val}%
                  </div>
                </td>
                <td>{s.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => setEditing(s)}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => dispatch(skillThunks.remove(s._id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8' }}>No skills yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SkillsAdmin;
