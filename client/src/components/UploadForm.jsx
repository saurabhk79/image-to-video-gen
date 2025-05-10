import { useState } from "react";

export default function UploadForm({ onUpload, disabled, isSubmitting }) {
  const [file, setFile] = useState(null);
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a file.');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('instructions', instructions);
    onUpload(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`card bg-base-100 shadow-xl p-6 transition-all duration-300 ${
        isSubmitting ? 'opacity-60 pointer-events-none' : ''
      }`}
    >
      <h2 className="card-title mb-4">Upload an Image</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Upload from device:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input file-input-bordered w-full"
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

      <button
        type="submit"
        className="btn btn-primary w-full flex items-center justify-center gap-2"
        disabled={disabled || isSubmitting}
      >
        {disabled && <span className="loading loading-spinner loading-sm"></span>}
        {disabled ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
}
