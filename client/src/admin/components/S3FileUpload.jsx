import { useState, useRef } from 'react';
import axios from 'axios';

function S3FileUpload({ value, onChange, folder = 'resume', label = 'File', accept = '.pdf', contentType = 'application/pdf' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== contentType) {
      setError(`Only ${accept} files are allowed`);
      return;
    }
    setError('');
    setUploading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/upload/presigned-url`,
        {
          params: { filename: file.name, contentType: file.type, folder },
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        }
      );

      await axios.put(data.signedUrl, file, {
        headers: { 'Content-Type': file.type },
      });

      onChange(data.publicUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const filename = value ? value.split('/').pop() : '';

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
          accept={accept}
          style={{ display: 'none' }}
          onChange={handleFile}
        />
      </div>
      {error && <div style={{ color: '#ef4444', fontSize: '0.78rem', marginBottom: 4 }}>{error}</div>}
      {value && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: '1.2rem' }}>📄</span>
          <a href={value} target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#6366f1', wordBreak: 'break-all' }}>
            {filename || 'View file'}
          </a>
        </div>
      )}
    </div>
  );
}

export default S3FileUpload;
