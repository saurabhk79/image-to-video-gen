// App.jsx
import { useState } from 'react';
import UploadForm from './components/UploadForm';
import VideoResult from './components/VideoResult';
import { config } from './config';

export default function App() {
  const [step, setStep] = useState('upload');
  const [videoUrl, setVideoUrl] = useState(null);

  const handleUpload = async (formData) => {
    setStep('processing');
    try {
      const res = await fetch(config.backendUrl +'/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setVideoUrl(data.videoUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="flex w-full max-w-6xl gap-4 transition-all">
        <div
          className={`w-full md:w-1/2 transition-transform duration-500 ${
            step === 'processing' ? '-translate-x-1/6' : 'translate-x-0'
          }`}
        >
          <UploadForm onUpload={handleUpload} disabled={step === 'processing'} />
        </div>

        {step === 'processing' && (
          <div className="w-full md:w-1/2">
            <VideoResult videoUrl={videoUrl} onBack={() => setStep('upload')} />
          </div>
        )}
      </div>
    </div>
  );
}
