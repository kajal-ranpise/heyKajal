import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminAbout, saveAdminAbout } from '../../features/adminDataSlice';
import S3FileUpload from '../components/S3FileUpload';
import ConfirmModal from '../components/ConfirmModal';

const EMPTY = { title: '', documentUrl: '', link: '' };

function AchievementsAdmin() {
  const dispatch = useDispatch();
  const about = useSelector((s) => s.adminData.about);
  const [achievements, setAchievements] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminAbout());
  }, [dispatch]);

  useEffect(() => {
    setAchievements(Array.isArray(about.achievements) ? about.achievements : []);
  }, [about]);

  const save = (updated, msg, variant) => {
    setPending({
      msg,
      variant,
      fn: () => {
        dispatch(saveAdminAbout({ ...about, achievements: updated }));
        setPending(null);
      },
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    save([...achievements, form], 'Add this achievement?');
    setForm(EMPTY);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = achievements.map((a, i) => (i === editing.idx ? editing.data : a));
    save(updated, 'Save changes to this achievement?');
    setEditing(null);
  };

  const handleDelete = (idx) => {
    const updated = achievements.filter((_, i) => i !== idx);
    save(updated, 'Delete this achievement? This cannot be undone.', 'danger');
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
        Achievements
      </h2>

      {/* Add form */}
      <div className="admin-card">
        <h2>Add Achievement</h2>
        <form onSubmit={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Title</label>
              <input
                type="text"
                placeholder="Achievement title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Certificate / Document</label>
              <S3FileUpload
                value={form.documentUrl}
                onChange={(url) => setForm((f) => ({ ...f, documentUrl: url }))}
                folder="achievements"
                label="Certificate / Document"
                accept=".pdf,.jpg,.jpeg,.png"
                contentType=""
              />
            </div>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label>URL (optional)</label>
              <input
                type="url"
                placeholder="https://..."
                value={form.link}
                onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              />
            </div>
          </div>
          <button type="submit" className="btn-admin-primary">Add</button>
        </form>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="admin-card">
          <h2>Edit Achievement</h2>
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Title</label>
                <input
                  type="text"
                  value={editing.data.title}
                  onChange={(e) => setEditing((ed) => ({ ...ed, data: { ...ed.data, title: e.target.value } }))}
                  required
                />
              </div>
              <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Certificate / Document</label>
                <S3FileUpload
                  value={editing.data.documentUrl}
                  onChange={(url) => setEditing((ed) => ({ ...ed, data: { ...ed.data, documentUrl: url } }))}
                  folder="achievements"
                  label="Certificate / Document"
                  accept=".pdf,.jpg,.jpeg,.png"
                  contentType=""
                />
              </div>
              <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                <label>URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editing.data.link}
                  onChange={(e) => setEditing((ed) => ({ ...ed, data: { ...ed.data, link: e.target.value } }))}
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

      {/* List */}
      <div className="admin-card">
        <h2>All Achievements ({achievements.length})</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Document</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((ach, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{ach.title}</td>
                <td>
                  {ach.documentUrl ? (
                    <a href={ach.documentUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>
                      View
                    </a>
                  ) : '—'}
                </td>
                <td>
                  {ach.link ? (
                    <a href={ach.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>
                      Link
                    </a>
                  ) : '—'}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-admin-secondary" onClick={() => setEditing({ idx, data: { ...ach } })}>
                      Edit
                    </button>
                    <button className="btn-admin-danger" onClick={() => handleDelete(idx)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {achievements.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8' }}>No entries yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AchievementsAdmin;
