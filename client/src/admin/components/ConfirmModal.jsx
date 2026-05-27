import React from 'react';

const overlay = {
  position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
};

const box = {
  background: '#fff', borderRadius: 12, padding: '28px 32px', maxWidth: 400, width: '90%',
  boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
};

export default function ConfirmModal({ message = 'Are you sure?', variant = 'primary', onConfirm, onCancel }) {
  const confirmClass = variant === 'danger' ? 'btn-admin-danger' : 'btn-admin-primary';
  return (
    <div style={overlay} onClick={onCancel}>
      <div style={box} onClick={(e) => e.stopPropagation()}>
        <p style={{ margin: '0 0 20px', fontSize: '1rem', color: '#1e293b', fontWeight: 500 }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn-admin-secondary" onClick={onCancel}>Cancel</button>
          <button className={confirmClass} onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
