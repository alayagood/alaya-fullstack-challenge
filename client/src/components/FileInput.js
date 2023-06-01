import React, { useState } from 'react';

const FileInput = ({ onFileSelected, onUpload }) => {
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      onFileSelected(file);
    }
  };

  const handleUpload = async () => {
    if (fileName) {
      setUploading(true);
      try {
        await onUpload();
        setFileName('');
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="file-input-container">
      <label htmlFor="file-input" className="file-input-label">
        {fileName || 'Choose a file'}
      </label>
      {fileName ? (
        <button
          className="file-input-button"
          disabled={uploading}
          onClick={handleUpload}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      ) : <label htmlFor="file-input" className="file-input-button">
        Browse
      </label>}
      <input
        type="file"
        id="file-input"
        className="file-input"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default FileInput;
