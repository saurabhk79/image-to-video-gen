import { useState } from "react";
import UploadForm from "./components/UploadForm";
import VideoResult from "./components/VideoResult";
import { config } from "./config";

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = async (formData) => {
    try {
      setIsSubmitting(true);
      const res = await fetch(config.backendUrl + "/api/upload_image", {
        method: "POST",
        body: formData,
      });
      const { data } = await res.json();
      if (data?.id) {
        setVideoData(data);
        setIsProcessing(true);
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4 transition-all">
        <div
          className={`w-full md:w-1/2 transition-transform duration-500 ${
            isProcessing ? "md:-translate-x-1/6" : "md:translate-x-0"
          }`}
        >
          <UploadForm
            onUpload={handleUpload}
            disabled={isProcessing}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="w-full md:w-1/2">
          {isProcessing && (
            <VideoResult
              videoData={videoData}
              onBack={() => {
                setIsProcessing(false);
                setVideoData(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
