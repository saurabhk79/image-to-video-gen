// components/UploadForm.jsx
import { useState } from 'react';

export default function UploadForm({ onUpload, disabled }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file && !imageUrl) return alert('Please upload a file or provide an image URL.');

    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    } else {
      formData.append('imageUrl', imageUrl);
    }
    formData.append('instructions', instructions);
    onUpload(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6">
      <h2 className="card-title mb-4">Upload an Image</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Upload from device:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setImageUrl('');
          }}
          className="file-input file-input-bordered w-full"
          disabled={disabled}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Or enter image URL:</label>
        <input
          type="url"
          placeholder="Enter image url here..."
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setFile(null);
          }}
          className="input input-bordered w-full"
          disabled={disabled}
        />
      </div>

      <textarea
        placeholder="Additional instructions for AI..."
        className="textarea textarea-bordered w-full mb-4"
        rows={4}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        disabled={disabled}
      ></textarea>

      <button type="submit" className="btn btn-primary w-full" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}
