import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function ResumeUpload({ onExtract, disabled }) {
  const inputRef = useRef(null);
  const [localError, setLocalError] = useState('');
  const [extracting, setExtracting] = useState(false);

  async function handleFile(file) {
    setLocalError('');
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setLocalError('Please upload a PDF resume.');
      return;
    }

    setExtracting(true);
    try {
      // Optional bonus: front-end can send resume as base64; but we keep it simple by:
      // calling backend /extract if it exists.
      // If not implemented, we fall back gracefully.
      const formData = new FormData();
      formData.append('resume', file);

      const res = await axios.post('/extract-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onExtract(res.data?.resumeText || '');
    } catch (e) {
      setLocalError('Resume extraction not available (server endpoint missing).');
    } finally {
      setExtracting(false);
    }
  }

  return (
    <div className="resumeUpload">
      <div className="fieldHeader">
        <div className="fieldLabel">Resume upload (Bonus)</div>
        <div className="fieldHint">PDF</div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={disabled || extracting}
      />

      <div className="resumeActions">
        <button
          type="button"
          className="btn btnGhost"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || extracting}
        >
          {extracting ? 'Extracting...' : 'Upload Resume'}
        </button>
        <div className="resumeNote">Extraction will improve personalization.</div>
      </div>

      {localError ? <div className="fieldError">{localError}</div> : null}
    </div>
  );
}

