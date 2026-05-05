import { useState, useRef } from 'react';
import axios from 'axios';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

function S3ImageUpload({ value, onChange, folder = 'media', label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only image files are allowed');
      return;
    }
    setError('');
    setUploading(true);
    try {
      // 1. Get presigned URL from server
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/upload/presigned-url`,
        {
          params: { filename: file.name, contentType: file.type, folder },
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        }
      );

      // 2. PUT file directly to S3 — no server involved
      await axios.put(data.signedUrl, file, {
        headers: { 'Content-Type': file.type },
      });

      // 3. Use the permanent public URL
      onChange(data.publicUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`${label} URL`}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="btn-admin-secondary"
          onClick={() => inputRef.current.click()}
          disabled={uploading}
          style={{ whiteSpace: 'nowrap' }}
        >
          {uploading ? 'Uploading…' : '↑ Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
      </div>
      {error && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginBottom: 4 }}>{error}</div>}
      {value && (
        <img
          src={value}
          alt="preview"
          style={{ maxWidth: 120, maxHeight: 80, objectFit: 'cover', borderRadius: 4, border: '1px solid #e2e8f0' }}
        />
      )}
    </div>
  );
}

export default S3ImageUpload;
