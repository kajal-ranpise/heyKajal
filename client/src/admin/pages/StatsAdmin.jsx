import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statThunks } from '../../features/adminDataSlice';

const empty = { label: '', end: 0, order: 0 };

function StatsAdmin() {
  const dispatch = useDispatch();
  const stats = useSelector((s) => s.adminData.stats);
  const [newStat, setNewStat] = useState(empty);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(statThunks.fetch());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(statThunks.create(newStat));
    setNewStat(empty);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(statThunks.update({ id: editing._id, ...editing }));
    setEditing(null);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>
        Stats / Facts
      </h2>

      <div className="admin-card">
        <h2>Add Stat</h2>
        <form onSubmit={handleAdd}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Label</label>
              <input
                type="text"
                placeholder="e.g. Projects"
                value={newStat.label}
                onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Count</label>
              <input
                type="number" min="0"
                value={newStat.end}
                onChange={(e) => setNewStat({ ...newStat, end: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-group">
              <label>Order</label>
              <input
                type="number"
                value={newStat.order}
                onChange={(e) => setNewStat({ ...newStat, order: Number(e.target.value) })}
              />
            </div>
            <button type="submit" className="btn-admin-primary" style={{ alignSelf: 'flex-end' }}>Add</button>
          </div>
        </form>
      </div>

      {editing && (
        <div className="admin-card">
          <h2>Edit Stat</h2>
          <form onSubmit={handleUpdate}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Label</label>
                <input type="text" value={editing.label}
                  onChange={(e) => setEditing({ ...editing, label: e.target.value })} />
              </div>
              <div className="admin-form-group">
                <label>Count</label>
                <input type="number" value={editing.end}
                  onChange={(e) => setEditing({ ...editing, end: Number(e.target.value) })} />
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
        <h2>All Stats ({stats.length})</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Label</th><th>Count</th><th>Order</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s._id}>
                <td>{s.label}</td>
                <td><strong style={{ fontSize: '1.2rem' }}>{s.end}</strong></td>
                <td>{s.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => setEditing(s)}>Edit</button>
                    <button className="btn-admin-danger" onClick={() => dispatch(statThunks.remove(s._id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {stats.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8' }}>No stats yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsAdmin;
